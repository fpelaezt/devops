#!/bin/bash

# makes a webphp linux box, from linux hardened image
# ssh on 38142
# webphpebsvolumesize GB EBS root volume

# parameters <N> where this is the Nth web box (1-5)

# check dir
where=$(pwd)
where="${where: -3}"
if test "$where" = "cli"; then
 echo "Running from correct directory"
else
 echo "Must be run from aws-scripts-cli directory with ./master/make-instances.sh"
 exit
fi

# include global variables
. ./master/vars.sh

serverid=$1
if test -z "$serverid"; then
 serverid=1
fi

echo "check server$serverid does not exist"
exists=$(aws ec2 describe-key-pairs --key-names server$serverid --output text --query 'KeyPairs[*].KeyName' 2>/dev/null)

if test "$exists" = "web$webid"; then
 echo "key web$webid already exists = exiting"
 #exit
else
 echo "key web$webid not found - proceeding"
fi

cd $basedir

source credentials/passwords.sh

if test "$webid" = "1"; then
 rootpass=$password8
 ec2pass=$password9
elif test "$webid" = "2"; then
 rootpass=$password10
 ec2pass=$password11
elif test "$webid" = "3"; then
 rootpass=$password12
 ec2pass=$password13
elif test "$webid" = "4"; then
 rootpass=$password14
 ec2pass=$password15
elif test "$webid" = "5"; then
 rootpass=$password16
 ec2pass=$password17
elif test "$webid" = "6"; then
 rootpass=$password18
 ec2pass=$password19
else
 echo "password for web$webid not found - exiting"
 exit
fi

