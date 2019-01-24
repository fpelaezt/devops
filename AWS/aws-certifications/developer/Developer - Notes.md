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
    * Use API __PutMetricData__ to send a custom metric
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
  * Use __DelaySeconds__ to overwrite queue configuration
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
  * Use __ChangeMessageVisibility__ to overwirte queue configuration
* Dead Letter Queue (DLQ)
  * Redrive Policy: Send to a DLQ when visibility timeout has exceeded a threshold
* Long Polling
  * From 1 to 20* seconds
  * Use __WaitTimeSeconds__ to overwirte queue configuration
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
  
### AWS Kinesis

* Alternative to Apache Kafka
* Big Data streaming tools
* Real-Time big data
* Automatically replicated to 3 AZ
* Kinesis Streams
  * Low latency ingest
* Kinesis Analytics
  * Real-time analytics using SQL
* Kinesis Firehose
  * Load streams into S3, Readshift, ElasticSearch
  * Near real-time (60ms)
  * Pay for the conversion and amount of data
* Stream are divided in ordered Shards / Partitions
* Default retention 1 day, Up to 7 days
* Ability to reprocess / replay data (go back in time)
* Multiple application can consume same streams
* Once data is inserted, it can't be deleted
* Shards
  * 1MB/s or 1k messages/s at write per shard
  * 2MB/s at read per shard
  * Billed per shard
  * Batching available
  * Records are ordered per shard
  * Number of shard can change (reshard / merge)
* Put Records
  * __PutRecord__ API + Partition Key
  * Same key goes to same partition
  * Random key to prevent hot partition
  * __PutRecords__ for Bash
  * If gets error __ProvisionedThroughputExceeded__ when limits exceded
* Consumers
  * Normal consumer: CLI, SDK, etc
  * Kinesis Clien Library (Java, Node, Python, Ruby, .NET)
    * Uses DynamoDB to checkpoint offsets
    * Uses DynamoDB to track other workers and share work among shards
* Security
  * Encrytion at rest is available
  * VPC endpoints available

## AWS Lambda

