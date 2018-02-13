#!/bin/bash

# one script to rule them all...

echo $'\n\n*********************\n SETUP AWS APPLICATION\n*********************\n'

# check dir
where=$(pwd)
where="${where: -3}"
if test "$where" = "cli"; then
 echo "Running from correct directory"
else
 echo "Must be run from aws-scripts-cli directory with ./master/master.sh"
 exit
fi

# include global variables
. ./master/vars.sh

# order below is crucial
#echo $'\n\n*********************\n MAKING VPC\n*********************\n\n'
. ./infrastructure/make-vpc.sh
#echo $'\n\n*********************\n MADE VPC\n*********************\n\n'

#for (( i=1; i<=$numservers; i++ )) do
#echo $'\n\n*********************\n MAKING INTANCES\n*********************\n\n'
#. ./infrastructure/make-instances.sh $i
#echo $'\n\n*********************\n MADE INSTANCES\n*********************\n\n'
#done