#!/bin/bash

# create password file

# passwords are used like this
# password1=server1 root user
# password2=server1 ec2-user

# check dir
where=$(pwd)
where="${where: -3}"
if test "$where" = "cli"; then
 echo "Running from correct directory"
else
 echo "Must be run from aws-scripts-cli directory with ./credentials/makepasswords.sh"
 exit
fi

# include global variables
. ./master/vars.sh

cd $basedir/credentials

# save old passwords just in case
now=$(date +"%Y%m%d")
mv passwords.sh oldpasswords/passwords_$now.sh

# start the passwords script
echo "#!/bin/bash" > passwords.sh

for (( i=1; i<=$numservers*2; i++ ))
do
	newpassword=$(openssl rand -base64 10)
	newpassword=$(echo $newpassword | tr '/' '0')
	echo "password$i=$newpassword" >> passwords.sh
done

# make the generated script executable
chmod +x passwords.sh

cd $basedir