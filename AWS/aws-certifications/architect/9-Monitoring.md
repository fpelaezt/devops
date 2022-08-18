## Amazon CloudWatch

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
  * Log Event --> Log Stream (event collection) --> Log Group (stream collection)
  * CloudWatch Logs Insights: Allows query using SQL-like
  * Near Real-time. For Real-Time use Kinesis
* Maximum 5000 alarms per AWS account, and metric are retained for 2 weeks by default
* Commom Metrics
  * CPU Utilization: Default
  * Network Throughput: Default
  * Memory Utilization: Custom
  * EBS Storage Capacity: Custom
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