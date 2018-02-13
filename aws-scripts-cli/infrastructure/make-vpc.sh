#!/bin/bash

# makes a vpc

# check dir
where=$(pwd)
where="${where: -3}"
if test "$where" = "cli"; then
 echo "Running from correct directory"
else
 echo "Must be run from aws-scripts-cli  directory with ./infraestructure/make-vpc.sh"
 exit
fi

# include global variables
. ./master/vars.sh

# Check if VPC already exists
exist=$(aws ec2 describe-vpcs --filters Name=tag-value,Values=$vpcname --output text --query 'Vpcs[*].State')
echo $exist
if [ ! -z "$exist" ]; then
    echo "VPC $vpcname already exists, aborting creation..."
    exit
fi

# make a new vpc with a master 10.0.0.0/16 subnet
vpc_id=$(aws ec2 create-vpc --cidr-block 10.0.0.0/16 --output text --query 'Vpc.VpcId')
echo vpc_id=$vpc_id

# enable dns support or modsecurity wont let apache start...
aws ec2 modify-vpc-attribute --vpc-id $vpc_id --enable-dns-support
aws ec2 modify-vpc-attribute --vpc-id $vpc_id --enable-dns-hostnames

# tag the vpc
aws ec2 create-tags --resources $vpc_id --tags Key=vpcname,Value=$vpcname
aws ec2 create-tags --resources $vpc_id --tags Key=Name,Value=$vpcname

# wait for the vpc
echo -n "waiting for vpc..."
while state=$(aws ec2 describe-vpcs --filters Name=tag-key,Values=vpcname --filters Name=tag-value,Values=$vpcname --output text --query 'Vpcs[*].State'); test "$state" = "pending"; do
 echo -n . ; sleep 3;
done; echo " $state"

# create an internet gateway (to allow access out to the internet)
igw=$(aws ec2 create-internet-gateway --output text --query 'InternetGateway.InternetGatewayId')
echo igw=$igw

# attach the igw to the vpc
echo attaching igw
aws ec2 attach-internet-gateway --internet-gateway-id $igw --vpc-id $vpc_id

# get the route table id for the vpc (we need it later)
rtb_id=$(aws ec2 describe-route-tables --filters Name=vpc-id,Values=$vpc_id --output text --query 'RouteTables[*].RouteTableId')
echo rtb_id=$rtb_id

# create our main subnets
# we use 10.0.0.0/24 as our main subnet and 10.0.10.0/24 as a backup for multi-az rds
subnet_id=$(aws ec2 create-subnet --vpc-id $vpc_id --cidr-block 10.0.0.0/24 --availability-zone $deployzone --output text --query 'Subnet.SubnetId')
echo subnet_id=$subnet_id
# tag this subnet
aws ec2 create-tags --resources $subnet_id --tags Key=subnet,Value=1
# associate this subnet with our route table
aws ec2 associate-route-table --subnet-id $subnet_id --route-table-id $rtb_id
# now the 10.0.10.0/24 subnet in our secondary deployment zone
subnet_id=$(aws ec2 create-subnet --vpc-id $vpc_id --cidr-block 10.0.10.0/24 --availability-zone $deployzone2 --output text --query 'Subnet.SubnetId')
echo subnet_id=$subnet_id
# tag this subnet
aws ec2 create-tags --resources $subnet_id --tags Key=subnet,Value=2
# associate this subnet with our route table
aws ec2 associate-route-table --subnet-id $subnet_id --route-table-id $rtb_id

# create a route out from our route table to the igw
echo creating route from igw
aws ec2 create-route --route-table-id $rtb_id --gateway-id $igw --destination-cidr-block 0.0.0.0/0

# done
echo vpc setup done