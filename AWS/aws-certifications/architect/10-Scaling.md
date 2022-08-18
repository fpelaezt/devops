## AutoScaling

* Scaling types
  * Vertical: Scale-In
  * Horizontal: Scale-Out
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
* Config
  * Launch Template
    * Recommended
    * Useful not only for AutoScaling
    * Supports versioning
    * Includes for EC2: AMI, Instance Type, Key Pair, SG, Storage, Tags, UserData
  * Launch Configuration
    * Old method, don't use
    * Useful only for AutoScaling
    * Inmutable
    * Includes for EC2: AMI, Instance type, SG, key pair
    * AMI/Type required, the rest are optional
    * Unique per Auto Scaling Group
    * VPC uses security group ID, EC2-Classic uses security group or name
    * Default limit up to 100 per Region
    * Refer to On-Demand or Spot instances, but not both
* AS Steps
  * Template --> Networking/Cost --> ELB Config --> Policies --> Notification
* Auto Scaling Group
  * Collection of instances manage by Auto Scaling
  * Contain a Name and Minimum/Maximum instances. Optional desired capacity (right now)
* Scaling Policy
    * Associate Amazon CloudWatch alarms
    * Supports fixed number, target, percent or step-by-step based on the size of threshold
    * Many policies can be associated to an Scaling group (CPU max scale in/CPU min scale out)
  * Best practice is to scale out quickly and scale in slowly
  * An instance in billed a full hour even if it was terminated before
  * Can be use to deploy a Patch in groups (useful in large deployments)
* Notes
  * Warm-Up
    * Period for scaling Out: Aggressively
  * Cool-Down
    * Period for scaling In: Conservatively
  * Types
    * Reactive: Real-Time metrics
    * Schedule: Predictable
    * Predictive: Machine Learning
  * Steady State
    * Desired, Minimum, Maximum same value
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
* RDS Scaling
  * Scaling Vertical
  * Scaling Storage
  * Read Replicas
  * Aurora Serverless
* DynamoDB
