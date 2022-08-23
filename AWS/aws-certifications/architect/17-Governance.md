# Governance

## Organizations

* Best practice has an account for Logging
* CloudTrail supports logs aggregation
* Shared Instances across all accounts
* Consolidated Billings
* Service Control Policies (Allows setup limits per user)
  * For child policies restrict even the root account
  * Deny: Explicitly deny something and leave the rest untouch
  * Allow: Deny everything except the allow rule (you can't use SCP for allowing permissions, only for remove the rest)

## Resource Access Manager

* Share resources across other account in a organization
* Shared resources
  * Transit Gateways
  * VPC Subnets
  * License Manager
  * Route 53 resolvers
  * Dedicated Hosts
  * etc
* Use RAM on same region
* Use VPC Peering with different regions

## Cross-Account Role

* Useful for avoiding multiple credentials for same users across different accounts

## AWS Config

* Inventory Management and Control tool
* Features
    * Discovering resources}
    * Rules to flag, alerts or even fix automatically
    * History of the environment
* Allows consolidation of results into a single region
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

## Active Directory

* Allows connect existing on-premise Microsoft AD or standalone in the cloud
* Deployed using Multi-AZ and automatic detection of failure of Domain Controllers
* Types
  * AWS Directory for Microsoft AD (Enterprise edition) - Managed Microsoft AD
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

## Cost Explorer

* Allows to visualize cloud costs
* Supports predictive costs

## AWS Budgets

* Create alarms for costs
* Types
  * Cost
  * Usage
  * Reservation
  * Saving Plans

## AWS Trusted Advisor

* Inspect environment to make recommendations (best-practice auditing tool)
* API: AWS Support
* Categories
  * Cost optimization
  * Security
  * Fault Tolerance
  * Performance improvement
  * Service Limits
* Dashboard colors
  * Red: Action recommended
  * Yellow: Investigation recommended
  * Green: No problem detected
* Free checks (4)
  * Service Limits: 80%
  * Unrestricted security groups: 0.0.0.0/0 to specific ports
  * IAM use
  * MFA on Root Account: warns if not enabled
