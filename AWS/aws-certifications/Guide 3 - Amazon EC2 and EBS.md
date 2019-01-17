# CHAPTER 3

## Amazon Elastic Compute Cloud (Amazon EC2) and Amazon Elastic Block Store (Amazon EBS)

## Amazon Elastic Compute Cloud EC2

* Adquire compute power using Virtual machines called Instances
* Default limit 20 per Region
* No cost for data transfer to S3 in the same Region
* Two primary concepts
  * Amount of virtual hardware
  * Software loaded
* Instance Types
  * Vary from: vCPU's, Memory, Storage, Network
  * t2, m[4-5]	: balanced
  * T                   : Burstable
  * c[3-5]              : compute
  * r[2-4], x1          : memory
  * d2, h1, i[2-3]      : storage (high I/O)
  * f1, g[2-3], p[2-3]  : accelerated computing
  * g2                  : GPU-based (graphics)
* Netwotk performance
  * Low
  * Moderate
  * High
  * (10 Gbps) - enhanced network
    * Single Root I/O Virtualizaton SR-IOV. 
    * More Packets Per Second PPS, less latency, less Jitter
    * Available only in VPC. Drivers and enable feature.
* AMI
  * Amazon Machine Image
  * Define: OS, Patches, Applications
  * x86 Windows/Linux
* Disks
  * /dev/sda1: Resserved for the root device
  * Block device mapping: Allow to view EBS volumes or instance volumes attached at launch
