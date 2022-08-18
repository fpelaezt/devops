## AWS Cloud Computing Platform

* Premium Support: Bacic (6 Trusted Advisor), Developer (6 TA), Business (Full TA), Enterprise (Full TA)
* Accessing: Management Console, CLI, SDKs
* Console: https://<account_id>.signin.aws.amazon.com/console
* SDK (Java, .NET, Node.js, PHP, Python, Ruby, Go, C++, AWS Mobile SDK) - Not supported (Pascal, SQL, Perl)

### Compute/Networking

* Amazon Elastic Compute Cloud EC2 (virtual servers)
* AWS Lambda (ejecución de código)
  * Supports Javascript, Node.js, Java, Phython, C#
  * 512MB of temp space
  * Maximum execution time 300s
  * Metrics: Total Requests, Latency, Error Rates
* Auto Scaling
* Elastic Load Balancing
* ECS: Docker Container
* ECR: Docker Container Registry
* Amazon Lightsail: Launch instances
* AWS Batch: Run batch jobs
* AWS Elastic Beanstalk (deploys web application)
* Amazon Virtual Private Network VPC (isolated cloud network)
* AWS Direct Connect (private Link different from regular VPN)
  * Allow connection to all AZ in the nearest Region
  * Multiple Direct Connect are allowed per region
  * Best practice is to configure a VPN as a backup
* Amazon Route 53 (DNS)
* Amazon EC2 Auto Recovery (self healing)

## Storage/Content

* Amazon Simple Storage Service S3 (objects)
* Amazon Glacier (long-term backup)
* Amazon Elastic Block Store EBS (block level - file systems)
* AWS Storage Gateway (connection On-Premise with AWS)
* Amazon CloudFront (content delivery)

### Database

* Amazon Relational Database Service RDS
* Amazon SimpleDB (NoSQL)
* Amazon DynamoDB (NoSQL)
* Amazon Redshift (SQL data warehouse)
* Amazon ElasticCache (supports Memcached and Redis engines)

### Management Tools

* Amazon CloudWatch (monitor cloud resources)
* AWS CloudFormation (JSON-base template for provisioning resources)
* AWS CloudTrail (API calls log file)
* AWS Config (inventory and configuration history)
* Amazon EC2 Manager (run commands, inventory, apply patches, parameter stores - keys)

### Security and Identity

* AWS Identity and Access Management IAM (control access)
* AWS Key Management Service KMS (control encryption keys, uses Hardware Security Modules HSMs)
* AWS Directory Service (Microsoft Active Directory)
* AWS Certificate Manager (manages SSL/TLS, pay for resources where are used)
* AWS Web Application Firewall WAF (protects web applications)

### Application Services

* Amazon API Gateway (deploy and manage APIs)
* Amazon Elastic Transcoder (transcode media files)
* Amazon Simple Notification Service SNS (manages reception/delivery messages)
* Amazon Simple Email Service SES (send/receive mails)
* Amazon Simple Workflow Service SWF (build/run background parallel/secuencial jobs)
* Amazon Simple Queue Service SQS (decouples)

### Migration

* AWS Application Discovery Services (Collects configurations and usage data from on-premise)
* AWS Database Migration Service (DMS - use also for data replication)
* AWS Server Migration Service

### Other services

* Amazon Kinesis (load and analysis streaming data in real-time)
* Amazon Elastic MapReduce (Big Data: Hadoop, Spark, HBase, Presto, Hive, etc)
* Amazon OpsWorks (Chef Automate y AWS Opsworks Stacks)
* Amazon Cloud Directory (Similar to an Active Directory)
* AWS Service Catalog (Allow approved IT services)
* AWS Personal Health Dashboard (Alert and remediation, view performance of resources)
* AWS Managed Services (Automates tasks like change requests, patches, backup, enforce policies)
* Amazon Inspector (Asses applications for vulnerabilities or deviation from best practices)
* AWS Organizations (Groups of AWS accounts)
* AWS Shield (Managed DDoS protection, Standard and Advance, Advance:Access to DRT DDoS Response Team)
* Amazon Athena (Interactive SQL query service)
* AWS CloudSearch (Search solution for website or application)
* Amazon QuickSight (BI Service)
* AWS Glue (ETL service to move data)
* Amazon Lex (Conversation interface for voice and text,       Automatic Speech Recognition ASR, Natural Language Understanding NLU, chatbots)
* Amazon Polly (Transform text into likelike speech)
* Amazon Rekgonition (Image analysis)
* Amazon Machine Learning (predictions)
* AWS Mobile Hub (Create and configure mobile backend features)
* Amazon Pinpoint (Run targeted campaigns for mobile apps)
* AWS Device Farm (Allow to test and interact with Android, IOS and web apps on many devices at once)
* AWS Mobile SDK (Build mobile apps)
* Amazon Mobile Analytics (Allow measure app usage and revenue)
* AWS Step Functions (Coordinate distributed applications and microservices, graphical console)
* Amazon Chime (Online meetings)
* Amazon AppStream 2.0 (Stream desktop application to a web browser)
* AWS IoT Platform (Internet of things)
* AWS Greengrass (Local compute, messaging and data caching for connected devices)
* AWS IoT Button (Amazon Dash Button Hardware)
* Amazon Gamelift (Deploy, operate and scaling dedicated game servers)
* Amazon Lumberyard (free, cross-platform 3D game engine)
* Amazon DevPay and FPS (Amazon Flexible Payments Service) billing (deprecated)
* Amazon Resource Names (ARNs): uniquely identify AWS resources
* AWS CloudHub (Provides secure communication between remote sites)
* AWS Cost Explorer (billing of AWS resources y views and charts)
* AWS Budgets
