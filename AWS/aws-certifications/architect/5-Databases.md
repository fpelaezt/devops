## Databases and AWS

* Relational Databases
  * Use Structured Query Language (SQL)
  * Tables have Primary Key and Foreign Key
  * Columns must be defined prior to add data
  * Require a VPC with a subnet in at least two AZ
  * Supports: MySQL, Oracle, PostgreSQL, Microsoft SQL Server, MariaDB, Amazon Aurora

* Types
  * Online Transaction Processing (OLTP)
    * Transaction in real time
    * Change data frequently
  * Online Analytical Processing (OLAP)
    * Data warehouses, read data optimized, complex querys
    * Updated on Batch Schedule
    * Amazon Redshift

* NoSQL
  * Improve perfomance
  * Allows horizontal scalability
  * Key/Value or documents with flexible schemas
  * Implementations: Hbase, MongoDB, Cassandra, CouchDB, Riak, Amazon DynamoDB

### Amazon Relational Database Service (RDS)

* Features: Scaling, HA, Backups, SO/Engine Patches, Software installation
* Doesn't provide shell access
* Partially managed DB
* Instances
  * Isolated database environment
  * Can contain multiple databases
  * DB Instance class: compute/memory
  * DB parameter group: container of configuration to apply to many instances
  * DB option group: container for engine features. Disable by default
  * Migrate using mysqldump or Amazon Migration Service
* Commands
  * CreateDBInstance
  * ModifyDBInstance
  * CreateDBSnapshot
  * DeleteDBSnapshot
  * ModifyDBInstance
* Engines
  * Features
    * Multi-AZ supported by ALL (Except SQL Server - Uses SQL Server Mirroring)
    * StandBy in the same Region
    * Read Replicas: MySQL, MariaDB, PostgreSQL, Aurora
    * Licensing
      * License Included: Oracle (Standard One), SQL (Express, Web, Standard)
      * Bring Your Own License (BYOL): Oracle (Standard One, Standard, Enterprise), SQL (Standard, Enterprise)
  * MySQL
    * InnoDB storage engine
    * MyISAM engine doesn't support reliable crash recovery
  * PostgreSQL
  * MariaDB
    * XtraDB storage engine. Enterprise version MySQL
  * Oracle
    * Standard One, Standard, Enterprise
  * Microsoft SQL Server
    * Versions: SQL Server 2008 R2, SQL Server 2012, SQL Server 2014
    * Editions: Express (No Multi-AZ), Web (No Multi-AZ), Standard, Enterprise
  * Amazon Aurora
    * Based on MySQL (5x > MySQL, 3x > PostgreSQL)
    * Size of chunks of 10GB to 128TB
    * Up to 96 vCPUs and 768GB RAM
    * Up to 50k reads/100k writes per second
    * 2 copies on each AZ, minimum 6 AZ. Total of 6 copies. Can lose 2
    * Storage is self-healing. Data blocks and disk are repaired automatically
    * 99.99% availability
    * Replica
      * Up to 15 Aurora replicas (in three different AZ)
      * Up to 5 MySQL or PostgreSQL replicas
    * Backups
      * Doesn't affect performance
      * Snapshots doesn't affect performance
    * Aurora Serverless
      * BD cluster automatically scales up/down based on application
