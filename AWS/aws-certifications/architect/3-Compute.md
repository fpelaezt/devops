## Amazon Elastic Compute Cloud EC2

* Adquire compute power using Virtual machines called Instances
* Default limit 20 per Region
* No cost for data transfer to S3 in the same Region
* A role can be attached
* Two primary concepts
  * Amount of virtual hardware
  * Software loaded
* Instance Types
  * Vary from: vCPU's, Memory, Storage, Network
  * Mac, t[2-4], m[4-6], a[1]       : balanced
  * T                               : Burstable
  * c[4-7]                          : compute
  * r[2-6], x[1-2], z[1]            : memory
  * d[2-3], h[1], i[3-4], Im, Is    : storage (high I/O)
  * f[1], g[3-5], p[2-4], dl[1]     : accelerated computing
  * g[2]                            : GPU-based (graphics)
* Networking
  * ENI (Elastic Network Interface)
    * Attachements types
      * Hot: Instance Running
      * Warm: Instance Stopped
      * Cold: Instance Launched
  * EN (Enhance Network)
    * SR-IOV: Single root I/O virtualization for high performance
    * 10Gbps - 100Gbos
    * Higher bandwidth Higher Packets Per Second (PPS), less Jitter
    * Consistently lower inter-instance latencies
    * Available only in VPC. Drivers and enable feature
    * Lower CPU Utilization
    * Types
      * ENA (Elastic Network Adapter) up to 100Gbps
      * INTEL 82599 Virtual Function (VF) Interface up to 10Gbps. Used on older instances
  * EFA (Elastic Fabric Adapter)
    * It's a network device to support HPC (High Perfomance Computing)
    * Can use OS-BYPASS for Machine Learning. Only Supported on Linux
* Placement groups
  * An stopped instance can be moved to a placement group
  * Types
    * Cluster
      * Grouped in a single AZ
      * Only Supported by some types of Instances
    * Spread
      * Separated on distinct hardware
    * Partition
      * Each partition group is in a different rack (different network/power sypply)
* Disks
  * /dev/sda1: Resserved for the root device
  * Block device mapping: Allow to view EBS volumes or instance volumes attached at launch
* Access
  * Public DNS Name: Name is auto-generated. Persist only while is running
  * Public IP: IP is auto-assigned. Persist only while is running
  * Elastic IP: Assigned and reserved by the user. Transferable to another instance. Only billed when not used.
  * Private IP
  * Elastic Network Interface
* Initial Access
  * Public Key Crytography: Key pair (public-private) for login information
  * Change initial password as a best practice
  * Linux
    * Default user is "ec2-user" for Amazon AMI's
    * public key ~/.ssh/authorized_keys
  * Windows
    * Random password for Administrator
    * Decrypted password can be used via RDP
* Security Groups
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
    * Bootstrapping
      * UserData
        * Provide code to run at launch to configure the instance (eg: Patches, Enroll to AD)
        * Not encrypted, avoid using passwords
        * http://169.254.169.254/latest/user-data
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
    * Standard Reserved: Capacity reservation for predictable workloads
      * Term commitment: Duration of the reservation (1 or 3 years)
      * Payment Option
        * All Upfront: Pay all the reservation
        * Partial Upfront: Pay a portion and the rest monthly
        * No Upfront: Pay monthly
        * Can change: Availability zone, EC2-VPC to EC2-Classic, Instance type in same family (Linux only), Security Groups (Only in a VPC)
        * After terminated can be sold in the AWS RI Marketplace
      * Stop/Restart instances start a new billing hour
    * Convertible Reserved
    * Scheduled Reserved
      * Use for automatically stop/start instances based on schedule
    * Spot
      * User set a Spot price willing to pay (Spot request)
      * Until: Customer action, Spot price goes above bid price or no capacity
      * Customer receive a notification and two minutes before terminating
      * Spot Blocks avoid terminating the instance from 1 to 6 hours
      * Use for analytics, financial modeling, big data, scientific, testing
      * If instance is terminated for AWS the running hour won't be charged
      * Spot Fleets
        * Collection of Spot Instances and optionally On-Demand
        * Strategies
          * capacityOptimized
          * diversified: distributed across all pools
          * lowestPrice: default
          * InstancePoolstoUseCount
    * Dedicated Host
      * Physical EC2 server
    * Savings Plans
      * Reserved Compute (EC2, Lambda, Fargate)
  * Tenacy
    * Shared tenacy: default, multiple customers in same host
    * Dedicated instances: runs in dedicated hardware
    * Dedicated host: Address license requirements
  * States
    * Pending
    * Running
    * Shutting-down
    * Terminated
    * Rebooting
    * Stopping (Not apply for instance-store)
    * Stopped (Not apply for instance-store)
* AMI
  * Amazon Machine Image
  * Define: OS, Patches, Applications
  * x86 Windows/Linux
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
    * EBS-Backed
      * Created from an snapshot
      * Recommended. Root disk is deleted by default on termination, but can persist if it's configured
    * Instance Store backed
      * Created from a template store in S3
      * Instances using this as root can't be stopped
* Commands
  * Instead of SSH/RDP “Run Command” can be used
  * aws ec3 describe-instances
  * revoke-security-group-egress, revoke-security-group-ingress


