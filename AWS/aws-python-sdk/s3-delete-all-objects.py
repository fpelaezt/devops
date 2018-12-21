import boto3

s3 = boto3.resource('s3')
bucket = s3.Bucket('fpelaezt-devops-bucket2')

for object in bucket.objects.all():
    object.delete()
