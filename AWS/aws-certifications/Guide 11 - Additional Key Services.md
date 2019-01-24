# CHAPTER 11

## Additional Key Services

### Storage and Content Delivery

#### Amazon CloudFront

* Global CDN. Less latency
* Use DNS geo-location to determine edge location
* Support all content via HTTP/S, dynamic web pages, streaming HTTP/RTMP
* Accelerate delivery of static/dynamic content
* Up to 100k Request Per Second
* Key Concepts
  * Distributions: DNS domain name (auto or user-friendly name)
  * Origin: DNS name of origin (eg:. S3 bucket, EC2 Instance, LB, URL, On-Premise apps)
  * Cache Control
  * Default expiration: 24 hours
  * Controlled by: Cache-Control headers or setting Minimum/Maximum/Default TTL
  * Objects can be removed using Invalidation API
  * Versioning can also be used as a best practice. Old version objects expire automatically
* Advance Features
  * Dynamic content
  * Multiple Origin
  * Cache Behaviors: Applied in order (help to serve dynamic content)
    * Path patterns (eg:. php, jpeg)
    * Which origin to forward requests
    * Whether to forward query strings
    * Whether accessing requires signed URL
    * Whether to require HTTPS
    * Amount of time of cache, regardless the value of Cache-Control headers
  * Whole Website
  * Private Content
    * Signed URL: Valid for certain times and from IP address
    * Signed Cookies: Require authentication via public/private key pairs
    * Origin Access Identifier (OAI): Restrict access to an S3 bucket to allow only CloudFront distribution
* Use Cases
  * Serve static content: images, CSS, JavaScript
  * Serve whole website: dynamic/static, multiple origin, cache behaviors, short TTL for dynamic content
  * Serve content to user widely distributed geographically
  * Distribute software or large files
  * Serve streaming media
* Not useful when
  * Request come from a single location
  * Request come from a VPN
* Pricing
  * Regional Data Transfer out (per GB)
  * Request (per 10k)
  * If the origin is an AWS storage, the data transfer is free
  * Regional Data Transfer Out of Origen (for external origins)
  * Optional commitment payment to get a significant discount

#### AWS Storage Gateway

* On-Premise appliance storage
* Stored encrypted by default
* Service to connect on-premise software with cloud storage
* Appliance is available for download as a VM image to install on-premise
* Storage of VM is exposes as iSCSI that can be mounted by on-premise applications
* Types
  * File Gateway
    * Similar to an NFS
    * Deployed as a VM
    * Interface to S3
  * Generic-Cache Volumes
    * All data is moved to Amazon S3. Frecuent data is retained locally
    * Maximum volume 32TB
    * Single gateway support 32 volumes (total 1PB)
    * Allow incremental snapshots (point-in-time)
    * Snapshots are sent to S3 using HTTPS and encrypted at rest using SSE
    * Snapshots can only be accesed via the Gateway
  * Gateway-Stored Volumes
    * Store data on-premise, an asynchronous backup in sent to S3
    * Backups are stored in EBS
    * Maximum volume 12TB
    * Single gateway support 32 volumes (total 512TB)
    * Allow incremental snapshots (point-in-time). EBS snapshots. Scheduled or one-time
    * Snapshots can be used to create an new EBS volume
    * Volume and snapshots are sent to S3 using HTTPS and encrypted at rest using SSE
    * Snapshots can only be accesed via the Gateway
    * Another gateway can be attached if case of failure in the on-premise data center
  * Gateway Virtual Tape Libraries (VTL)
    * Gateway can contain 1500 tapes (1PB)
    * Use Virtual Tape Shelf using Amazon Glacier
    * Allow 1 VTS per Region, multiple gataways can share a VTS
* Pricing
  * Gateway usage (per gateway/month)
  * Snapshot Storage usage (per GB/month)
  * Volume Storage usage (per GB/month)
  * Virtual Tape Shelf Storage (per GB/month)
  * Virtual Tape Library Storage (per GB/month)
  * Retrieval from Tape Shelf (per GB)
  * Data transfer out (per GB/month)

### Security

#### AWS Directory Service

* Allows connect existing on-premise Microsoft AD or standalone in the cloud
* Deployed using Multi-AZ and automatic detection of failure of Domain Controllers
* Types
  * AWS Directory for Microsoft AD (Enterprise edition)
    * Can work as new or extend existing domains using trust relationship
  * Simple AD
    * Microsoft AD compatible using Samba 4
    * Support: user, groups, domain-joining linux/microsoft instances, Kerberos-based SSO, group policies
    * Integration with Amazon WorkSpaces (Desktop computer service), Amazon WorkDocs (share documents), Amazon WorkMail (Email & Calendar)
    * Daily automated snapshots
    * Not supported: trust relationship, DNS dynamic update, schema extension, MFA, LDAP, PowerShell AD cmdlets, Flexible Single Master Operation (FSMO)
  * AD Connector
    * Proxy service to connect cloud with on-premise Microsoft AD
    * Users can access Cloud services with their own company credentials

