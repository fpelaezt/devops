import boto3
s3 = boto3.resource('s3')

s3.Bucket('fpelaezt-devops-bucket2').create(
    CreateBucketConfiguration={
        'LocationConstraint': 'sa-east-1'
    },
    )
