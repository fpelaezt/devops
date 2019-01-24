# CHAPTER 14

## Architecture Best Practices

### Principles

* Design for failure and nothing will fail
* Implement elasticity
* Leverage different storage options
* Build security in every layer
* Think parallel
* Loose coupling sets you free
* Don't fear constraints

#### Design for failure and nothing will fail

* Types of redundancy
  * StandBy, recovery of functionality by secondary resource using a Failover process
    * Often used for stateful components: Relational Database
  * Active Redundancy
* Use Multi-AZ
* Types of Disaster Recovery
  * Backup and Restore
  * Pilot Light
  * Warm StandBy
  * Multi-Site

#### Implement Elasticity

* Scaling Vertically: Increase performance in one specific resource (more CPU, RAM, etc)
* Scaling Horizontally
  * Stateless applications
    * Don't need session data
    * Auto-Scaling
    * Become stateless
      * Use Cookies in the browser: Can be untrusted / modified, Use minimum to avoid latency
      * Store session in a database like DynamoDB
  * Stateful Components
    * By definition DB are stateful
    * Realtime multiplayer games with very low latency
* Deployment automation
  * Use API commands
  * Use Bootstrap (code, scripts, configuration)
    * Automate, reduce human errors, self-healing

#### Leverage different storage options

* S3: large-scale and performance or high durability to backup and archive
* Glacier: archiving long-term backup
* CloudFront: CDN to deliver entire global website with dynamic-static content
* DynamoDB: NoSQL DB flexible data model and reliable performance
* EBS: Block storage for mission-critical applications like Oracle, SAP, Microsoft Exchange
* RDS: Available, scalable MySQL DB
* RedShift: Petabyte-scale, fast to support Binary
* ElastiCache: Redis storage to support session information
* Elastic File System: Common FS to share between more than one instance

#### Build Security in Every Layer

* Best practice: Inventory data, prioritize, apply appropriate level of encryption
* Defense in depth
* Offload security responsability to AWS
* Reduce Privileges Access
* Security as Code: CloudFormation script
* Real-time auditing: AWS Config Rule, Amazon Inspector, AWS Trusted Advisor, CloudWatch, CloudTrail

#### Think Parallel

* Multithreading
* Nodes behind a Load Balancer or processing parallel in Hadoop nodes

#### Loose coupling sets you free

* Independent components
* Interconnect via technology-agnostic like RESTful
* API Gateway: Service to deploy/manage API calls over HTTPs
* Integrate using queues or streaming
* Tight coupled is connecting directly the components (direct knowledge of the other)
* Using services discovering to avoid services know the topology

#### Don't fear constraints

* Don't fear with RAM/CPU/IOPS constraints, try to achieve your goal with other methods
* Use managed services, not only Amazon EC2

### Design Principles

* Scalability: Support growth
* Disposable resources instead of Fixed Servers
