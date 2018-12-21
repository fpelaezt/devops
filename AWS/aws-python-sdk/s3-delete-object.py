import boto3

s3 = boto3.resource('s3')

# Upload a new file
data = open('s3-object.txt', 'rb')
s3.Bucket('fpelaezt-devops-bucket2').delete_objects(Delete={
                                                        'Objects': [
                                                            {
                                                                'Key': 's3-object1.txt'
                                                            },
                                                            {
                                                                'Key': 's3-object2.txt'
                                                            }
                                                            ],
                                                            'Quiet': False
                                                        },
                                                    )