# CHAPTER 2

## Amazon Simple Storage Service S3 and Amazon Glacier

* Amazon S3
  * Object storage
  * Offers storage classes (General purpose, Infrequent access, Archive)
  * Lifecycle policies (auto-migration of data to appropriate class)
  * Security (Permission, Access controls, Encryption options)
* Amazon Glacier
  * Optimized for archiving and long-term backup
  * Low cost. USD$0.004 per GB/month
  * Can be used as S3 class or as an independent service
* Object Storage
  * Difference from traditional storage: Block & File System
    * Block: set of numbered fixed size blocks
    * File System: high-level operating system, hierarchy files-folders
  * Amazon Storage: S3 objects
  * Managed by API HTTP verbs
  * Contains Data-Metadata
  * Resides in Buckets
    * Simple flat folder
    * Unlimited objects
  * GET/PUT the whole object
  * Optimized for reads
  * Auto-Replication in Multiple devices/location in a Region
  * Uses case: Store BLOB (Binary Large Objects)
  * Alternatives
    * Amazon EBS: Block level
    * Amazon Elastic File System EFS: Network-attached NAS. Shared between instances or on-premise

### Buckets

* Container (web folder)
* Global name: similar to a DNS
* 63 letters: lowercase, numbers, periods
* Labels are separated by periods. All label must start/finish with lowercase/number
* Up to 100 per default
* Stored in a Region
* Ownership cannot be transferred
* Objects
  * Entities/Files
  * Any kind of data / Any format
  * Size from 0 bytes to 5TB
  * Amazon doesn't care about type of data
  * Metadata: Name/Value
    * System Metadata: Created and used by Amazon S3. Size, LastModified, MD5 Digest, HTTP Content-Type
    * User Metadata: Optional. Can be set only after creation
  * Keys or Filename
    * Unique identifier per Bucket: 1024 bytes UTF-8
  * URL
    * http://mybucket.s3.amazon.com/fa/jack.doc
    * mybucket = Bucket name
    * fa/jack.doc = Key
    * Real example: http://examplebucket.s3-website-us-east-1.amazonaws.com/photo.jpeg
    * bucket-name.s3-website-Region.amazonaws.com
  * Prefix/Delimiter helps to navigate in the AWS console "simulating" a folder
* Operations
  * Create/Delete Buckets
  * Write/Read/Delete/List Keys of Objects
  * REST Interface
    * Representational State Transfer API
    * Create = PUT (sometimes POST) - Maximum 5GB
    * Read = GET
    * Delete = DELETE
    * Update = POST (sometimes PUT)
    * Always uses HTTPS
    * SOAP not recommended
* Durability: Exists in time (11 nines: 99.999999999%)
  * Alternative: Amazon Reduced Redundancy Storage (4 nines) at lower costs
* Availability: Access right now (4 nines: 99.99% per year)
* Additional Protection
  * Protect against user-level deletion/overwriting
  * Versioning, cross-region replication, MFA Delete
* Consistency
  * Read after modifying/deleting an Existing object can bring old data
  * This happens because it needs to propagate the change
  * This happens for Initial PUTS requests
* Access Control
  * course-grained
    * ACLs
      * legacy system, prior to IAM. Limited used only in some cases
      * READ/WRITE/FULL-CONTROL at object/bucket level
  * fine-grained
    * IAM policies
    * Bucket policies
      * Recommended option
      * Similar to IAM
  * Query-string authentication
  * Differences: Associated with a bucket resource instead of IAM principal
    * Allows cross-account access
    * Specifies: Who, From where (Classless Inter-Domain Routing CIDR block or IP), When (what time)
  * Public permission can be set at creation of object
* Static Web Site Hosting
  * Can support easily static hosting
  * Use the bucket name as the webpage and enable static hosting
  * Name: bucket-name.s3-website-ap-southwest-1.amazonaws.com

### Amazon S3 Advance Features

* Prefixes/Delimiters
  * Best practice is to use /\ for delimiter, and prefixes simulating a hierarchy
* Storage Classes
  * Standard - General Purpose
  * Standard-IA Infrequent Access
    * Lower cost, minimum object size 128KB, minimum duration 30 days
    * Cost per-GB retrieval
    * Reduced Redundancy Storage RRS
    * Lower cost, Lower durability (4 nines)
  * Amazon Glacier
    * Extremely low costs
    * Retrieval time of hours
    * After restored a copy in Amazon S3 RRS is created
    * Free to restore 5% per month of the total size of Amazon Glacier
    * Cost per restore beyond 5% of total size per month
    * Best practice is to set a policy to restrict restores and avoid paying
