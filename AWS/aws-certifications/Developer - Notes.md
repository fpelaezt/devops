# Notes

## EC2

* Pricing review: [Amazon EC2 On-Demand](https://aws.amazon.com/es/ec2/pricing/on-demand/)
* User Data: Accept bash scripts
* [Amazon Instance types](https://aws.amazon.com/es/ec2/instance-types/)
* [Amazon Instances review](https://ec2instances.info/)
* Meta-Data: http://169.254.169.254/latest/meta-data/
* [Monthly Calculator](https://calculator.s3.amazonaws.com/index.html)

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

## Elastic Beanstalk

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
  * Cross Account Access
    * IAM Role and use AWS STS (with AssumeRole API)
* Notification
  * AWS SNS /  Lambda
    * Deletion branches, Push into master, notify external build
    * Trigger lambda to perform codebase analysis
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

## CloudFormation

* Infrastructure as code
* Separation of concern
  * VPN stacks
  * Network stacks
  * App stacks
* To update Re-upload the new version
* Deploy
  * Manual: Edit using CloudFormation Designer or by console
  * Automatic: Edit YAML file and CLI
* Blocks
  * Resources (Mandatory)
  * Parameters: dynamic inputs
  * Mappings: static variables
  * Outputs
  * Conditionals
  * Metadata
* Helpers
  * References
  * Functions
* Resources
  * AWS componentes
  * [224 types of resources](https://docs.aws.amazon.com/es_es/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html)
  * Form: :aws-product-name::data-type-name
  * Don't support dynamic amount of resources
* Parameters
  * Use for things that can change in the future
  * Types: String | Number | CommaDelimitedList | List | AWS Parameter
  * Constraints: Min | Max | Defaults | AllowedValues
  * Reference: Fn::Ref or !Ref
  * Pseudo parameters: AccountId, StackName, StackId, Region, NoValue, NotificationARNs
* Mappings
  * Fixed variables
  * Eg:. RegionMap AZ use specific AMI
  * Access Mapping value: Fn::FindInMap or !FindInMap [MapName, TopLevelKey, SecondLevelKey]
  * eg:. !FinInMap [RegionMap, !REf "AWS::Region", 32]
* Output
  * They can be used to export to other CloudFormation templates
  * Fn::ImportValue or !ImportValue to reuse an output
  * An stack with refence outputs used by other stack can't be deleted
  * Names must be unique in the Region
* Conditions
  * Control creation of resources or outputs
  * !And, !Equals, !If, !Not, !Or
* Intrinsic Functions
  * Ref
    * Parameters: Return the value
    * Resources: Return the physical ID
  * GetAtt
    * Allows to get additional values, not just the name
  * FindInMap
  * ImportValue
  * Join: Join values
    * !Join[":",[a,b,c]]
  * Sub: Substitute
    * !Sub
      * String
      * {Var1Name: Var1Value, Var2Name: Var2Value}
  * Conditions
* Rollback
  * Default: everything rolls back (gets deleted). Can be disabled
  * If stack update fails, it rolls back to the previous state. Can be disabled

## Monitoring

### AWS CloudWatch

* Metric: Collect and track
  * Variable (CPUUtilization, NetworkIn, etc)
  * Belong to namespaces
  * Dimensions is an attribute of a metric (instance id, environment, etc)
  * Up to 10 Dimensions per metric
  * Have timestamps
  * Can create dashboards
  * EC2
    * Default: every 5 minutes
    * Detailed monitoring: every minute
    * To have EC2 Memory have to use a Custom Metric
  * Custom Metrics
    * Standard: 1 minute
    * High Resolution: 1 second - higher cost (APICall StorageResolution)
    * Use API PutMetricData to send a custom metric
    * Use exponential back off
* Logs
  * Collect and analyze
  * Send to S3 for archival
  * Send to ElasticSearch for analytics
  * Storage architecture
    * Log group --> Log stream
  * Log expiration policy
  * To send logs, make sure IAM permissions are correct
  * Encryted can be set to logs at rest using KMS at Group Level
  * Policy expiration should be set at Group Level
* Events
  * Send notifications
  * Schedule or Event Pattern
  * Creates an small JSON with information about the event
* Alarms
  * React in real-time
  * Options: sampling, %, max, min, etc
  * Status
    * OK
    * INSUFFICIENT_DATA
    * ALARM
  * Period
    * High resolution period to trigger [10sec -30sec]

### AWS X-Ray

* Troubleshoot performances (bottlenecks)
* Tracing microservices and dependencies
* Review behaviors
* Identify affected users
* Compatible
  * Lambda, Beanstalk, ECS, ECL, API Gateway, EC2, OnPremise
* Leverages on Tracing
  * Annotation can be added to traces to provide extra-info
* Scope
  * Every request
  * Sample request (% or Rate per Minute)
* Security
  * IAM for authorization
  * KMS for encryption at rest
* Enable on EC2
  * Code (JAVA, Python, Go, Node.js, .NET) must import X-Ray SDK
    * Capture Call to AWS services, HTTPS/HTTPS, Database Calls, SQS
  * Install X-Ray deamon or enable X-Ray AWS Integration
  * Low level IDP packet interceptor
  * Each app must have the IAM rights to write data to X-Ray
* Enable on Lambda
  * Uses an IAM Role with policy AWSX-RayWriteOnlyAccess
* Enable on Elastic Beanstalk
  * Create an xray-deamon.config in the .ebextensions folder

### AWS CloudTrail

* Audit API calls
* If a resource is deleted, look into CloudTrail first

## AWS Integration & Messaging

### SQS

* Standard Queue
  * 10 years old
  * Up to 10k msg/sec
  * Default retention 4 days, Up to 14 days
  * Low latency <10ms
  * Up to 256KB per message
* Delay Queue
  * Default delay 0*, Up to 15 minutes
  * Use DelaySeconds to overwrite queue configuration
* Message
  * Body
    * String up to 256KB
    * Metadata [Key-Value]
  * Return
    * Message identifier
    * MD5 hash
* Consumers
  * Receive up to 10 message at a time
  * Process the message withing the visibility timeout
  * Delete the message using ID & receipt handle (DeleteMessage)
* Visibility Timeout
  * Default 30*, Min 0, Up to 12 hours
  * Use ChangeMessageVisibility to overwirte queue configuration
* Dead Letter Queue (DLQ)
  * Redrive Policy: Send to a DLQ when visibility timeout has exceeded a threshold
* Long Polling
  * From 1 to 20* seconds
  * Use WaitTimeSeconds to overwirte queue configuration
* FIFO Queue
  * Queue names must end with .fifo
  * Messages are processed in order and only once
  * Not available in all regions
  * Lower throughput 3k/sec with batching, 300/s without
  * No per message delay (only per queue)
  * De-deplication interval 5 min
  * Message GroupID allows to group. Extra tag
  * Only one worker per group
* Advance Concepts
  * SQS Extended Client
    * Allows to send large messages
    * Use S3 to store the message
  * Security
    * HTTPS for in flight
    * SSE
      * Can set CMK
      * Can set the data key reuse period. From 1 min up to 24 hours
        * Lower KMS API call, less secure, less expensive
      * Only encrypts the body, not the metadata
      * IAM controls usages of SQS
      * SQS queue access policy
        * Finer grained
      * No VPC Endpoint, must use internet to access SQS
  * API Calls
    * CreateQueue | DeleteQueue
    * PurgeQueue
    * SendMessage | ReceiveMessage | DeleteMessage
    * ChangeMessageVisibility
  * Batch APIs
    * SendMessage | DeleteMessage | ChangeMessageVisibility
  
### SNS

* Producer send one message to the topic
* Up to 10 million subscriber per topic
* 100k topics
* Fan Out
  * Push to one SNS, receive in many SQS