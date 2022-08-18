## Domain Name System (DNS) and Amazon Route 53

* www.amazon.com
  * .com: Top-Level Domain (TLD)
  * amazon: Second-Level Domain (SLD)
* Route 53: Authoritative DNS
* Concepts
  * TLD
    * Top-Level Domain
    * ICANN give control to some organization for some TLDs
    * Domains are registered with InterNIC (a service of ICANN)
    * Domains are stored in a central database: WhoIS
  * Domain Names: Human friendly name. End with a root "." (not always used)
  * IP Addresses: IPv4/IPv6
  * Hosts: ftp.domain.com, api.domain.com
  * Subdomains: helps to divide a domain
  * Fully Qualified Domain Name (FQDN)
    * Host + subdomain + domain + TLD + root
  * Name Server: Authoritatives / Cache (delegate) = Resolving name server
  * Zone Files: Contain mapping between IP's and Names
  * TLD Registrars
    * Organization accredited by a generic gTLD and/or country code ccTLD
  * Root Server
    * 13 global name servers
    * Mirrored and replicated
* Zones Files
  * $ORIGEN = example.com = highest level of authority
  * $TTL = Time To Live
  * SOA Record = Mandatory Start of Authority
    * DNS servers, Administrator, Version of file, TTL
    * Number of seconds of secondary server: updates, retries of a failed zone, refresh/expire
  * A/AAA = IPv4/IPv6 mapping of a host
  * CNAME = Alias of an A/AAAA
  * MX = Mail Exchange
  * NS = Name Servers
  * PTR = Pointer. Reverse A record from IP to Name
  * SPF = Sender Policy Framework. Help to avoid spam specifying the servers allowed to send emails for a domain
  * TXT = Arbitrary information
  * SRV = Service. Define host and port for specific services

### AWS Route 53

* Functions
  * Domain registration: Support a wide variety (.com .org .be .us)
  * DNS service: UDP 53. Maximum length 512 bytes. If exceeds result is truncated and a TCP retry must be done
  * Health checking
  * Use Anycast: Allow reply queries based on location
* Hosted Zones
  * Private
    * Use for Amazon VPC
    * Support multiple VPCs and different AWS accounts
  * Public: Use for Internet
  * CNAMES is not allowed in the domain apex (naked)
  * Alias (A Record) similar to a CNAME but it's a pointer to
    * CloudFront Distribution, Beanstalk environment, static content S3, and other resources in the zone (like ELB)
    * Alias can be used to point to Apex for all previous options
    * Fixed TTL of 60 sec
  * Up to 500 hosted zones and 10k resources per hosted zone
  * Multiple zones per domain is allowed
  * There are no default TTL, one must be specified per record
  * Changes are propagated in 60 seconds
* Supported Records
  * A, AAAA, CNAME, MX, NS, PTR, SOA, SPF, SRV, TXT, Routing Policies
* Routing policies: Can be associated with health checks
  * Simple
    * Default
    * One record with multiple IP Addresses
    * Random order
  * Weighted
    * Allows load balancing (WRR) [0-255]
    * Higher weight has proirity
  * Latency-Based (LRB)
  * Failover
    * Useful for DR scenarios
    * Only for public hosted zones
  * Geolocation
    * By continent, By country or By states in US
    * Best practice is to configure a default or global record (GeoDNS)
  * GeoProximity
    * Traffic Flow is required (geo location, latency, availability)
    * Bias is a way to route more/less traffic for an area that expand/shrink
  * Multivalue Answer
    * Similar to Simple but allows to put health checks on each record
* Health Checking
  * Run periodically, result are published to all DNS servers
  * After 3 failed in a row a resource is marked as unavailable
  * After 3 success in a row a resource is marked as available
  * Default 3. Can be set from 1 to 10
  * 30 sec between health checks. Can be set to 10
  * Support HTTP, HTTPS, TCP
  * Enable String Matching allow checking web page content
  * S3 service is checked, not the specific bucket
  * Can use Cloud Watch metrics
  * Can use SNS notifications to alert about failed health checks
* Resiliency
  * Every AWS Region, with a Elastic Load Balancer with cross-zone and connection draining enabled
  * ELB health check requires "Evaluate Target Health"=true
  * Every instance is in auto-scaling group
  * Load Balancer perform health checks to the instances
  * Load Balancers are checked by an Amazon Route 53 health check
  * Alias to a production environment that point to the Load Balancers with latency-based routing policy
  * Alias to a FailOver environment pointing to an Amazon CloudFront of a Amazon S3 for a static version of the application
  * Amazon Route 53 has a Failover policy to production and failover environment
  * Application content can be served using Amazon CloudFront
  * Use multiple regions

* Commands
  * CreateHostedZone
  * ChangeResourceRecordSet
* Pricing
  * Hosted Zones, Queries, Health Checks, and Domain Names
  * Per policy record
* API Call Status
  * INSYNC: Change applied
  * PENDING: Change pending
* Other features
  * DNSSEC not supported, only at domain registration
  * IPv6 is supported
  * Intra-AWS-DNS-Queries are free
  * DNS response support up to 8 records
  * Traffic Flow
    * A policy to route traffic that is applied to a Policy record
    * Support geo-proximity
  * Alias can point to a DNS name managed by a traffic policy
