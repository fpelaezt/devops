# Notes

## EC2
* Pricing review: [Amazon EC2 On-Demand](https://aws.amazon.com/es/ec2/pricing/on-demand/)
* User Data: Accept bash scripts
* [Amazon Instance types](https://aws.amazon.com/es/ec2/instance-types/)
* [Amazon Instances review](https://ec2instances.info/)
* Meta-Data: http://169.254.169.254/latest/meta-data/

## RDS
* Enforce SSL on RDS:
    * PostgreSQL: rds.force_ssl=1 in the AWS RDS Console (Parameter Groups)
    * MySQL: Within the DB: GRANT USAGE ON *.* TO 'mysqluser'@'%' REQUIRE SSL;

## S3
* Encryption
    * SSE-S3 Encryption
        * Must set header: “x-amz-server-side-encryption”:”AES-256”
        * S3 Managed Data Key
    * SSE-KMS Encryption
        * Must set header: “x-amz-server-side-encryption”:”aws-kms”
        * KMS Customer Master Key
    * SSE-C
        * Must use https
        * Encryption key must be provided in the HTTP headers
        * Client Side Data Key
        * Client-provider Data Key
* CORS
    * Cross Origin Resource Sharing

## Policies
* [Policy Generator](https://awspolicygen.s3.amazonaws.com/policygen.html)
* [Simulator](https://policysim.aws.amazon.com/home/index.jsp?#)

## SDK
* Exponential Backoff: After an API failure, the SDK retries waiting an exponential curve

* [Boto3 Documentation](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/index.html)


## ElasticBeanStalk
* Deployments Modes
    * Single Instance: Dev, 1 AVZ, 1 Elastic IP, 1 WebApp Server
    * High Availability: Prod, Multiple AVZ, Load Balancer, ASG
* Deployments Options
    * All at once: fastest, downtime, no additional cost
    * Rolling: few instances at a time (called bucket), less capacity, run both versions, 
            no additional cost
    * Rolling with additional batches: spins up new instances, run both versions, additional cost
    * Immutable: spins up new instances in a new ASG, only one version
    * Blue/Green: Need manual intervention, similar to Immutable, Route S3 to weighted traffic
* Code:
    * Must be in Zip
    * Can contain parameters (.ebextrensions/) .config in YAML/JSON format in root
    * Can modify default setting by option_settings
* EB cli:
    * eb [create | status | health | events | logs | open | deploy | config | terminate]               
* Relies on CloudFormation
* Optimization: Package dependencies into source code to avoid EC2 to resolve them


## CICD
* CodeCommit, CodePipeline, CodeBuild, CodeDeploy
* CodeBuild = Jenkins
    * Steps
        * Code: CodeCommit & GitHub
        * Build + Test: CodeBuild & Jenkins CI
        * Deploy + Provision: ElasticBeanstalk & CodeDeploy or * CloudFormation
        * Orchrestrate: CodePipeline

## CodeCommit
* GIT
* Integrated with Jenkins / CodeBuild
* Authentication
    * SSH Keys
    *HTTPS: AWS CLI Authentication helper or HTTPS credentials
    * MFA
* Encryption
    * Repositories are encrypted at rest using KMS
    * Encrypted in transit (only HTTPS or SSH)
    * Cross Account access
        * IAM Role and use AWS STS (with AssumeRole API)
* Notification
    * AWS SNS /  Lambda
    * Deletion branches, Push into master, notify external * Build, Trigger lambda to perform codebase analysis
    * CloudWatch Event Rules
        * Trigger for pull request updates
        * Commit comments events
        * Goes into an SNS topic

## CodePipeline
* Add manual approval
    




    



