
# Caching

## CloudFront

* Global CDN. Less latency
* Use DNS geo-location to determine edge location
* Support all content via HTTP/S, dynamic web pages, streaming HTTP/RTMP
* Accelerate delivery of static/dynamic content
* Up to 100k Request Per Second
* You can't pick specific countries, just general regions
* A WAF can be added
* Support AWS and on-premises origins
* Add HTTPS to static webhosting to S3
* Key Concepts
  * Distributions: DNS domain name (auto or user-friendly name)
  * Origin: DNS name of origin (eg:. S3 bucket, EC2 Instance, LB, URL, On-Premise apps)
  * Cache Control
  * Default expiration: 24 hours
  * Controlled by: Cache-Control headers or setting Minimum/Maximum/Default TTL
  * Objects can be removed using Invalidation API
  * Versioning can also be used as a best practice. Old version objects expire automatically
* Advance Features
  * Dynamic content
  * Multiple Origin
  * Cache Behaviors: Applied in order (help to serve dynamic content)
    * Path patterns (eg:. php, jpeg)
    * Which origin to forward requests
    * Whether to forward query strings
    * Whether accessing requires signed URL
    * Whether to require HTTPS
    * Amount of time of cache, regardless the value of Cache-Control headers
  * Whole Website
  * Private Content
    * Signed URL: Valid for certain times and from IP address
    * Signed Cookies: Require authentication via public/private key pairs
    * Origin Access Identifier (OAI): Restrict access to an S3 bucket to allow only CloudFront distribution
* Use Cases
  * Serve static content: images, CSS, JavaScript
  * Serve whole website: dynamic/static, multiple origin, cache behaviors, short TTL for dynamic content
  * Serve content to user widely distributed geographically
  * Distribute software or large files
  * Serve streaming media
* Not useful when
  * Request come from a single location
  * Request come from a VPN
* Pricing
  * Regional Data Transfer out (per GB)
  * Request (per 10k)
  * If the origin is an AWS storage, the data transfer is free
  * Regional Data Transfer Out of Origen (for external origins)
  * Optional commitment payment to get a significant discount

## ElastiCache

* Caching environment ready to use. Only need to change endpoint of applications
* Features: Read replicas, FailOver
* Stores high-taxing queries
* Patterns
  * Cache-Aside: Application first look in the Cache, then query the DB and writes results in Cache
* Memcached
  * In-memory key/value
  * Easy to grow and shrink the cluster
  * Allow partition into shard for parallelized operations
  * Data type: blob (binary large object) accessed by a unique key
  * Cluster: Up to 20 nodes
  * Vertical Scalling: Start a new empty cluster
  * Doesn't have a backup function
  * No failover or Multi-AZ
* Redis
  * Data structure. Cache/Database/Message Broker
  * Allows persist in-memory data into disk
  * During a failure of the primary node, a read replica can assume the primary using Multi-AZ replication
  * Replication to read replicas is asynchronous
  * Supports failover and Multi-AZ
  * Supports backups in S3
  * Features: Sort and Rank data
  * Data type: strings, lists, sets
  * Cluster: 1 node, but multiple cluster group by Redis Replication Group
  * 1 master, Up to 5 read replicas
  * Up to 15-shard
  * Up to 3.55TiB of in-memory data
  * Vertical Scalling: Start a new cluster from a backup
  * Best practice is to create the snapshot from a red replica to minimize performance impact
  * Snapshots can be created manually or automatically
  * A new cluster can be created from a snapshot or a RDB file
  * Use case: Leaderboard feature of mobile games
* Nodes/Clusters
  * Memcached: Cluster up to 20 nodes
  * Redis: Cluster is Always 1 node, but multiple cluster can be group using Redis Replication Group
  * It could be better to have smaller nodes than a single large node
  * Auto Discovery: client to allow the application communicate to every new node. Client available for .NET/Java/PHP
* Security
  * Access to cluster is restricted by inbound rules (security groups + ACLs)
  * IAM control access to manage the ElastiCache service
  * No root password
* Commands
  * CreateCacheCluster, ModifyCacheCluster, DeleteCacheCluster
  * CreateReplicationGroup, CreateSnapshots

## DAX

* DynamoDB Accelerator
* In-Memory Cache
* Fully managed in-memory cache
* 10x performance improvements
* Pay-per-request pricing
* Cache lives inside VPC

## Global Accelerator

* Network service in front of AWS services
* Deals with IP Caching
* Gives two ip addresses
* Traffic is routed through AWS infrastructure
* Supports Weighted pools
