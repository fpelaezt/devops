# Migration


## AWS Snowball

* Services which accelerates transfering large data amounts using appliances (On-Premise Datacenter or AWS Region)
* Allows bypassing internet
* Types
  * Snowcone
    * 8TB, 4GB RAM, 2vCPU
    * Userful for IoT and restricted resource environment
  * Snowball
    * 48-81 TB
    * Varying amount CPU/RAM
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

## AWS Storage Gateway

* On-Premise appliance storage
* Stored encrypted by default
* Service to connect on-premise software with cloud storage
* Userful also for one-time migrations
* Appliance is available for download as a VM image to install on-premise
* Storage of VM is exposes as iSCSI that can be mounted by on-premise applications
* Types
  * File Gateway
    * Similar to an NFS
    * Deployed as a VM
    * Interface to S3
    * Keep local or caches files
    * Useful for customers short of local storage
  * Volume Gateway
    * Backup drives
    * iSCSI mount
    * Cached or stored mode
    * Create EBS snapshots
    * Useful for migrations or backups
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
  * Tape Gateway
    * Useful for backups
    * iSCI VTL
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

## AWS DataSync

* Agent-Based solution for migration on-premises storage
* Allows to migrate data (NFS/SMB) to AWS
* Use TSL to transfer data
* Destinations: S3, EFS, FSx
* Useful for one-time migration

## AWS Transfer Family

* Fakes an SFTP server for legacy systems
* Allows easily move data from S3 / NFS using SFTP

## AWS Migration Hub

* Gui for SMS / DMS
* SMS (Service Migration Service)
  * Userful for converting VM to AMI
* DMS (Database Migration Service)
  * Converts origin to target DB