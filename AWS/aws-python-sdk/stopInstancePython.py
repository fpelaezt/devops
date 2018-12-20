import boto3
stopinstance = '(aws ec2 describe-instances --filters "Name=tag:Name,Values=Python" --query 'Reservations[].Instances[].InstanceId' --output table)'
print(stopinstance)
