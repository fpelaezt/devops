import boto3

s3 = boto3.resource('s3')

# Download a file
s3.Bucket('fpelaezt-devops-bucket1').download_file('s3-object.txt', 's3-object.txt')