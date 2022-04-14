# Terraform Associate Certification

## IAC

* IaC: Improve productivity, Avoid Human error, Consistency configuration

## Features
* Execution plans
* Resource graph
* Change automation
* Multiple cloud platforms, Human readable configuration, track resources changes
* Workflow: Write - Plan - Apply

## Syntax

* Block: Container of objects. Block have a type and optional labels
* Identifier: Arguments names
* Expression: Arguments values

```
<BLOCK TYPE> "<BLOCK LABEL>" "<BLOCK LABEL>" {
  # Block body
  <IDENTIFIER> = <EXPRESSION> # Argument
}
```

* Block Types
  * resources
    * syntax: <provider>_<resource_type> <name>
    * meta-arguments
      * depends_on: handle hidden dependencies
      * count: handle multiple resource
      * for_each: handle multiple instances according to a map or set of strings
        * Example
          ```
          variable "ports" {
            type: list(number)
            default: [80, 443, 8080]
          }
          dynamic ingress {
            for_each = var.ports
            iterator = port
            content {
              from_port: port.value
            }
          }
          ```
      * provider: handle non-default provider config
      * lifecycle: [create_before_destroy, prevent_destroy, ignore_changes]
      * provisioner: handle extra actions
    * timeouts: Control timers
  * data
  * variables
    * Arguments
      * default: default value
      * type: value type
      * description: documentation
      * validation: validation rules
      * sensitive: limits Terraform UI output
      * nullable: defines if can be null
    * Precenden: Environment variables, terraform.tfvars, -var | -var-file
  * output
    * Arguments
      * value
      * description
      * sensitive
    * Example
        ```
        output "output_name" {
          value: resorce_type.resource_name.<optional attribute>
        }
        ```
  * local
    * Example
      ```
      locals {
        common_tags = {
          Owner = "Team 1",
          service = "engineer"
        }
      }
      ```
  * module
    * Collection of .tf files that can be referred from other .tf files
    * Sources
      * Local paths
      * Registry
      * Git
      * S3 Buckets
      * Example
        ```
        module "my-demo" {
          source: "github.com/exampe"
        }
        ```
  * providers
  * terraform

## Providers

* Plugins to interact with cloud providers
* Use required_providers when the provider is not developed by hashicorp
* Versioning
  * File terraform.lock.hcl keeps track of provider versioning constraints
  * ~> 3.6: Greater than 3
  * <= 3.6: Less or equal than 3.6
  * > 3.2, < 3.6: Greater than 3.2 and Less than 3.6

## Default files

* terraform.tfvars: Variables
* _override.tf | _override.tf.json: Overwrite specific portions of resources
* .terraform.lock.hcl: Track provider dependencies

## Concepts

### Variables

* Types
  * strings: "abcd"
  * number: 1
  * list: ['a', 'b', 'c']
  * map: { a = 'A', b = 'B', c = 'C'}
* Use
  * Use map: var.types['a']
  * Use list: var.list[1]

### Conditions

* if
  ```
  count = var.flag == true ? 2 : 1
  ```

### Functions

* Terraform only support built-in functions
* count, zipmap, distinct, flatten, merge, lenght, formatdate

### Provisioners

Allow to run commands in a VM (useful to install packages).
Can be run according to conditions (start/stop resource)
If the provisioner failed, the resource is marked as Tainted
* on_failure: continue (avoid taint resources)

## Import Resources

Allows to import resources already created in the cloud

## Remote State Management

* Options
  * Cloud Storage
  * Terraform cloud

## Workspaces

Allow to handle virtual environments having a set of variables

### Expressions

#### Splat Expression

Works as a comodin

* value. = aws_iam_user.res1[*].arn

## Commands

* terraform init
* terraform init -upgrade
* terraform plan
* terraform plan -var-file .env
* terraform plan -out=file
* terraform graph
* terraform apply
* terraform apply --auto-approve
* terraform apply -var-file .env
* terraform apply -target <_resource_>
* terraform apply -var "key=value"
* terraform destroy
* terraform destroy --auto-approve
* terraform destroy -target <_resource_>
* terraform state list
* terraform state show <_resource_>
* terraform refresh
* terraform output
* terraform fmt
* terraform validate
* terraform taint <_resource_>
* terraform console
* terraform import <_resource_>.<resource_name> <instance_id>