myip=$(curl http://checkip.amazonaws.com/)
echo myip=$myip

echo "making keypair"
rm credentials/web$webid.pem
aws ec2 delete-key-pair --key-name web$webid
aws ec2 create-key-pair --key-name web$webid --query 'KeyMaterial' --output text > credentials/web$webid.pem
chmod 600 credentials/web$webid.pem
echo "keypair web$webid made"

echo "making sg"
websg=web$webid
websg+=sg
vpc_id=$(aws ec2 describe-vpcs --filters Name=tag-key,Values=vpcname --filters Name=tag-value,Values=$vpcname --output text --query 'Vpcs[*].VpcId')
echo vpc_id=$vpc_id
aws ec2 delete-security-group --group-name $websg
sg_id=$(aws ec2 create-security-group --group-name $websg --description "web$webid security group" --vpc-id $vpc_id --output text --query 'GroupId')
echo sg_id=$sg_id
aws ec2 create-tags --resources $sg_id --tags Key=sgname,Value=$websg
vpcwebsg_id=$(aws ec2 describe-security-groups --filters Name=tag-key,Values=sgname --filters Name=tag-value,Values=$websg --output text --query 'SecurityGroups[*].GroupId')
echo vpcwebsg_id=$vpcwebsg_id
aws ec2 authorize-security-group-ingress --group-id $vpcwebsg_id --protocol tcp --port 38142 --cidr $myip/32
echo "$websg made"

echo "getting subnet id"
subnet_id=$(aws ec2 describe-subnets --filters Name=vpc-id,Values=$vpc_id --filters Name=tag-key,Values=subnet --filters Name=tag-value,Values=1 --output text --query 'Subnets[*].SubnetId')
echo subnet_id=$subnet_id

echo "getting basic secure linux ami id"
bslami_id=$(aws ec2 describe-images --filters 'Name=name,Values=Basic Secure Linux' --output text --query 'Images[*].ImageId')
echo bslami_id=$bslami_id

echo "getting adminhost private ip"
adminhost=$(aws ec2 describe-instances --filters Name=key-name,Values=admin --output text --query 'Reservations[*].Instances[*].PrivateIpAddress')
echo adminhost=$adminhost

echo "getting adminhost security group id"
vpcadminsg_id=$(aws ec2 describe-security-groups --filters Name=tag-key,Values=sgname --filters Name=tag-value,Values=adminsg --output text --query 'SecurityGroups[*].GroupId')
echo vpcadminsg_id=$vpcadminsg_id

echo "allowing access to admin server :514 for rsyslog"
aws ec2 authorize-security-group-ingress --group-id $vpcadminsg_id --protocol tcp --port 514 --source-group $vpcwebsg_id

echo "allowing access to admin server :8080 for mmonit"
aws ec2 authorize-security-group-ingress --group-id $vpcadminsg_id --protocol tcp --port 8080 --source-group $vpcwebsg_id

echo "allowing access to webphp from admin server :2812 for mmonit callback"
aws ec2 authorize-security-group-ingress --group-id $vpcwebsg_id --protocol tcp --port 2812 --source-group $vpcadminsg_id

echo "allowing access to rds database"
vpcdbsg_id=$(aws ec2 describe-security-groups --filters Name=tag-key,Values=sgname --filters Name=tag-value,Values=dbsg --output text --query 'SecurityGroups[*].GroupId')
echo vpcdbsg_id=$vpcdbsg_id
aws ec2 authorize-security-group-ingress --group-id $vpcdbsg_id --source-group $vpcwebsg_id --protocol tcp --port 3306

dbendpoint=$(aws rds describe-db-instances --db-instance-identifier $dbinstancename --output text --query 'DBInstances[*].Endpoint.Address')
echo dbendpoint=$dbendpoint

echo "making instance web$webid"
instance_id=$(aws ec2 run-instances --image $bslami_id --placement AvailabilityZone=$deployzone --key web$webid --security-group-ids $vpcwebsg_id --instance-type $webphpinstancetype --block-device-mapping $bdm --region $deployregion --subnet-id $subnet_id --private-ip-address 10.0.0.1$webid --associate-public-ip-address --output text --query 'Instances[*].InstanceId')
echo instance_id=$instance_id

# build data

cd $basedir/ami/webphp

rm -f monit.conf
rm -f rsyslog.conf
rm -f httpd.conf
rm -f chp_ec2-user.sh
rm -f chp_root.sh

sed "s/SEDadminhostSED/$adminhost/g" monit_template.conf > monit.conf

sed "s/SEDadminhostSED/$adminhost/g" rsyslog_template.conf > rsyslog.conf

cd $basedir

# make the AES key for PHP sessions
# its a hex encoded version of $password20
aes1=$password20
# convert to hex
aes2=$(hexdump -e '"%X"' <<< "$aes1")
# lowercase
aes3=$(echo $aes2 | tr '[:upper:]' '[:lower:]')
# only the first 64 characters
aes4=${aes3:0:64}

# sed httpd.conf
source credentials/account.sh
source credentials/recaptcha.sh
sed -e "s/SEDdbhostSED/$dbendpoint/g" -e "s/SEDdbnameSED/$dbname/g" -e "s/SEDdbpass_webphprwSED/$password5/g" -e "s/SEDaeskeySED/$aes4/g" -e "s/SEDserveridSED/$webid/g" -e "s/SEDaws_deployregionSED/$deployregion/g" -e "s/SEDaws_accountSED/$aws_account/g" -e "s/SEDrecaptcha_privatekeySED/$recaptcha_privatekey/g" -e "s/SEDrecaptcha_publickeySED/$recaptcha_publickey/g" ami/webphp/httpd_template.conf > ami/webphp/httpd.conf

sed "s/SED-EC2-USER-PASS-SED/$ec2pass/g" ami/shared/chp_ec2-user.sh > ami/webphp/chp_ec2-user.sh
chmod +x ami/webphp/chp_ec2-user.sh

sed "s/SED-ROOT-PASS-SED/$rootpass/g" ami/shared/chp_root.sh > ami/webphp/chp_root.sh
chmod +x ami/webphp/chp_root.sh

echo -n "waiting for instance"
while state=$(aws ec2 describe-instances --instance-ids $instance_id --output text --query 'Reservations[*].Instances[*].State.Name'); test "$state" = "pending"; do
 echo -n . ; sleep 3;
done; echo " $state"

priv_ip_address=$(aws ec2 describe-instances --instance-ids $instance_id --output text --query 'Reservations[*].Instances[*].PrivateIpAddress')
echo priv_ip_address=$priv_ip_address

ip_address=$(aws ec2 describe-instances --instance-ids $instance_id --output text --query 'Reservations[*].Instances[*].PublicIpAddress')
echo ip_address=$ip_address

echo -n "waiting for ssh"
while ! ssh -i credentials/web$webid.pem -p 38142 -o ConnectTimeout=60 -o BatchMode=yes -o StrictHostKeyChecking=no ec2-user@$ip_address > /dev/null 2>&1 true; do
 echo -n . ; sleep 3;
done; echo " ssh ok"

echo "transferring files"
scp -i credentials/web$webid.pem -P 38142 ami/webphp/rsyslog.conf ec2-user@$ip_address:
scp -i credentials/web$webid.pem -P 38142 ami/webphp/monit.conf ec2-user@$ip_address:
scp -i credentials/web$webid.pem -P 38142 ami/webphp/httpd.conf ec2-user@$ip_address:
scp -i credentials/web$webid.pem -P 38142 ami/webphp/modsecurity_overrides ec2-user@$ip_address:
scp -i credentials/web$webid.pem -P 38142 ami/webphp/php.ini ec2-user@$ip_address:
scp -i credentials/web$webid.pem -P 38142 ami/webphp/install_webphp.sh ec2-user@$ip_address:
scp -i credentials/web$webid.pem -P 38142 ami/webphp/chp_ec2-user.sh ec2-user@$ip_address:
scp -i credentials/web$webid.pem -P 38142 ami/webphp/chp_root.sh ec2-user@$ip_address:
scp -i credentials/web$webid.pem -P 38142 ami/webphp/mod_rpaf-0.6-0.7.x86_64.rpm ec2-user@$ip_address:
echo "transferred files"

rm -f ami/webphp/monit.conf
rm -f ami/webphp/rsyslog.conf
rm -f ami/webphp/httpd.conf
rm -f ami/webphp/chp_ec2-user.sh
rm -f ami/webphp/chp_root.sh

echo "running install_webphp.sh"
ssh -i credentials/web$webid.pem -p 38142 -t -o ConnectTimeout=60 -o BatchMode=yes -o StrictHostKeyChecking=no ec2-user@$ip_address sudo ./install_webphp.sh
echo "finished install_webphp.sh"

# register with elb
echo "registering with elb"
aws elb register-instances-with-load-balancer --load-balancer-name $elbname --instances $instance_id

echo "add elb sg to instance sg"
vpcelbsg_id=$(aws ec2 describe-security-groups --filters Name=tag-key,Values=sgname --filters Name=tag-value,Values=elbsg --output text --query 'SecurityGroups[*].GroupId')
echo vpcelbsg_id=$vpcelbsg_id
aws ec2 authorize-security-group-ingress --group-id $vpcwebsg_id --source-group $vpcelbsg_id --protocol tcp --port 80
aws ec2 authorize-security-group-ingress --group-id $vpcwebsg_id --source-group $vpcelbsg_id --protocol tcp --port 443

echo "removing ssh access from sg"
aws ec2 revoke-security-group-ingress --group-id $vpcwebsg_id --protocol tcp --port 38142 --cidr $myip/32

cd $basedir

echo "web php done - needs upload"
