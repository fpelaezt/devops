import boto3

s3 = boto3.resource('s3')

# Upload a new file
data = open('test-python.jpeg', 'rb')
s3.Bucket('mynewbucket.fpelaezt.me').put_object(Key='test-python.jpeg', Body=data)
