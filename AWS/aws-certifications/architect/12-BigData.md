## Amazon RedShift

* SQL Data warehouse for OLAP
* Based on PostgreSQL Relational DB
* Petabyte-scale data warehouse (Up to 16PB)
* Support Automated/Manual snapshots
* To $0.25 per hour to $1000 per TB per year
* Block size 1024KB for reducing I/O
* Only supports 1 AZ
* Cluster
  * Leader Node + (1 or more) Compute Nodes
  * Client interacts with Leader via JDBC/ODBC
  * Support six node types (compute/memory/storage)
    * Dense compute: Up to 326TB with SSD
    * Dense Storage: Up to 2PB
  * Each cluster contains 1 or more databases
  * User data for each table is distributed across the Compute Nodes
  * Disk Storage of Cumpute Nodes is divided into Slices (from 2 to 16)
  * Compute Nodes participate in parallel query execution
* Support resize (storage/compute). When resize is activated, a new cluster with a copy is created to migrate data. Meanwhile read-only is activated.
* Table Design
  * CREATE TABLE: Support compression encoding, distribution strategy and sort keys
  * Existing columns can't be modified
  * Compression Encoding: Automatically by AWS or set manually by column
  * Distribution Strategy
    * Huge impact: query performance, storage requirements, data loading, maintenance
    * Types
      * EVEN: Default. Uniform distribution across slices
      * KEY DISTRIBUTION: According to the values of column. Matching values are store together
      * ALL DISTRIBUTION: Full copy of entire table to every node. Use for large tables with fewer updates
  * Sort Keys
    * Compound: Use when query predicates a prefix
    * Interleaved: Equal weight to each column in the sort key
* Loadind Data
  * Standard INSERT/UPDATE or COPY for bulks
  * Faster way is to bulk load from an Amazon S3 bucket
  * Parallel load
  * After a large amount, a VACUUM to reorganize and ANALYZE to update statistics should be done
* Quering
  * For large clusters configure Workload Management (WLM) to queue an prioritize queries.
  * WLM defines Queues and Concurrency
* Redshift Spectrum
  * Allows read data from Glue without having a Redshift Database
* Use Enhanced VPC routing to avoid traffic goes to internet
* Supports Cross-Region snapshots

## Amazon Elastic MapReduce (EMR)

* Useful for ELT (Extract - Transform - Load)
* Based on EC2 instances
* Cluster initialization requieres
  * Instance Type
  * Number of nodes
  * Hadoop version
  * Application
    * Hadoop
    * HBase
    * Presto
    * Spark
* Apply Spot / Reserved Instances
* Cluster lives inside VPC
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

## Amazon Kinesis

* Load and analyze streaming data
* Stream in composed of one or more shards
* Up to 1000 PUT record per second per shard
* Up to 1MB size message
* Types
  * Amazon Kinesis Data Strems
    * Real-time streaming for ingesting data
    * Analyze real-time
    * Can use multiple shards
    * Use Kinesis Client Library (KCL) to build real-time dashboards, generates alerts, etc.
    * Store record for 24 hours by default, up to 168 (7 days)
    * A "Consumer" get data from kinesis streams
    * A number of shards needs to be specified
    * Auto-Scaling is not supported
  * Amazon Kinesis Firehose
    * Near real-time
    * It's much more simpler than Streams
    * AWS handle the scaling
    * Data transfer to S3/ElasticSearch/Redshift/Splunk
      * S3
      * Redshift (initially store and S3 and then COPY)
      * ElasticSearch (optional a backup to S3 is available)
      * Splunk
* Amazon Kinesis Analytics
  * Analyze using standard SQL
  * Fully managed real-time serverless
  * Allows data transformation

## Amazon Athena

* Interactive serverless query service for analyze S3 data using SQL

## Amazon Glue

* Serverless data integration to discover, prepare and combine data
* Allows serverless ETL workloads
* Alternative to EMR
* Structure S3 data (schema)
* Use Crawler to populate Data Catalogs with tables

## Amazon QuickSight

* AWS Tableu version
* BI data visualization

## ElasticSearch

* Fully managed Open-Source ElasticSearch
* ELK Stack