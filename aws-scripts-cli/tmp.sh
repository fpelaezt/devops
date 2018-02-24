# start the passwords script
echo "#!/bin/bash" > passwords.sh

echo "rds mainuser password (max 16)"
newpassword=$(openssl rand -base64 10)
newpassword=$(echo $newpassword | tr '/' '0')
echo "password1=$newpassword" >> passwords.sh

for (( i=2; i<=20; i++ ))
do
	newpassword=$(openssl rand -base64 33)
	newpassword=$(echo $newpassword | tr '/' '0')
	echo "password$i=$newpassword" >> passwords.sh
done

# make the generated script executable
chmod +x passwords.sh