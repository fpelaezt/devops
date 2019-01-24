# CHAPTER 10

## Amazon ElastiCache

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
* Redis
  * Data structure. Cache/Database/Message Broker
  * Allows persist in-memory data into disk
  * During a failure of the primary node, a read replica can assume the primary using Multi-AZ replication
  * Replication to read replicas is asynchronous
  * Features: Sort and Rank data
  * Data type: strings, lists, sets
  * Cluster: 1 node, but multiple cluster group by Redis Replication Group
  * 1 master, Up to 5 read replicas
  * Up to 15-shard
  * Up to 3.55TiB of in-memory data
  * Vertical Scalling: Start a new cluster from a backup
  * A backup in S3 can be created
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
