
# Automation

## CloudFormation

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
    * Mappings (Allows use it in different Regions)
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
* Support CloudFormation Drift Detection to detect changes outside the templates

## Elastic Beanstalk

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
  * For better security store credentials on S3 files
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
* Supports
  * SQS
  * ASG

## System Manager

* Suite of Tools for AWS and On-Premise servers
* Uses an Agent on the servers
* Tools
  * Automation Documents (Runbooks)
  * Run Command (scripts)
  * Path Manager
  * Parameter Store
  * Hybrid Activations (control on-premises resources)
  * Session Manager (Remotely connect)
* No cost for AWS resources
