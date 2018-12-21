import boto3

s3 = boto3.resource('s3')

# Upload a new file
data = open('s3-object.txt', 'rb')
s3.Bucket('fpelaezt-devops-bucket2').put_object(Key='s3-object1.txt', Body=data)
s3.Bucket('fpelaezt-devops-bucket2').put_object(Key='s3-object2.txt', Body=data)
