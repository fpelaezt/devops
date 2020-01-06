# GENERAL

[CLI Documentation](https://docs.aws.amazon.com/cli/latest/reference/)

* aws configure
  * AWS Access Key ID [None]:
  * AWS Secret Access Key [None]:
  * Default region name [None]: sa-east-1
  * Default output format [None]:

    ```
    ls ~/.aws
    config
    credentials
    ```

## CLI Profiles

* aws configure --profile my-other-account
* aws s3 ls --profile my-other-account

## Decode error messages

* aws sts decode-authorization-message -encoded-message value | Decode error messages
  * echo decode
  * Format into JSON using VSCode

## S3

* aws s3 ls | list buckets
* aws s3 ls s3://fpelaezt-devops-bucket1 | list files inside a bucket
* aws s3 cp file.txt s3://fpelaezt-devops-bucket1/file.txt | Upload a file
* aws s3 cp s3://fpelaezt-devops-bucket1/file.txt . | Download a file
* aws s3 rm * s3://fpelaezt-devops-bucket1/test2.txt | Remove a file
* aws s3 cp help
* aws s3 mb s3://fpelaezt-devops-bucket2 | make bucket
* aws s3 rb s3://fpelaezt-devops-bucket2 | remove empty bucket

## EC2

* ssh -i file.pem ec2-user@ec2_endpoint
* aws ec2 run-instances --dry-run --image-id \
    ami-0af6d461cf36733d2 --instance-type t2.micro | Test if command succeds
* aws ec2 describe-instances --output table > aws.log

## SQS

* aws sqs list-queues --region us-east-1
* aws sqs send-message --queue-url url --message-body message
* aws sqs receive-message --queue-url url
* aws sqs delete-message --queue-url url --receipt-handle handle