* Storage Options
  * Built on EBS (Magnetic, General Purpose SSD, Provisioned IOPS SSD. From 5GB to 6TB. 30k IOPS
* Backup
  * Recovery Point Objective (RPO): Maximum period of data loss
  * Recovery Time Objective (RTO): Maximum recovery from backup
  * Automated
    * Storage volume snapshot of DB Instance
    * Default 1 day retention. Up to 35 days
    * Deleted after DB Instance deletion
    * Ocurr daily on a 30-minute maintenance window
  * Manual
    * Remain after DB Instance deletion
  * Performance
    * I/O suspenstion and high latency during backup.
    * To minimize latency use Multi AZ. Snapshot is taken from the Slave Database
* Recovery
  * A new DB Instance is created when restore
  * Default DB parameter and security group is applied after restore
  * Custom DB paramater and security group must be associated after restore
  * If automated backup is used, the daily backup and transaction log allow to recover to around the last 5 minutes
  * Using a DB Snapshot the whole database need to be restored. Individual tables are not allowed
  * For MySQL avoid tables beyond 6TB
* High Availability
  * Master-Slave Synchronous replication
  * Use for disaster recovery only (Increase availability)
  * Read are not allows on Slave Instance
  * Use an endpoint CNAME
  * Detects automatically: loss availability, connectivity, compute/storage failure, instance type changes
  * Support manual failover. Takes around two minutes
* Replication
  * Multi-AZ: Synchronous replication
  * Read Replicas: Asynchronous replication
* Monitoring
  * Metrics: CPU Util, DB Connections, Free Storage Space, Freeable Memory
* Scaling
  * Scaling Up=Vertical
    * Change Instance Type (Compute/Memory)
  * Scaling Out=Horizontal (For some engines)
    * Sharding
      * Partitioning into multiple instances or shards
      * Requires logic in the application
    * Read Replicas
      * Increase scalability
      * Handle read traffic separated
      * Cross-Region replicas is supported
      * Each read replica has its own DNS endpoint
      * Automatic Backups is mandatory
      * Can be promoted to a DB itself (breaks replication)

### Amazon DynamoDB

* Fully NoSQL
* Use High performance SSD storage
* Synchronously replicates data across 3 facilities
* Distribute traffic and tables over multiple partitions
* After setting capacity, scaling out/in is done automatically
* Provide High availability/durability by replication data in AZ (default)
* Advantages of Cross-Region Replication
  * Disaster Recovery
  * Faster reads
  * Traffic managment
  * Migration
* Data Model
  * Table, Item (has a primary key), Attributes
  * Item size limit 1 byte to 400KB
  * Attributes are name with single/multi value. Duplicate values not allowed
* Access Data
  * Submit request over HTTP/S to read/write items
  * API endpoint accepts JSON format
* Data Types
  * Scalar Data Types: one value
    * String: Up to 400KB
    * Number: Up to 38 digits (+/-)
    * Binary: Up to 400KB
    * Boolean
    * Null
  * Set Data Types: Unique list of scalar with same type
    * String set
    * Number set
    * Binary set
  * Document Data Type: Multiple nested attributes
    * List: ordered list of attributes of different data types
    * Map: unordered list of key/value. Used to represent JSON objects
* Primary Key (2 types)
  * Must be defined as String, Number or Binary
  * Partition Key
    * 1 attribute = hash key. Eg: CallID 123
    * Hash is used to distibute (eg:. UserName)
  * Partition and Sort Key: 2 attributes = hash + sort (range) key. (Eg:. CallID+Number, UserName + TimeStamp)
* Provisioned Capacity
  * When create a table a Read/Write capacity need to be set. Modify by command UpdateTable
  * The consumed capacity depends on: size of item, read consistency (eventual/strong)
  * READ: 1 capacity in 4KB or smaller
  * WRITE: 1 capacity in 1KB or smaller
  * With CloudWatch: ConsumedReadCapacityUnits, ConsumeWriteCapacityUnits, ThrottledRequests (exceed)
* Secondary Indexes
  * Global Secondary Index
    * Another Partition + another Sort Key (can be deleted)
    * An update maintain its own provisioned throughtput sepparate from the table
    * Can be created after table exists
    * Can query entire table across all partitions
  * Local Secondary Index
    * Same Primary Partition Key + Different Sort Key (hash key + random key)
    * Multiple are supported
    * Need to be created at the same time as the table
    * An update consume write capacity in the main table
    * 10 GB size limit per partition key value
    * Can query only the partition
    * Eventual/Strong consistency
* Writing/Reading
  * Writing (API actions)
    * PutItem: Create/Update
    * UpdateItem: Create/Update. Support Atomic Counters
    * DeleteItem: Delete
  * Reading
    * GetItem, Query, Scan actions
  * Eventual Consistency
    * Read after Write can produce to read old data. Due to replication time
  * Strong Consistency
    * Force to read the most up-to-date. Consume double capacity
  * Bath Operations (allow bulk operations)
    * BatchGetItem
    * BatchWriteItem: Up to 25 create/update
* Searching
  * Query: Requires partition key and distinct value. Sork Key is optional. Automatic sorted results up to 1MB
  * Scan: Read every item in the table. Results up to 1MB
  * Use ProjectionExpression to limit the returned attributes
* Scaling/Partitioning
  * Tables are divided in partitions based on Partition Key
  * Provisioned Capacity is dedicated per partition
  * A partition can hold up to 10GB, Maximum support of capacity of 3K for reading and 1k for writing
  * Portions of unused capacity will be reserved to handle burst in short periods
  * Amazon will split in partition if needed, but once it's donde can't be merged back
  * Best practice: create partition key with hash to distribue uniformly
* Security
  * Using IAM you can control of actions, tables, items, attributes
  * For Mobile combine Web Identity Federation with AWS STS
  * FGAC (Fine Grained Access Control) & Per-Client Embedded Token: item level access control
  * SSE not supported. To encrypt before storing must used a Client side library or a AWS KMS
  * Encryption at rest using KMS
  * Site-to-Site VPN connection
  * Direct Connect (DX)
  * Integrate with CloudWatch / CloudTrail
  * Support VPC endpoints connections
* Streams
  * Allows get a list of item modifications for the las 24-hours
  * Buffered in a time-ordered sequence or stream. An application can read this stream
  * This feature can be disable/enable
  * Streams are organized into groups or shards
  * Recommendation is to use Amazon DynamoDB Kinesis 
  * Can be combined with Lambda to simulate procedures
* Global Tables
  * Multi-Master, Multi-Region
  * Based on DynamoDB Streams
  * Allows multi-region redundancy for DR
  * Replication latency under 1 second
* Transactions
  * Requires DynamoDB Transactions to provide ACID (Atomic Consistent Isolated Durable)
  * All or Nothing
  * Use Cases: Financial transactions
  * Reads
    * Eventual Conistency
    * Strong Consistency
    * Transactional
  * Writes
    * Standard
    * Transactional
  * Up to 25 items or 4MB data per transaction
* Operations
  * Query
    * Limit scan request result to 1MB, scan for next 1MB
    * Find items in a table or a secondary index using only primary key attribute
  * scan
    * Retrieve all table
    * Reads every item in a table or a secondary index
* Backups
  * Full backups at any time with zere impact
  * Operates in the same region
  * PITR (Point-In-Time Recovery)
    * Any time in the last 35 days
  * Not enabled by default
  * Last restorable time in 5 min in the past
* Scaling
  * Provisioned
    * Predictable workload
    * Set upper and lower scaling limits
    * Cost-Effective model
    * Can switch from pricing model every 24 hours
  * On-Demand
    * Sporadic workload
    * Pay money per read/write
    * Less cost-effective
* Support Infrequent-Access Tables