#### AWS Key Management Service (KMS)

* Generation, exchange, storage, use and replacement of keys
* KMS
  * Symmetric: same key to encrypt/decrypt
  * Customer Manage Keys: Use a type of key called Customer Masker Key (CMK) - Fundamental resource
    * It is use to encrypt/decrypt up to 4KB of data
    * Also use to encrypt data keys
    * Never leave AWS KMS unencrypted
  * Data keys
    * It is used to encrypt large data objects
    * After using GenerateDataKey a plaintext and ciphertext
  * Envelope Encryption: Method
  * Encryption Context: optional key/value
    * To decrypt the same Encryption Context must be provided
* Process
  * Creates data key
  * Encrypt under CMK
  * Returns: Plaintext and encryted versions
  * Use plaintext key to encrypt data + store encrypted key
  * Can retrieve plaintext data key only when having encrypted data key + permission to use the master key
* Not related with temporary Security Tokens

#### AWS CloudHSM

* Hardware appliances
* Use to store cryptographic key material
* Best practice is to use two HSM's in high availability
* Create/Control both symmetric and asymmetric keys (public/private)

#### AWS CloudTrail

* Record API calls: API, identity of caller, time, parameters, response elements
* Deliver log files to an Amazon S3 bucket
* Optionally can deliver logs to a a group monitor by Amazon CloudWatch Logs
* A notification using SNS can sent every time a log file is sent to bucket
* Tipically deliver within 15 minutes
* Types
  * Trail to all regions (best practice)
    * One SNS topic and one CloudWatch group
  * Trail to one region
* Logs are encrypted by default using SSE
* Logs can use a LifeCycle policy
* Logs are sent around 15 minutes after API call

### Analytics

#### Amazon Kinesis

* Load and analyze streaming data
* Stream in composed of one or more shards
* Up to 1000 PUT record per second per shard
* Up to 1MB size message
* Amazon Kinesis Firehose
  * Load
  * Store options
    * S3
    * Redshift (initially store and S3 and then COPY)
    * ElasticSearch (optional a backup to S3 is available)
* Amazon Kinesis Strems
  * Analyze real-time
  * Can use multiple shards
  * Use Kinesis Client Library (KCL) to build real-time dashboards, generates alerts, etc.
  * Store record for 24 hours by default, up to 168 (7 days)
  * A "Consumer" get data from kinesis streams
* Amazon Kinesis Analytics
  * Analyze using standard SQL

#### Amazon Elastic MapReduce (EMR)

* Hadoop framework
* Cluster initialization requieres: Instance Type, Number of nodes, Hadoop version, additional tools (Hive, Pig, Spark, Presto)
* Useful for analyze data already store in AWS
* Allow SSH root level access
* Storage Type
  * HDFS (Hadoop Distributed File System) - Transient cluster
    * default
    * Data is replicated among multiple instances
    * Amazon Instance (lost data after shut down) or Amazon EBS for HDBS (persist data after shut down)
    * Best for 24x7 cluster
  * EMRFS (EMR File System) - Persistent cluster
    * Store data in S3
    * Data persits after shut down
    * Best for transient cluster
* Increase Perfomance
  * Split size, increase number of mapper tasks
* Use cases
  * Log Processing
  * Clickstream Analysis: segment users and understand preferences
  * Genomics and Life Science

#### AWS Data Pipeline

* Process and Move data between AWS compute, storage, on-premise at specified intervals
* Transfer to: Amazon S3, Amazon RDS, Amazon DynamoDB, Amazon EMR
* Pipeline schedule definition: run every 15 minutes, every day, every week, etc.
* Pipeline interacts with Data Nodes for read/write
* Pipeline executes activities
* If an activity need extra resource, Pipeline will launch and tear down automatically after completion
* Support precondition (evaluate if conditional statement before starting)
* If fail, retry is automatic after a configured limit. Actions can be taken
* Use cases
  * Batch mode ETL
  * Regular activity, contrary to Kinesis with es best suit for data streams

#### AWS Import/Export

* Services which accelerates transfering large data amounts using appliances (On-Premise Datacenter or AWS Region)
* Allows bypassing internet
* Types
  * Snowball
    * Storage appliance protected by AWS KMS
    * Encryption is enforced at rest and in transit
    * Manage jobs through AWS Snowball console
    * 256-bit encryption
  * Snowball edge
    * 100TB device
  * Snowmobile
    * exabyte-scale
    * Up to 100PB
    * Semi-trailer truck
    * GPS tracking + security personnel + 24/7 video surveillance
  * Disk
    * Transfer from own devices using a high speed internal network
    * Import to Glacier, EBS and S3
    * Export data from Amazon S3
    * Encryption is optional
    * Upper limit of 16TB
    * Export from Glacier not supported
* Use cases
  * Storage Migration: After shutting a data center
  * Migrating applications
