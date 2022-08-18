
## Lambda

* Serverless compute service to run code
* Required
  * Runtime
  * Permission, attach roles
  * Networking, optional define a VPC
  * Resources, CPU/RAM
  * Trigger
* Maximum execution time 15min
* Maximun 10G RAM

## ECS

* Amazon propietary container service
* Role integration
* ELB integration
* Uses EC2 instances
* Useful for long-running containers
* Can benefit from EC2 pricing models

## EKS

* Open-source container service
* Can be used on-premises
* AWS-managed version of Kubernetes

## Fargate

* Serverless container service
* Feature of ECS/EKS
* Pay per use
* Useful for short-running containers

## EventBridge

* Serverless event bus
* Allows pass events from a source to an endpoint
* Previously called CloudWatch Events
* Required
  * Define Pattern (event / sheduled)
  * Event Bus (AWS-based event / partner / etc)
  * Define Target (Trigger lambda / SQS)
  * Tag
* Useful for triggering functions with any API call