#!/bin/bash

# delete all aws assets

read -p "DELETE ALL AWS ASSETS? <Y/N> " prompt
if [[ $prompt == "y" || $prompt == "Y" || $prompt == "yes" || $prompt == "Yes" ]]
then
  echo "PROCEEDING..."
else
  exit
fi

# check dir
where=$(pwd)
where="${where: -3}"
if test "$where" = "cli"; then
 echo "Running from correct directory"
else
 echo "Must be run from aws-scripts-cli directory with ./master/delete.sh"
 exit
fi

# include global variables
. ./master/vars.sh

# delete vpc
# from the console (VPC), this can be done in one operation, but not from the cli...
vpc_id=$(aws ec2 describe-vpcs --filters Name=tag-key,Values=vpcname --filters Name=tag-value,Values=$vpcname --output text --query 'Vpcs[*].VpcId')
echo vpc_id=$vpc_id

# delete igw
igw_id=$(aws ec2 describe-internet-gateways --filters "Name=attachment.vpc-id,Values=$vpc_id" --output text --query 'InternetGateways[*].InternetGatewayId')
echo igw_id=$igw_id
aws ec2 detach-internet-gateway --internet-gateway-id $igw_id --vpc-id $vpc_id
aws ec2 delete-internet-gateway --internet-gateway-id $igw_id

# delete subnets
subnet_id=$(aws ec2 describe-subnets --filters Name=vpc-id,Values=$vpc_id --filters Name=tag-key,Values=subnet --filters Name=tag-value,Values=1 --output text --query 'Subnets[*].SubnetId')
echo subnet_id=$subnet_id
aws ec2 delete-subnet --subnet-id $subnet_id
subnet_id=$(aws ec2 describe-subnets --filters Name=vpc-id,Values=$vpc_id --filters Name=tag-key,Values=subnet --filters Name=tag-value,Values=2 --output text --query 'Subnets[*].SubnetId')
echo subnet_id=$subnet_id
aws ec2 delete-subnet --subnet-id $subnet_id

# now we can finally delete the vpc
# all remaining assets are also deleted (eg route table, default security group)
aws ec2 delete-vpc --vpc-id $vpc_id

# tags are deleted automatically when associated resource dies

echo "all deleted"