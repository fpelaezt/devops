# CHAPTER 12

## Security on AWS

* Shared Responsability Model
  * AWS: Compute, Storage, Database, Networking, Regions, Availability-Zones, Edge Locations
  * Customer: Data, Platform, Application, OS, Firewall configuration, Client Side Encryption, SSE, Network traffic
* AWS Compliance Program
  * IT Standards: SOC, SSAE16, ISAE 3402, SAS 70, SOC2, SOC3, FISMA, DoD DIACAP, FedRAMP, DoD SRG Level 2/4, PCI DSS Level 1, ISO 9001/27001, ITAR, FIPS 140-2
  * Industry Specific Standards: CJIS, CSA, FERPA, HIPAA, MPAA
  * Whitepaper AWS Risk and Compliance
* Defense in depth
  * Security paradigm where every layer is secured
* Global Security Infrastructure
  * Physical and Environment: control, surveillance, log, auditing
  * Fire detection and Suppression
  * Power: UPS, Generators
  * Climate and Temperature
  * Management: preventive maintenance
  * Storage device decommissioning
  * Business Continuity Management
  * Availability
  * Incident Response: 24x7x365
  * Communication

### Network security

* Secure Network Architecture: Rules sets, ACLs
* Secure Access Points: Limited and redundant connection
* Transmission Protection: HTTP/S, VPC, VPN
* Corporate segregration for AWS developers and admins
* Fault-Tolerant Design: N+1
* AWS GovCloud: Isolated Region to meet regulatory requirements for US goverment
* Network Monitoring and Protection
  * DDoS (Distributed Denial of Service) Attacks
  * MITM (Man In The Middle) Attacks
  * IP Spoofing
  * Port Scanning: Be careful, violates AWS Acceptable Use Policy
  * Packet sniffing by Other Tenants: best practice is encrypt sensitive data
  * ARP Cache poisoning not allowed

### AWS Access

* Account review and background checks of Amazon employees
* New developments are tested
* Change management: software

### AWS Account Security

* AWS Security Credentials
  * Passwords: AWS root account, IAM users. /[a-ZA-Z0-9]{6-128}/. Allow password policy definition
  * MFA: AWS root account, IAM user, AWS inter account. TOTP (Time-Base One-Time Password)
  * Cryptographic access keys: Digitally signed API requests. Access Key ID (AKI) + Secret Access Key (SAK)
  * Key Pairs: SSH Login. RSA 2048-bit SSH-2 key pair
  * X.509 Certificates: Digitally signed SOAP request to API SSL. Public Key associated with a Private Key
  * Signature Version 4
    * Calculation process (provides message integrity and replay attack prevention)
    * Provides identity of requestor, protect data in transit, protect against replay attacks
* AWS CloudTrail
  * Support file integrity

### AWS Cloud Service-Specific Security

