# CHAPTER 5

## Elastic Load Balancing, Amazon CloudWatch and AutoScaling

### Elastic Load Balancing (ELB)

* Distributes traffic to EC2 instances for Internet or internal
* Across several Availability-Zones inside a Region (not Regions)
* Supports: HTTP, HTTPS, TCP, SSL
* TCP is used to terminate the SSL in the instance and not in the ELB
  * OSI Layers 4 y 7
* Entry point as a CNAME
* Components:
* Controller service: monitors load balancer
* Load Balancer: monitors traffic
* Supports Health Checks, Certificates and SSL termination
* X-Forwarded-For: Allow store IP address of client
* Can automatically scale based on metrics
* Can integrate with AutoScale to scale Instances
* Models
* Classic Load Balancer
  * Simple balancer between multiple instances
* Application Load Balancer
  * Routing, microservices, container-based, multiple port on same EC2 instance
* Types
* Internet-Facing LB
  * DNS name as an entry point
  * In a VPC supports only IPv4, In a EC2-Classic supports IPv4/IPv6
* Internal LB
* HTTPS LB
  * Install a SSL certificate
  * Optional authentication to back-end servers
  * Do not support Server Name Indication (SNI)
  * To support multiple websites with a unique SSL add Subject Alternative Name (SAN) in each website name
* Listeners
* Process that checks requests
* Configure with a protocol/port for front-end and back-end
* Options
* Idle connection timeout
* For every request two connections are created, with clients and instances
* For the two connections there's an idle timeout of 60 sec
* A Keep-Alive in Kernel or webserver to reuse connections and reduce CPU utilization
* Keep-Alive should be greater than Idle Timeout
* Cross-Zone LB
  * Enable evenly distribute across different Availability-Zones
  * Avoid misconfigured clients with Cached DNS reach the same instances
* Connection Draining
  * Allow the LB to complete in flight request
  * Keep open existing connections to deregistering instances
  * Default 300 sec. Min 1, Max 3600
  * When maximum is reached, LB forcibly closes connections
* Proxy Protocol
  * If enable, 1 human-readable header with source/destination/ports is added to the request
* Sticky Sessions
  * Also called Session Affinity
  * Ensure binding of user's session to an specific instance
  * Creates a cookie named AWSELB that is used to map the session and helps to determine stickiness duration
* Health Checks
  * InService: Healthy instances
  * OutService: Unhealthy instances
  * Can set Time Interval, Wait Timeout and Threshold consecutive health check failures
* Access Logs
  * Supports access logs to S3

### Amazon CloudWatch

* Collect, Alarms and Change base on real-time metrics
* Display information in the CloudWatch console
* Automatically or PUT an specific application-metric
* There are different action: Send SNS notification, execute Auto-Scaling, etc
* Types
  * Basic monitoring: monitor 5-minute a limited pre-selected metrics for free (default)
  * Detailed monitoring: monitor 1-minute and allow data aggregation
  * High Resolution Custom Metric (minimum 1 second)
* Support most of the AWS services
* Metrics can be retrieved by a GET request
* Aggregate data across AZ inside a Region
* Can't aggregate metrics from different regions
* Supports an API to allow PUT of programs and scripts
* CloudWatch Logs
  * Monitor, store and access logs
  * CloudWatch Logs Agent can monitor Linux/Ubuntu/Windows
* Maximum 5000 alarms per AWS account, and metric are retained for 2 weeks by default
* Concepts
  * Namespaces: Container of metrics (AWS/EC2, AWS/IAM)
  * Metrics: Time-ordered set of data points (CPUUtilization)
    * Timestamps: Up 2 weeks in the past and 2 hours in the future
    * Dimensions: name/value pair uniquely identifies a metric. Up to 10 ("Name": "InstanceId", "Value": "i-1234567890abcdef0")
    * Statistics
    * Percentiles
    * Alarms
    * Metric Retention
      * Data points <1 min, 3  hours
       Data points   1 min, 15 days
       Data points   5 min, 63 days
       Data points   1 h,  455 days

### AutoScaling

* Scaling plans
  * Maintain Current Instances Levels
    * Check for unhealthy instances to launch a new one
    * Useful for steady workloads and a consistent number of instances is required
  * Manual Scaling
    * Set a Minimum and Maximum capacity
    * Useful for infrequent events
  * Schedule Scaling
    * Automatically scale as a function of date and time
    * Useful for predictable workload
  * Dynamic Scaling
    * Use a scaling policy. For example: Scale web tier when network bandwidth reach certain threshold

* Components
  * Launch Configuracion, Auto Scaling group and optional scaling policy, requires a Minimum size
  * Launch Configuration
    * Template: AMI, EC2 type, security group, key pair
    * AMI/Type required, the rest are optional
    * Unique per Auto Scaling Group
    * VPC uses security group ID, EC2-Classic uses security group or name
    * Default limit up to 100 per Region
    * Refer to On-Demand or Spot instances, but not both
    * Can't be modified. If needed, create a new one and replace it.
  * Auto Scaling Group
    * Collection of instances manage by Auto Scaling
    * Contain a Name and Minimum/Maximum instances. Optional desired capacity
  * Scaling Policy
    * Associate Amazon CloudWatch alarms
    * Supports fixed number, target, percent or step-by-step based on the size of threshold
    * Many policies can be associated to an Scaling group (CPU max scale in/CPU min scale out)
  * Best practice is to scale out quickly and scale in slowly
  * An instance in billed a full hour even if it was terminated before
  * Can be use to deploy a Patch in groups (useful in large deployments)
* Terminate instances in Impaired status
* Can't scale beyond limit (20 per default per Region)
* Fleet management performs automatic replacement of unhealthy instances
* AddToLoadBalancer suspends addition to ELB, instances should be added manually
* Cool-down period: Time after event before resuming AutoScaling activities
* Scale down instances from the most populated AZ
* Requisites to attach an instance
  * Running state
  * AMI used to launch the instance must still exist
  * Not a member of another Auto Scaling group
  * Same Availability Zone as the Auto Scaling group
