## Amazon Virtual Private Cloud (VPC)

* Networking layer for EC2
* Up to 5 per Region
* Specify a CIDR from /16 (65k hosts) to /28 (16 hosts)
* Must specify CIDR and Region at creation
* CIDR can't be changed later
* Instance tenancy attribute will apply to all instances in the VPC
* At creation: default CIDR /16, default subnet in every AZ, default SG and NACL, default route table to IGW
* Wizard options: Single public, two private/public, two private/public and hardware VPN access
* Default VPC
  * Contains a public subnet in every Availability Zones in the Region
  * Subnet Netmask /20
  * Each EC2 has public and internet address
* Types of Networking
  * EC2-Classic: flat network shared among AWS customers (available to old AWS accounts)
  * EC2-VPC: AWS accounts have a default VPC in each Region (172.31.0.0/16)

* VPC
  * Contains: Subnets, Route tables, DHCP, security groups, ACLs, DNS Configuration
  * New VPC
    * 1 Main Route Tables, 1 Security Group, 1 Main Network ACL
  * Optional
    * Internet Gateways (IGWs), Elastic IP address (EIP), Elastic Network Interface (ENI)
    * Peering, Network Address Translation (NAT), Virtual Private Gateway (VPG)
    * Customer Gateways (CGWs), Virtual Private Networks (VPN)

* Subnet
  * Smallest /28 (16 hosts)
  * Up to 200 per VPC
  * 5 IP reserved by AWS: first 4 and last IP
  * Reside inside one Availability Zone
  * Split in multiple subnets for High Availability
  * Multiple subnets in one Availability Zone is allowed
  * Types: All have privates IP address
    * Public: directs traffic to IGW
    * Private: not directs traffic to IGW
    * VPN: directs traffic to VPG, and doesn't have a route to an IGW
  * Subnets can communicate with each other by default*

* Route Tables
  * Have a default route called local route which can't be modified
  * Every VPC has an implicit Router and default Route Table
  * VPC comes with a modifiable main Route Table, which can be customized
  * Each subnet must be associated with a Route Table

* Internet Gateways (IGW)
  * Only one is allowed for a VPC
  * Horizontally scaled, redundant, high available component
  * Performs NAT
  * Must be attached to the VPC, create a default route 0.0.0.0/0 to the IGW and configure ACLs and Security Groups
  * Provides internet access to EC2 with public ip

* DHCP
  * Provides IP and parameters such as domain name, domain name server, netbios-node-type
  * Automatically assigned to a VPC with two options
    * domain-name-servers: default AmazonProvidedDNS
    * domain-name: default domain name for region
  * Can be customized
    * domain-name-servers
    * domain-name (mycompany.com)
    * ntp-servers
    * netbios-name-servers
    * netbios-node-type: set it to 2

* Elastic IP Address (EIPs)
  * There's a pool of IP address by Region (an EIP can be pulled/released from the pool)
  * Must be allocated to the VPC and then assigned to an instance
  * Specific to a Region
  * One-to-One relationship with Network Interfaces
  * Can be move to another instance in a different VPC
  * Paid by allocation when not used
  * If the instance is stopped, remains associated with the instance
  * Can't be tagged
  * Up to 5 per Region

* Elastic Network Interface
  * Virtual NI to attach to an Instance
  * Available only in VPC
  * Associated with a subnet upon creation
  * Can have one Public IP and multiple private IPs
  * If multiples private IPs exists, one is the Primary
  * An ENI created independently of the instance can be attached to a replacement instances
  * Allow to create Dual-Home instances
  * Attach types
    * Hot = Running Instance
    * Warm = Stopped Instance
    * Cold = Launching Instance

* VPC Endpoints
  * Enable private connection from VPC to others AWS Services (Amazon S3)
  * Virtual devices
  * In order to use you must specify
    * Amazon VPC
    * Service: com.amazonaws.region.service
    * Policy
    * Route Tables
  * Types
    * Gateway Endpoints (Useful for S3 and DynamoDB)
    * Interface Enpoints (Useful for rest of the services)

* VPC Peering
  * Network connection between two VPCs in the same Region as if all instances were in the same network
  * Created with Request/Accept (one week before expires)
  * one-to-one relationships between two VPCs
  * Do not support transitive routing (VPC A --> VPC B --> VPC C)
  * The two VPCs can't have overlapping CIDR blocks
  * Do not support internet or corporate access through peering

