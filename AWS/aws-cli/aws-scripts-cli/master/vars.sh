#!/bin/bash

# check aws for regions, zones and pricing
deployregion=us-west-2
deployzone=us-west-2a
deployzone2=us-west-2b

# the fully qualified path to the aws directory
basedir=/d/AWS/git/devops/aws-scripts-cli

# name for your vpc
vpcname=DevOps01

# name for your elb
elbname=DevOps01ELB

# number of webphp servers to make
numservers=1

# your domain name
webdomain=www.yourdomain.com

# email address to send from
# must be valid as needs to be verified
emailsendfrom=donotreply@yourdomain.com