* Compute Services
  * EC2: IaaS, host OS, guess OS, firewall, signed API calls.
    * Key Pair: Customer has the private key. AWS encrypts password with the public key.
    * Hypervisor
      * Customized Xen hypervisor. 4 separated privileges 0-3 (rings) mayor to least privileges.
      * Host OS ring 0, Guest OS ring 1, Application ring 3
    * Isolation: Multiple instances running in the same physical machines are isolated via Xen Hypervisor. Ram is separated
    * Host OS: Administrators of AWS with MFA
    * Guest OS: Controlled by customer. Best practice of hardening are recommended
    * Firewall: Inbound traffic deny by default. Best practice is also use IPtables or Windows Firewall
    * API Access: Launch/Terminate are signed by Secret Access Key. Recommendation is to use SSL-protected API endpoints
    * Tenancy: Shared instance, Dedicated instance, Dedicated host
      * Instance profile can contain an IAM role
  * EBS
    * Access is restricted to the owner or IAM users
    * Data in EBS in redundantly store in different location of the same AZ.
    * To share a snapshot, create new and copy specific data. This avoid access to sensitive data (even deleted files)
    * Raw unformatted block devices.
    * Good practice is to encrypt using AES-256. Available to powerful instance types to avoid latency
  * Networking
    * Load Balancer
      * Manage SSL, first line of defense, security groups
      * Different SSL options available: Payment Card Industry Data Security Standard (PCI DSS), Sarbanes-Oxley Act (SOX)
      * Supports Perfect Forwarding Secrecy: Avoid decoding even if secret long key is compromised
      * Allows that servers know the IP address of clients
      * Logs can track IP address of clients and back-end servers that managed the request
      * Support Server Order Preference to select Cipher, otherwise Client will choose the Cipher
  * VPC
    * Private address, security groups, ACLs, Routing Tables, external gateways
    * Allow  modification of security group and any protocol port. Instance security group only allow TCP/UDP/ICMP
    * API access requires a signed
    * Every subnet is associated to a Routing Table
    * Dedicated instances
      * physically isolated
  * CloudFront
    * Authenticated API
    * Service private content feature: geo restriction
    * Origin Access Identities
  * Direct Connect Security
    * Dedicated connection in a nearby facility
  * Storage
    * S3: Permission, logs, location to store
    * Data Access: IAM policies, ACLs, Bucket policies, Query String Authentication (pre-signed URL), parameters (date, IP, etc).
    * IAM (User-Level control), ACLs (AWS Account-Level control), Bucket Policies (User and Account Level control)
    * Metadata is not encrypted
    * Data transfer: Allow SSL for upload/download
    * Storage: Can be encrypted at rest. Using Client Encryption or Server Side Encryption (SSE). Metadata is not encrypted
      * EBS: Replicate in one AZ in the Region
      * S3: Different AZ in the Region
    * Encryption uses AES-256: object key and encrypted with a rotated master key
    * A bucket policy can force to only encrypted data can be uploaded
    * Cross-Region Resource Sharing (CORS): Allow objects being referenced by external web pages
    * Glacier: Allow SSL transfer, after retrieval data is available for 24 hours
    * Storage Gateway: Allow SSL transfer
  * AWS Import/Export Security (Snowball)
    * Bypass internet using a portable device
  * Database
    * DynamoDB:
      * Full or incremental backups, fine-grained access controls
      * Not support Server Side Encryption
      * To Encrypt tables use Client-Side or AWS KMS before storing
      * Federation can be used to give permissions
    * RDS: DB security groups (authorized a network IP range or an existing Amazon EC2 sg)
    * MySQL: launch using --ssl_ca
    * SQL Server: Download public key. Support Transparent Data Encryption (TDE) for Enterprise
    * Oracle: uses a native encryption. Support TDE for Enterprise
    * TDE encrypts before writing to storage and decrypts when reading
    * Redshift
      * Massively Parallel Processing (MPP)
      * Grant permission on a per-cluster instead of per-table
      * User can see data only in the table row generated by own
      * 4-tier key-based architecture 
        * Data encryption keys: Per data block. keys are encrypted using a database key for the cluster
        * Database key: stored on disk in a separate network from cluster. keys are encrypted using a cluster key
        * Cluster key: Encrypted by a Master key. Can use AWS or Hardware Security Module (HSM)
        * Master key
      * Support newer stronger cipher: Elliptic Curve Diffie-Hellman Ephemeral (ECDHE)
      * Permission are set per-cluster and not per-table
  * ElastiCache
    * In-Memory cache environment

### Application Services

* Amazon CloudSearch
  * Search in webpages, document files, forum posts or product information
  * Separated in domains: indexes, stopwords, synonyms, rank
  * Access to a domain is restricted by IP address
  * Every request need to be authenticated
* Amazon SQS
  * IAM users are allowed to restricted operations and queues
  * Data stored with SQS is not encrypted
* Amazon SNS
  * Topics are restricted
  * Support transmission over HTTPS
* Amazon SES
  * Email verification of viruses/malware
* Amazon Elastic Transcoder Service
* Amazon AppStream
* Analytics
  * Elastic MapReduce
    * Two security groups: 1 for Master, 1 for Slaves
  * Kinesys
    * Data records contains: sequence number + partition key + data blob
* Deploy and Management
  * IAM
  * CloudWatch
  * AWS CloudHSM
* Mobile Services
  * Amazon Cognito
    * Identity and sync services for mobile and web-based applications. Integration with Google/Facebook/Amazon
    * Use roles
    * Client SDK uses a SQLite to work offline
    * Cognito receive an OAuth or OpenID Connect token and return an CognitoID for the user
  * Amazon Mobile Analytics
* Applications
  * WorkSpaces
    * Cloud-based desktops. Uses PCoIP to transmit pixels and no data. Supports MFA.
    * Authentication: PAP, CHAP, MS-CHAP1, MS-CHAP2, RADIUS
    * Each workspace resides in its own Amazon EC2 Instance
  * WorkDocs
