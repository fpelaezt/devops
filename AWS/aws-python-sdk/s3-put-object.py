import boto3

s3 = boto3.resource('s3')

# Upload a new file
data = open('s3-object.txt', 'rb')
s3.Bucket('fpelaezt-devops-bucket1').put_object(Key='s3-object.txt', Body=data)