* Virtual functions
* Limited by time
* Run on-demand
* Scaling is automated
* Pay per request and compute time. See [Pricing](https://aws.amazon.com/lambda/pricing/?nc1=h_ls)
* Free Tier: 1 million and 400.000 GB seconds of compute time
* Easy monitoring with CloudWatch
* Easy to get more resources per function
* Support: Node.js, Python, Java, C#, Goland, .NET
* Configuration
  * Timeout
  * Environment variables
  * Allocated memory
  * Ability to deploy in a VPC
  * Must have a role
* Concurrency
  * Can be set a limit using "Reserve concurrency"
  * Each extra invocation trigger a __Throttle__
    * syncrhonous invocation: return __ThrottleError__ - 429
    * asyncrhonous invocation: retry automatically twice and then go to DLQ
* DLQ types: SNS topic or SQS queue
* Limits
  * Time: Default 3 sec, up to 300 sec
  * Memory: 128M to 3G (3008MB) - 64MB increments
  * Disk: 512MB in /tmp
  * Concurrency: 1k
  * Code: 50MB .zip
  * Code: 250MB uncompressed
  * Env Variables: 4KB
* Versions
  * Code + Configuration
  * Versions are inmutable
  * $LATEST: Current
* Aliases
  * Pointers to Lambda versions
  * Mutable
  * Enable weight traffic to new versions
* Best practices
  * Heavy-duty outside function handler
    * Connection to DB
    * Initialize AWS SDK
    * Pull it dependencies
  * Environment varialbes
    * Connections strings, S3 buckets
    * Sensitive values must be encrypted
  * Minimize deployment package
  * Don't use recursive code
  * Don't put in a VPC unless needed

## DynamoDB

* Fully managed NoSQL Serverless Database
* Scales horizotally
* All data is present in one row
* High available with replication across 3 AZ
* Support millions of requests/sec and TB storage
* Low latency
* Enable event driver programming with DynamoDB Streams
* Tables
  * Primary Key (decided at time creation)
  * Tables can have infinite items (rows)
  * Itimes has attributes (can be added over time)
  * Maximum item size is 400KB
  * Data types
    * Scalar: String, Number, Binary, Boolean, Null
    * Document: List, Map
    * Set: String, Number, Binary
* Primary Key
  * Option 1: Partition Key (Use to distribute data). Similar to SQL tables
  * Option 2: Partition Key + Sort Key (Combiation must be unique)
* Provisioned Throughput (Capacity Units)
  * Can be exceeded using "burst credit"
  * If "burst credit" is empty, get an error __ProvisionedThroughputException__
  * It's advised to do exponential back-off retry
  * WCU: Write
    * 1 WCU is equivalent to
      * 1 write/sec
      * Item of 1 KB
    * Formula = (write/WCU=[1])/sec * (Size/1KB)
    * It need to round size (up) to a multiple of 1KB
  * RCU: Read
    * 1 RCU is equivalent to
      * 1 read/sec (strongly consistent)
      * 2 read/sec (eventually consistent)
      * Item size 4KB
    * Formula = (read/RCU=[1,2])/sec * (Size/4KB)
    * It need to round size (up) to a multiple of 4KB
* Data is divided in partitons
  * Number of partitions
    * By Capacity: (TOTAL RCU / 3000) + (Total WCU / 1000)
    * By Size: (TOTAL SIZE / 10 GB)
    * Total partitions: CEILING(MAX(Capacity, Size))
  * WCU/RCU are spread evenly between partitions
* Throttling
  * If RCU/WCI are exceeded, get an error ____ProvisionedThroughputExceededException__
  * It happens becuase: Hot keys, Hot partitions, Very large items
  * Solutions
    * Exponential back-off
    * Distribute partitions
    * If RCU issue, use DynamoDB Accelerator (DAX)
* API
  * PutItem
  * UpdateItem
    * Conditional Writes: Only if conditions are respected
  * DeleteItem
    * Individual row
    * Conditional delete
  * DelteTable
  * BatchWriteItem
    * Up to 25 PutItem / DeleteItel
    * Up to 16MB
    * Up to 400KB of data per item
    * Operations are donde in parallel
    * Up to user to rety faile updates
  * GetItem
    * Option to use strongly consistent
    * __ProjectionExpression__ can be used to obtain only certain attributes
  * BathGetItem
    * Up to 100 item
    * Up to 16 MB
  * Query
    * Return item based on Partition + SortKey
    * __FilterExpression__ can be used on clien side
    * Return Up to 1MB
    * Number of items specified in __Limit__
  * Scan (inefficient)
    * Read entire table
    * Return Up to 1MB
    * Consume a lot of RCU
    * Number of items specified in __Limit__
    * Parallel scan to faster performance
    * Can use __ProjectionExpression__ + __FilterExpression__
* Indexes
  * Local Secondary Index (LSI)
    * Alternate range key
    * Up to 5 per table
    * One scalat attribure
    * Must be defined at table creation time
  * Global Secondary Index (GSI)
    * Spped queries on non-key attributes
    * Partition key + Optional sort key
    * Index is a new "table", we can project attributes
      * KEYS_ONLY
      * INCLUDE
      * ALL
    * Must define RCU/WCU for index
    * Possibility to add/modify GSI (not LSI)
* Concurrency
  * Optimistic locking / concurrency database
* DAX
  * Cache, all writes go through DAX
  * Solves the Hot Key problem (too many reads)
  * 5 minutes TTL for cache
  * Up to 10 nodes in the cluster
  * Multi AZ
* DB Streams
  * Changelog end up in a stream
  * Stream can be read by AWS Lambda to:
    * React in real time
    * Analytics
    * Create derivative tables /views
    * Insert into ElasticSearch
  * Could implement cross region replication
  * 24 hours retention
* Security
  * VPC Endpoints available
  * Controlled by IAM
  * Encryption at rest using KMS
  * Encryption in transit using SSL / TLS
* Backups and Restore features
  * No performance impact
  * Point in time restore like RDS
* Global Tables
  * Multi region, fully replicated, high performance
* Amazon DMS to migrate to DynamoDB
* A local DynamoDB can be launch in the computer for testing

## API Gateway

* Handle API versioning
* Handle different environments
* Handle security (AA)
* Handle throttling
* Create API keys
* Integration with Swagger / Open API to import APIs
* Transform/Validate requests/responses
* Cache API responses
* Changes must be deployed to "Stages"
* Stages
  * Environments
  * Variables
    * Similar to env vars to change configuration
    * Are passed to the __context__ of Lambda
    * Use Case: point to Lambda alias
* Canary Deployment
  * Choose % traffic
* Mapping Templates
  * Can modify boddy, parameters, request/responses
  * Can add headers
  * Can map JSON to XML
  * Use VTL language (Velocity Template Language)
* Swagger (Open API spec)
  * Define REST APIs as code
  * Import/Export
* Caching
  * TTL from 0-300 sec. Default 300s
  * Can be encrypted
  * Storage from 0.5-237 GB
  * Can be defined per stage or per methods
  * Can flush entire cache
  * Client can invalidate with header __Cache-Control:max-age=0__ (proper IAM authorization)
* Monitoring (with proper IAM role)
  * CloudWatch Logs
    * Enable at Stage level
  * CloudWatch Metrics
    * Metric are by stage
  * X-Ray
* CORS
  * Cross Origin Resource Sharing
  * Enable to other domains
  * OPTIONS pre-flight request must contain these headers
    * __Access-Control-Allow-Methods__
    * __Access-Control-Allow-Headers__
    * __Access-Control-Allow-Origin__
* Usage Plans
  * Limit customers
  * Throttling: Overall and burst capacity
  * Quotas: Number of request per day/week/month
  * Associated with API Stages
* API Keys
  * Per customer
  * Associate with plans
  * Track usage for API Keys (bill clients)
* Security
  * IAM Permissions
    * Sig v4: Authorize User/Rol to access API Gateway
  * Lambda Authorizer (Custom Authorizer)
    * Use Lambda to validate toker in header
    * Option to cache result of authentication
    * Pey per Lambda invocation
    * Help to use OAuth / SAML / 3rd party authentication
  * Cognito
    * Manage user lifecycle
    * Only help with authentication (not authorization)

## AWS Cognito

* Product Types
  * Cognito User Pools (CUP)
    * Sign in functionality for app users
    * Integrated with API Gateway
    * Serverless database of users
    * Can enable Federated Identities (Facebook/Google/SAML)
    * Sends back a JSON Web Token (JWT)
  * Cognigo Identity Pools (Federated Identity)
    * Provides AWS credentials to user to access AWS resources directly
    * Integrated with Cognito User Pools
  * Cognito Sync
    * Synchronize data from device to Cognito
    * Deprecated and replace by AppSync
    * Requires Federates Identity Pool (not User Pool)
    * Store data in datasets (Up to 1MB)
    * Up to 20 dataset to synchronize

## SAM (Serverless Application Model)

* Framework for developing and deploying SAM
* Config are YAML files
* Support CloudFormation components
* YAML
  * Header: Transform: 'AWS::Serverless-2015-10-31'
  * Helpers:
    * 'AWS::Serverless::Function' (Lambda)
    * 'AWS::Serverless::Api' (API Gateway)
    * 'AWS::Serverless::SimpeTable' (DynamoDB)
  * Package & Deploy
    * aws cloudformation package / sam package
    * aws cloudformation deploy / sam deploy
* [SAM Examples](https://github.com/awslabs/serverless-application-model/tree/master/examples/apps)

## AWS Security

* Encryption in flight
* Encryption at rest
  * SSE
  * CSE
* KMS
  * Fully integrated with IAM
  * KMS can only 4KB of data per call
  * If data > 4KB use envelope encryption
  * Create/Rotate/Disable/Enable
  * Types of CMK
    * AWS Managed Service Default CMK: free
    * User Kery created in KMS: $1/month
    * User Keys imported (256-bit symetic key): $1/month
  * Pay for API call to KMS ($0.03/1k calls)
  * API
    * Encrypt
    * Decrypt

* Encryption SDK
  * Helps to use Envelope Encryption
  * Different from S3 Encryption SDK
  * Exists as a CLI tool
  * API Call: GenerateDataKey API

* AWS Parameter Store (SSM)
  * Simple Systems Manager
  * Secure storage for configuration and secrets
  * Free
  * Version tracking
  * Integrated with IAM
  * Notification with CloudWatch Events
  * Integration with CloudFormation
  * Organized by Hierarchy

* STS
  * Security Token Service
  * AssumeRole API
  * Temporaty credentials [15m - 1 h]

## Other AWS Services

### AWS CloudFront

* Content Delivery Network (CDN)
* Improve read performance
* Around 136 Point of Presence (edge location)
* Support RTMP Protocol

### AWS Step Functions

* Build serverless visual workflows to orchestrate Lambda functions
* Represent flow as JSON state machine
* Features: sequence, parallel, conditions, timeouts, error handling
* Can also integrate with EC2, API Gateway
* Maximum execution time: 1 year

### AWS Simple Workflow Service (SWF)

* Coordinate work amongst applications
* Code run on EC2 (not serverless)
* Older than Step Functions ()
* Used over Setp Functions only if external signals or child processes are needed

### AWS ECS (Elastic Container Service)

* Help to run Docker containers on EC2 machines
* Components
  * ECS Core: Running ECS on EC2 instances
  * Fargate: Running ECS tasks (serverless)
  * EKS: Running ECS on Kubernetes (EC2)
  * ECR: Docker Container Registry
* IAM and roles at the ECS task level
* Use Cases: microservices, batch processing, migrate apps
* Concepts
  * ECS Cluster
  * ECS Service
  * ECS Tasks + Definition
  * ECS IAM roles
* ALB (App Load Balancer) integration
  * Use Dynamic Port Mapping
* Setup
  * EC2 Instance
  * Install
    * ECS agent
    * Config file
      * /etc/ecs/ecs.config
        * __ECS_CLUSTER__: Assign EC2 to ECS cluster
        * __ECS_ENGINE_AUTH_DATA__:  Pull images from private registries
        * __ECS_AVAILABLE_LOGGING_DRIVERS__: CloudWatch container loggin
        * __ECS_ENABLE_TASK_IAM_ROLE__: Enable IAM roles for ECS tasks

### AWS Databases

* RDS: OLTP
  * PostgreSQL, MySQL, Oracle, Aurora
* DynamoDB: NoSQL
* ElasticCache: In memory DB
* Redshift: OLAP
  * Analytic
  * Data Warehousing / Data Lake
* Neptune: Graph DB
* DMS: Database Migration Service