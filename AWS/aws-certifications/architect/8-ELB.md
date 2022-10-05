## Elastic Load Balancing (ELB)

* Distributes traffic to EC2 instances for Internet or internal
* Across several Availability-Zones inside a Region (not cross Regions)
* Supports: HTTP, HTTPS, TCP, SSL
* TCP is used to terminate the SSL in the instance and not in the ELB
  * OSI Layers 4 y 7
* Entry point as a CNAME
* Components
* Controller service: monitors load balancer
* Load Balancer: monitors traffic
* Supports Health Checks, Certificates and SSL termination
* X-Forwarded-For: Allow store IP address of client
* Can automatically scale based on metrics
* Can integrate with AutoScale to scale Instances
* Models
  * Classic Load Balancer
    * Works at the transport/application layers (4/7)
    * Simple balancer between multiple instances
    * Useful for DEV/TEST
    * X-Forwarded-For: Header to see the original IP of the client
    * Gateway Timeout: respond with a 504 error when errors in the target
  * Application Load Balancer
    * Works at the application layer (7)
    * Userful for Routing, microservices, container-based, multiple port on same EC2 instance
    * Intelligent
    * Listener --> Rule(s) --> Target Group --> Rule Action
    * Each rule has priority, action(s), condition(s)
    * Every listener must have a default rule
    * Only supports HTTP/HTTPS
    * Supports Server Name Indication (SNI) - multiple TLS
    * Supports Dynamic Port Mapping
  * Network Load Balancer
    * Works at the transport layer (4)
    * Useful for high performance
    * Listener --> Target Group
    * Support any protocol/port
    * Supports Dynamic Port Mapping
  * Gateway Load Balancer
    * Balance third party virtual appliances
    * Virtual firewalls (forninet, cisco, paloalto, juniper)
    * IDS/IPS CheckPoint, Trend Micro
* Scheme
  * Internet-Facing LB
    * DNS name as an entry point
    * In a VPC supports only IPv4, In a EC2-Classic supports IPv4/IPv6
  * Internal LB
* HTTPS LB
  * Install a SSL certificate
  * Optional authentication to back-end servers
  * Do not support Server Name Indication (SNI)
  * To support multiple websites with a unique SSL add Subject Alternative Name (SAN) in each website name
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
* Connection Draining (Deregistration delay)
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
  * Statuses
    * InService: Healthy instances
    * OutService: Unhealthy instances
  * Can set Time Interval, Wait Timeout and Threshold consecutive health check failures
* Access Logs
  * Supports access logs to S3
* Monitoring
  * CloudWatch
    * HealthyHostCount / UnHealthyHostCount, RequestCount, TargetResponseTime, HTTP Status Codes
  * Access Logs
  * Request Tracing
  * CloudTrail Logs
* Errors
  * 5xx Server-Side Error
    * 504 Gateway Timeout: Backend didn't respond on-time
    * 502 Bad Gateway: Target host is unreachable (routing issue)
    * 503 Service Unavailable: Targets aren't registered
  * 4xx Client-Side Error
    * 400 Bad Request: Malformed request
    * 408 Request Timeout: Client didn't sent data bofore idle timeout
    * 464: Incoming request protocol incompatible