* AMI Sources alternatives
  * Published by AWS: Ubuntu/RedHat/Amazon/Windows 2008-2012/etc. Need apply patches after installation
  * AWS Marketplace: Per-hour price for Applications
  * Generated from Existing Instances
  * Uploaded Virtual Servers: VM Import/Export from raw/VHD/VMDK/OVA
  * Golden Image: re-customized image
  * Linux
    * PV (Paravirtual)
    * HVM (Hardware Virtual Machine)
  * Types
    * EBS-Backed (root disk is deleted by default on termination, but can persist if it's configured). Recommended
    * Instance Store backed
* Accessing
  * Public DNS Name: Name is auto-generated. Persist only while is running
  * Public IP: IP is auto-assigned. Persist only while is running
  * Elastic IP: Assigned and reserved by the user. Transferable to another instance. Only billed when not used.
  * Private IP
  * Elastic Network Interface
* Initial Access
  * Public Key Crytography: Key pair (public-private) for login information
  * Change initial password as a best practice
  * Linux
    * Default user is "ec2-user"
    * public key ~/.ssh/authorized_keys
  * Windows
    * Random password for Administrator
    * Decrypted password can be used via RDP
* Virtual Firewall Protection
  * Called Security Groups
  * Control traffic base on port/protocol/source/destination
  * Every instance must have at least one security group
  * Deny by default
  * Source/destination
    * CIDR Block: x.x.x.x/x
    * Security group: instances associated to one security group
  * Stateful firewall
  * Applied at Instance level
* LifeCycle
  * If receive "InsufficientInstanceCapacity: Insufficient capacity" = AZ has no capacity
  * If receive "InstanceLimiteExceeded" = Limit of 20 has been reached
  * Launching
    * Bootstrapping: Provide UserData (code to run at launch) to configure the instance (eg: Patches, Enroll to AD)
    * UserData is not encrypted. Avoid using passwords
    * VM Import/Export
      * Only available to previously imported instances
    * Instance Metadata
      * HTTP call. Curl http://169.254.169.254/latest/meta-data
      * Include: security group, ID, type, AMI used to launch
    * Managing Instances: Tags Key/Value pair. Up to 10 tags per instance
    * Monitoring: Amazon CloudWatch
    * Termination Protection: It doesn't protect against shutdown command, auto-scaling, spot instance
    * InstanceInitiatedShutdownBehavior allows terminate from OS shutdown commadns. Overrides Termination protection
* Options
  * Pricing
    * On-Demand: Unpredictable workloads
    * Reserved: Capacity reservation for predictable workloads
      * Term commitment: Duration of the reservation (1 or 3 years)
      * Payment Option
        * All Upfront: Pay all the reservation
        * Partial Upfront: Pay a portion and the rest monthly
        * No Upfront: Pay monthly
        * Can change: Availability zone, EC2-VPC to EC2-Classic, Instance type in same family (Linux only), Security Groups (Only in a VPC)
        * After terminated can be sold in the AWS RI Marketplace
      * Stop/Restart instances start a new billing hour
    * Spot Instances
      * Not critical. User set a price willing to pay
      * Until: Customer action, Spot price goes above bid price, no capacity
      * Customer receive a notification and two minutes before terminating
      * Use for analytics, financial modeling, big data, scientific, testing
      * If instance is terminated for AWS the running hour won't be charged
    * EC2 Scheduler: Use for automatically stop/start instances based on schedule
    * User Data: allocate scripts to autoconfigure instances
  * Tenacy
    * Shared tenacy: default, multiple customers in same host
    * Dedicated instances: runs in dedicated hardware
    * Dedicated host: Address license requirements
    * Placement groups
      * logical group in a Availability zone.
      * Low latency 10 Gbps network. Activate Enhancement networking
      * AWS will try to start in same host, start all of them at the same time to increase probability
      * It hasn't any charge
  * States
    * Pending
    * Running
    * Shutting-down
    * Terminated
    * Rebooting
    * Stopping (Not apply for instance-store)
    * Stopped (Not apply for instance-store)
* Best practice
  * Use webserver in a private network
* Commands
  * Instead of SSH/RDP “Run Command” can be used
  * aws ec3 describe-instances
  * revoke-security-group-egress, revoke-security-group-ingress

## Amazon EC2 Instance Storage

* Temporary block-level storage volumes EC2 for instances
* Called also Ephemeral Storage/Drives
* Provides High IOPS
* Use for data that change frequently. Cache, buffer, etc.
* Can't be detached/attached to another instance
* Located on the same physical server than the instance
* Types
  * Hard Disk Drive (HDDs) Backed Dense-Storage (d2 family)
    * Massive Parallel Processing (MPP), MapReduce, log or data-processing
    * 3.5 GiB/s read, 3.1 GiB/s
    * Up to 48TiB
    * Specialized in throughput and sequential reads
  * Solid State Drive (SDDs) Backed Storage-Optimized (i2 family)
    * NoSQL databases (Cassandra, MongoDB), Data warehousing, Hadoop
    * 365k random IOPS reads, 315k random IOPS writes
    * Up to 6.4 TiB
    * Specialized in very high random IOPS
* Encryption is achived by user tools or by a third party software from AWS Marketplace
* Data is lost when: drive fails, instance stops, instance terminates. Persist after instance reboot.

## Amazon Elastic Block Store (Amazon EBS)

* Block storage volumes for EC2 instances
* Automatically replicated inside Availability Zone
* A volume can be attached to only one instance. One instance can have many volumes
* Can be changed in size, iops and type without detaching from instance
* RAID 0 increase bandwidth (throughput)
* Types
  * Magnetic volumes
    * Size 1GB to 1TB
    * Average of 100 IOPS. Burst hundreds of IOPS
    * Lower price, lowest performance
    * Suitable for: infrequent access, sequential reads
    * Maximum throughput: 40MB-90MB/s
    * Billed based on provisioning space
  * General-Purpose SSD
    * SSD suited for transactional workloads, small block
    * Better perfomance
    * Size 1GB to 16TB
    * 3 IOPS per Giga, up to 10000. 1T=3000 IOPS
    * Volumes under 1TB burst up to 3000 IOPS. Accumulate I/O credits where they are not used
    * Suitable for: Small/Medium databases, DEV/TEST environments, Boot volumes, Virtual desktops
    * Maximum throughput: 160MB/s
    * Billed based on provisioning space
  * Provisioned IOPS SSD
    * Size 4GB to 16TB
    * IOPS configurable: Max value = Lower (30 per GB, 20000 IOPS)
    * Can stripe multiple values together in RAID
    * Maximum throughput: 320MB/s
    * Billed based on provisioning space and IOPS
    * Suitable for: larga databases workloads, IOPS intensive application
    * Ratio IOPS/size = 50. A volume with 5k IOPS at least 100GB
  * Throughput-Optimized HDD
    * HDD suited for throughput-intense workloads, large block
    * Up to 16TB
    * Maximum IOPS 500, Maximum throughput 500MB/s
    * Suitable for Big Data, data warehouses, log processing, ETL
  * Cold HDD
    * Size up to 16TB
    * Maximum IOPS 250, Maximum throughput 250MB/s
    * Frequent access, intensive throughput
* Amazon EBS-Optimized Instances
  * Apply to all types except Magnetic
  * Optimized I/O and dedicated capacity
  * Increase paid price per hour
* Protecting Data
  * Backup/Recovery (Snapshots)
  * Incremental backups
  * Way to take snapshots: Management Console, CLI, API, Schedule
  * Saved in Amazon S3. Pay for the storage used (low price)
  * Saved not in user buckets. User cannot manipulate them
  * Snapshots are contained in a Region
  * Best practice is to initialize a volume created from a snapshot accessing all the blocks
  * Can be used to resize the volume
  * Data is available immediately
  * In RAID configuration avoid I/O in order to make an snapshot
* Recovering
  * If a instance fails, boot drive volume should be dettached an attached to a new instance
  * Unless "DeleteOnTermination" flag is enable
  * Data is available inmediately (Lazy, data will be restore after request)
  * Only latest snapshot is needed
* Encrypting
  * If is needed, Amazon Key Management (KMS) can be used. AES-256
  * The server decrypt the volume
  * Minimal effect on latency
  * When copying can encrypt an unencripted snapshot
* Migrate to another AZ
  * Take a snapshot and create a new EBS in the targe AZ
* Pricing
  * Provisioned storage
  * I/O request
  * Snapshot storage
* Status
  * Auto check every 5 minutes
  * OK, IMPAIRED, INSUFFICIENTE-DATA

## EFS: Elastic File System

* Network File storage
* Scales Up/Down automatically
* Supports NFSv4 NFSv4.1
* Store in Multi-AZ
* Can be shared between several instances at the same time
* Performance modes
  * General-Purpose
  * Max I/O: Exceed 7k file operations/seconds/filesystem
* Credit system for burst workloads
* Pricing
  * Storage (GB/month)
