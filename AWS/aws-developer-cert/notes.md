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
  * Rolling: few instances at a time (called bucket), less capacity, run both versions, no additional cost
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
  * HTTPS: AWS CLI Authentication helper or HTTPS credentials
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
* Each stage create Artifacts
* Changes are recorded into AWS CloudWatch Events (can trigger SNS)
* IAM Service Role must have appropriate permissions

## CodeBuild

* Fully managed service
* Pay for usage
* Leverages Docker
* Security
  * Uses KMS to encrypt artifacts
  * Uses IAM to build
  * Uses VPN to network
  * Uses CloudTrail for API logging
* buildspec.yml: Build instructions
* Output logs to S3 and CloudWatch
* CodeBuild Statistics to see metrics
* Uses CloudWatch Alarms to detect failed build and trigger notifications
* Can use CloudWatch Events / AWS Lambda
* Can trigger SNS Notifications
* Support: Java, Ruby, Python, Go, Node.js, Android, .NET Core, PHP, Docker (extend environment)
* Flow:
  * Source Code (buildspec.yml) + Build Docker Image (AWS or Custom)
  * CodeBuild Container + Optional S3 Cache Bucket
  * S3 Bucket Artifacts + Logs (CloudWatch - S3)
* Troubleshoot
  * Run CodeBuild on your laptop using Docker and [CodeBuild Agent](https://docs.aws.amazon.com/codebuild/latest/userguide/use-codebuild-agent.html)

* buildspec.yml
  * Must be in the root folder
  * Define environment variables (plaintext or Secure secrets with SSM Parameter store)
  * Phases
    * Install: dependencies
    * Pre-Build: final commands
    * Build
    * Post Build

## CodeDeploy

* Use to Deploy app into many EC2 or On Premise
* Not managed by Elastic Beanstalk
* Use a codedeploy-agent service on the servers
* Sends appspec.yml
* Code is pulled from GitHub or S3
* Server follow the instructions
* Servers are group by a deployment group (dev/test/prod)
* More powerfull than Elastic Beanstalk
* Support any application
* Support Blue/Green deployment on EC2 servers
* Support AWS Lambda deployments
* Don't provision resources

* Components
  * Application: unique name
  * Compute platform: EC2/On-Premise or Lambda
  * Deployment configuration: Rules for success/failure (eg:.min healthy server/lambda traffic)
  * Deployment group: group of tagged instances
  * Deployment type: In-place or Blue/Green
  * IAM instances profile: Permission for EC2 to pull from repository
  * Application Revision: Code + appspec.yml
  * Service Role: Role for CodeDeploy to perform actions
  * Target Revision: Application version

* appspec.yml
  * Must be in the root folder
  * Sections
    * File Section: How to source and copy from repository
    * Hooks: Instructions to deploy
      * Have timeouts
      * Order
        * ApplicationStop
        * DownloadBundle
        * BeforeInstall
        * AfterInstall
        * ApplicationStart
        * __ValidateService__

* Deployment Config In-Place
  * One a time
  * Half at a time
  * All at once
  * Custom: min healthy host = 75%
* Failures
  * Instances stay in "failed state"
  * New deployments will first be deployed to "failed state" instances
  * Rollback: redeploy old deployment or enable automated rollback
* Deployment targets
  * Set of tagged EC2 instances
  * Directly to an ASG
  * Mix (Tag/ASG)