* Security Groups
  * Stateful firewall on a instance level
  * Default: allow traffic between all resources in the security group, allow outbound traffic, deny all other traffic
  * 4 components: Traffic direction, port, protocol, destination/source address
  * Add rules to Incoming and another group of rules for Outgoing
  * Up to 500 per VPC
  * Up to 50 inbound rules and 50 outbound rules per security group
  * Only allow rules are possible
  * Instances can't talk to other instances in the same Security Group (except the default)

* Network Access Control Lists
  * Stateless firewall on a subnet level
  * Created by default
  * Can Allow/Deny traffic
  * Numbered list of rules evaluated in order (starting with the lowest)
  * Default allow all inbound/outbound traffic
  * If create a new all traffic is deny
  * One NACL can be associated with multiple Subnets
  * One Subnet can only be associated with One NACL

* SG vs NACL
  * SG: operates at instance level, ACL: operates at subnet level
  * SG: first level of defense, ACL: second level of defense
  * SG: allow rules only, ACL: allow/deny rules
  * SG: Stateful, ACL: Stateless
  * SG: All rules are evaluated before deciding, ACL: process rules in order

* Network Address Translation NAT (Instances and Gateways)
  * For most cases use NAT Gateways instead of NAT Instances. Availability, bandwidth and easy configuration effort reasons
  * Performs NAT/PAT
  * Allow access internet without an EIP
  * NAT Instances
    * Amazon Linux Machine
    * String name amzn-ami-vpc-nat
    * To use the following must be done
      * Create security group with outbound rules
      * Launch Amazon NAT AMI in a public subnet and associate it with security group
      * Disable Source/Destination check attribute of the NAT
      * Configure a Route Table with the private subnet to direct Internet-bound traffic to the NAT
      * Allocate an EIP and associated with the NAT
  * NAT Gateway
    * Provides internet access to EC2 with non-public ip 
    * Amazon managed resource
    * Redundant inside a AZ
    * To create an independent Availability Zone, create a NAT gateway in each and configure
    * Disable Source/Destination checks
    * Throughput 5Gbps/45Gpbs
    * Automatically assigned to a Public IP
    * To use the following must be done
      * Configure a Route Table with the private subnet to direct Internet-bound traffic to the NAT
      * Allocate an EIP and associated with the NAT

* Virtual Private Gateways (VPGs) / Customer Gateways (CGWs) / Virtual Private Networks (VPNs)
  * VPGs/CGWs allows connections of a corporate network to the VPC
  * VPGs is a concentrator of VPN in AWS side
    * Up to 5 per Region
  * CGWs physical/software on the customer side of the VPN
  * After VPG-CGW a VPN tunnel is created
  * If CGW support Border Gateway Protocol (BGP) configure VPN for dynamic routing
  * Amazon VPC supports multiple CGWs. CGW IP must be unique in the Region
  * VPN connection consists of 2 IPSEC tunnels for higher availability
  * The tunnel must be initiated from CGW
  * CGWs needs an static IP

* Subnet group
  * Collection of subnets
  * DB subnet group should have subnets in at least 2 AZ
  * Removing a subnet can cause unavailability
  * It's not allowed to change a subnet group when a DB instance is deployed

* VPC PrivateLink
  * Expose service VPC to multiple VPC's
  * Doesn't require VPC Peering, NAT GW, IGW, etc
  * Requires NLB on the service VPC and ENI on the customer VPC

* VPN CloudHub
  * hub-and-spoke model to connect multiple sites
  * Operates over internet

* AWS Direct Connect (DX)
  * Private connection to between AWS and on-premise
  * Up to 100 Gbps
  * Hybrid cloud architectures
  * Security and Compliance
  * Types
    * Dedicated Connection: Physical Ethernet connection through AWS
    * Hosted Connection: Phycal Ehernet connection through a Partner

* Transit Gateway
  * Connects multiple VPC, VPN Connector, Direct Connect using a central hub
  * hub-and-spoke model
  * Can connect multi AWS accounts using RAM (Resource Access Manager)
  * Support IP Multicast

* Notes
  * An "EBS-backed" instance uses an EBS volume as its root device
  * Can be stopped
  * ENI is detached for EC2-Classic
  * ENI remains attached for EC2-VPC
  * Encryption is not free
  * VPC Flow Logs allows to capture info aboyt IP traffic