## Amazon EC2 Instance Storage

* Temporary block-level storage volumes EC2 for instances
* Called also Ephemeral Storage/Drives
* Data is lost when: drive fails, instance stops, instance terminates. Persist after instance reboot
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

## Amazon Elastic Block Store (Amazon EBS)

* Block storage volumes for EC2 instances
* Automatically replicated inside Availability Zone
* A volume can be attached to only one instance. One instance can have many volumes
* Can be changed in size, iops and type without detaching from instance
* RAID 0 increase bandwidth (throughput)
* IOPS transactions / Throughput big data
* Types
  * SSD
    * gp2 - General-Purpose SSD
      * Suitable for transactional, small blocks, Small/Medium databases, DEV/TEST environments, Boot
      * Size 1GB - 16TB
      * IOPS Baseline 100IOPS for sizes lower than 33GiB
      * IOPS 3 per GiB, up to 16k
      * Throughput 128MiB/s - 250MiB/s depending on the volume size
      * If size is smaller than 1TB can burst to 3k IOPS
      * Accumulate I/O credits where they are not used
      * Billed based on provisioning space
    * gp3 - General-Purpose SSD
      * Suitable for High Performance at low cost
      * Size 1GB - 16TB
      * IOPS 3k Predictable. Up to 16k IOPS for additional cost
      * Throughput 125MiB/s Predictable. Up to 1000MiB/s for additional cost
      * 4x faster than max throughput of gp2
    * io1/io2 - Provisioned IOPS SSD
      * Suitable for large databases workloads, IOPS intensive application
      * Size 4GB to 16TB
      * Types
        * io1: IOPS up to 64k (50 IOPS per GiB)
        * io2: IOPS up to 64k (500 IOPS per GiB)
      * Throughput 320MiB/s - 1000MiB/s
      * Can stripe multiple values together in RAID
      * Billed based on provisioning space and IOPS
      * Ratio IOPS/size = 50. A volume with 5k IOPS at least 100GB
  * HDD
    * st1 - Throughput-Optimized HDD
      * Suitable for frequently access, large blocks, big data, warehouses, ETL, Log processing, no boot
      * Up to 16TB
      * IOPS 500
      * Throughput 40MB/s per TB. Burst up to 250MB/s. Max500 MB/s per volume
    * sc1 - Cold HDD
      * Suitable for infrequently access, no boot
      * Size up to 16TB
      * IOPS 250
      * Throughput 12MB/s. Burst up to 80MB/s. Max 250 MB/s per volume
      * Lowest cost
* Amazon EBS-Optimized Instances
  * Apply to all types except Magnetic
  * Optimized I/O and dedicated capacity
  * Increase paid price per hour
* Snapshot
  * Use for Backup/Recovery
  * Incremental backups
  * Stored on S3. Pay for the storage used (low price)
  * Stored not in user buckets
  * Stored in a Region. To shared on a different region must be fist copy to the destination
  * Stored encrypted by default
  * Available options: Management Console, CLI, API, Schedule
  * Best practice is to initialize a volume created from a snapshot accessing all the blocks
  * Can be used to resize the volume
  * Data is available immediately
  * In RAID configuration avoid I/O in order to make an snapshot
* Recovering
  * If a instance fails, boot drive volume should be dettached an attached to a new instance
  * Unless "DeleteOnTermination" flag is enable
  * Data is available inmediately (Lazy, data will be restore after request)
  * Only latest snapshot is needed
* Encryption
  * If is needed, Amazon Key Management (KMS) can be used. AES-256
  * The server decrypts the volume
  * Minimal effect on latency
  * Copying an unencripted snapshot allows encryption
  * Root volumes can be encrypted upon creation
* Migrate to another AZ
  * Take a snapshot and create a new EBS in the target AZ
* EC2 Hibernation
  * Preserves in-memory RAM on EBS
  * Allows faster boot process
  * RAM must be less than 150GB
  * Max hibernation time is 60 days
  * Apply to families, C[3-5], M[3-5], R[3-5]
* Pricing
  * Provisioned storage
  * I/O request
  * Snapshot storage
* Status
  * Auto check every 5 minutes
  * OK, IMPAIRED, INSUFFICIENTE-DATA

## EFS: Elastic File System

* Use for Linux
* Network File storage
* Can be shared between several instances at the same time
* Allows Multi-AZ intances
* Scales Up/Down automatically
* Supports NFSv4 NFSv4.1
* Throughput 10 Gbps
* Performance modes
  * General-Purpose
  * Max I/O: Exceed 7k file operations/seconds/filesystem
* Credit system for burst workloads
* Storage Tiers
  * Standard
  * Infrequently accessed
* Pricing
  * Storage (GB/month)

## FSx

* FSx for Windows
  * Use for Windows
  * File Server
  * Run SMB (Windows Server Message Block)
  * Support AD users, security policies, Distributed File System (DFS)
  * Support Single-AZ or Multi-AZ with SDD/HDD storage
* FSx for Lustre
  * Optimized for compute-intense

## AWS Backup

* Supports EC2, EBS, EFS, FSx, Storage Gateway, RDS, DynamoDB
* Centralized way to handle backup across an Organization
* Automation backup / schedules