* Pricing
  * Servoce fee (per Job)
  * extra day charges after 10 days
  * Data transfer

### DevOps

#### AWS OpsWorks

* Configuration Management service using CHEF
* Include: architecture, package installation, software configuration, storage, etc
* Support Linux/Windows
* Support cloud instances or on-premise servers
* Architecture = Stack. Divided by layers
* Chef recipes: tasks such installing packages, instances, deploy applications, running scripts
* Support lifecycle event to run automatic recipes at time
* Applications and Files are stored in a repository (GIT, Amazon S3, etc)
* Each applications is represented by an App: Application type + repository
* Components
  * Stacks
  * Layers
  * Chef recipes
  * Instances
  * Apps
* Use cases
  * Host Multi-Tier applications
  * Continuous integration

#### AWS CloudFormation

* Allows deploy, modify and update resources in a controlled and predictable way
* Applies version control of AWS infrastructure
* Works with Templates and Stacks
* Template: JSON text file (or YAML format)
* Parameters can be used to set minor changes (different VPC, AMI's)
  * Sections
    * Format version
    * Description
    * Metadata: Info
    * Parameters
    * Mappings
    * Conditions
    * Resources (mandatory)
    * Outputs
* Stack
  * Collections of resouces that are managed as a single unit
  * Define an stack and AWS CloudFormation manages the provisioning
  * If you delete an stack it will delete also the resources, unless a Deletion Policy was set
  * If a resource fails to delete, the stack will remains
* Allow diagram visualization with AWS CloudFormation Designer
* No pricing in involved
* list-stacks: created stacks and deleted in the last 90 days
* Deletion Policy: Avoid deletion of a resource when stack is deleted
  * Rollback automatically if an error occured (default behavior)
  * Use cases
    * Quickly launch new environments
    * Replicate configuration between environments (accross regions)

#### AWS Elastic Beanstalk

* Allow deploy code, AWS automatically do the rest
* AWS Elastic Beanstalk application is a collection of components: environments, version, environment configuration. Similar to a folder
* Application version
  * points to Amazon S3 object of deployable code
* Environment
  * Is an application version that is deployed onto AWS resources
  * Run a single version at a time
* Environment configuration
  * Collection of parameters and settings
  * After an update changes are applied automatically or a deletion and new deploy is created (depends on the type)
* Environment Tier
  * web server tier: process web applications requests (HTTP)
  * worker tier: run background jobs
* Support
  * Languages: Java, Node.js, PHP, Phyton, Ruby, Go
  * Web containers: Tomcat, Passenger, Puma, Docker
* Settings
  * Select appropiate Amazon EC2 instance type
  * DB engine
  * Enable login to EC2 instances for troubleshooting
  * Type of traffic HTTP/S
  * Application server settings
  * Auto-Scaling settings

#### AWS Trusted Advisor

* Inspect environment to make recommendations
* API: AWS Support
* Categories
  * Cost optimization
  * Security
  * Fault Tolerance
  * Performance improvement
* Dashboard colors
  * Red: Action recommended
  * Yellow: Investigation recommended
  * Green: No problem detected
* Free checks (4)
  * Service Limits: 80%
  * Unrestricted security groups: 0.0.0.0/0 to specific ports
  * IAM use
  * MFA on Root Account: warns if not enabled

#### AWS Config

* Resource inventory, configuration history, configuration change notification
* Allow auditing, security analysis, change tracking and troubleshooting
* Detailed view of the resources and interconnection with others. Also how was the configuration in the past
* After turning on, AWS Config generates a configuration file for each resource
* Configuration item include: Metadata, attributes, relationships, current configuration and related events
* Configuration recorder: saves a new configuration item when a change is detected
* By detaulf every resource in the region is recoerded. Also it can be specified which items to record
* AWS Config Rule: Support definition of rule in order to be notified if a change violates one of them
* Use Cases
  * Discovery
  * Change management
  * Continuous Audit and Compliance
  * Trobleshooting
  * Security
* Key features
  * Integration with CloudTrail Logs
  * Notification is sent when a Configuration File is delivered to Amazon S3
  * Notification is sent when a customer initiates a Configuratio Snapshot
  * Notification are sent using SNS
  * Every six hours an history file is sent to Amazon S3 with all changes

#### AWS Code Commit (GIT repository)

#### AWS Code Build (Compile, run tests and package)

#### AWS Code Deploy (automates code depoy on intances premise/cloud)

#### AWS CodePipeline (Cotinuous integration and delivery, build, test, deploy)

#### AWS X-Ray (Analyze and debug, help troubleshooting)

#### AWS API Gateway

* Uses cloudfront to improve response time
* Act as a AWS Service proxy
* Stages: Similar to tags / variables
* CORS: Cross Origin Resource Sharing
* Swagger: Import
* API Caching: Reduce latency (Not in the free tier)
* Throttling limit request, if exceeded generates error 429 (too many requests)
* /ping /sping reserved paths for health checks
* Create --> Deploy