* Object Lifecycle Management
  * Allows to configure a policy of how data is managed
  * Create in Standard, after 30 days change to Standard-IA,   After 90 days change to Glacier, Delete after 3 years
  * Attached to bucket or all objects with a prefix
  * Requires enable versioning*
* Encryption
  * Recommends encrypt all sensitive data
  * In flight: Using HTTPS API Secure Socket Layer (SSL) endpoints
    * Enable encryption adding x-amz-server-side-encryption in the request header
  * In rest
    * Use variations of Server Side Encryption SSE
    * SSE and AWS Key Management Service KMS uses 256-bit AES
    * Also can be encrypted on Client-Side
    * Server Side Encryption
      * SSE-S3 (AWS Management Keys)
        * Every object is encrypted by a unique Key
        * Every Key is encrypted by a Master Key
        * Master Key is changed at least monthly
        * Encrypted data, encryption keys and master key are stored separately on secure hosts
      * SSE-KMS (AWS KMS Keys)
        * Additional advantages over SSE-S3
        * User manages the keys
        * Separate permission for using Master Key
        * Auditing to check who tries to access your data. Log failed attempts
      * SSE-C (Customer-Provided Keys)
        * Users has fully control of the keys but Amazon encrypts the data
    * Client-Side Encryption
      * 2 Options: AWS KMS-managed customer master key - Client side master key
* Versioning
  * Bucket level
  * Once activated it cannot be removed, just suspended
* MFA Delete
  * Delete action requires an additional authentication
  * Password generated by HW or virtual Multi-Factor Authentication device
* Pre-Signed URLs
  * Share objects per limited time
* Multipart Upload
  * Upload large objects in parts
  * Able to pause and resume
  * Three-step: initiation, uploading, completion (abort)
  * Arbitrary order
  * Should be used for objects larger than 100Mbytes, must for 5GB
  * Using high-level API is automatic
  * Lifecycle policy to abort incomplete multiparts
* Range GETs
  * Download (GET) only a portion of an object
  * Useful to deal with poor connectivity or download a known portion of large Amazon Glacier
* Cross-Region Replication
  * Replicate asynchronously Data/Metadata
  * Versioning MUST be active in both buckets and use an IAM policy
  * Useful to reduce latency or store backup in a certain distance
  * If set to an existing bucket, it applies only for NEW objects
* Logging
  * Bucket Logging
  * Track requests to buckets
  * Off by default. A location must be choose inside a bucket or in a different
  * Best practice in a prefix logs/
  * Best effort (slight delay).
  * Info (IP, Bucket name, Time, Action, Response/Error)
* Event Notification
  * Apply for upload/delete actions
  * Use to run workflows, send alerts, perform actions (eg: transcoding, process, synchronize)
  * Set at Bucket Level. Can be set on specific prefixes
  * Notifications can be sent through SNS/SQS/Lambda
* Transfer Acceleration
  * Enable in bucket and then a different endpoint is available (bucketname.s3-accelarate.amazonaws.com)
  * Uses cloudfront's edge locations
* Pricing
  * Storage (GB/month)
  * Data transfer in or out (GB/month)
  * Free from EC2 to S3 in same Region
  * Request (thousands/month)
  * If multiple AWS accounts are consolidated, discounts could apply (Paying account and Linked account)
* Best practices
  * Archive company data
  * Bulk data and keep index in Amazon DynamoDB/RDS
  * Automatically scale re-partitioning buckets
  * Include a random hash as a prefix in distribution of keys. This avoid I/O request to the same partition. Use for more than 100 GET per second
  * If intensive GET is needed, consider using CloudFront as a cache layer
* Multi-Object Delete

### Amazon Glacier

* Archive storage
  * Use as a replacement of Tape solution or compliance purposes
  * 11 nines of durability
  * In most cases is a large TAR or ZIP
  * Size from 0 to 40TB (S3 5TB)
  * Around $0.007 GB/month
  * Archives
    * Data are stored as archives
    * Unlimited number of archives
    * It is assigned a unique system-generated archive ID at creation. Not user-friendly
    * Automatically encrypted
    * Cannot be modified (immutable)
  * Vault
    * Archive containers
    * Up to 1000 vaults per account
    * Controlled by IAM and vault access policies
    * Vault lock policy such Write Once Read Many (WORM) and lock futures edits. Once locked, policy can't be changed
  * Data Retrieval
    * Free up to 5% per month calculated daily
    * To avoid charges, a limit can be set or a date rate transfer
  * Pricing
    * Storage (GB/month)
    * Data transfer out (GB/month)
    * Request (thousands UPLOAD-RETRIEVAL/month)
    * Prorated charged (per GB) for items deleted prior to 90 days
  