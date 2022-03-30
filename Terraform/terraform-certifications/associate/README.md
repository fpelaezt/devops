# Terraform Associate Certification

## IAC

* IaC: Improve productivity, Avoid Human error, Consistency configuration

## Terraform

* Features
    * Execution plans
    * Resource graph
    * Change automation
    * Multiple cloud platforms, Human readable configuration, track resources changes
* Workflow: Write - Plan - Apply

### Providers

* Plugins to interact with cloud providers
* Use required_providers when the provider is not developed by hashicorp
* Versioning
  * File terraform.lock.hcl keeps track of provider versioning constraints
  * ~> 3.6: Greater than 3
  * <= 3.6: Less or equal than 3.6
  * > 3.2, < 3.6: Greater than 3.2 and Less than 3.6

### Resources

* resource definition
  * <provider>_<resource_type> <name> { key: value ] }

### Default files

* terraform.tfvars: Variables

### Outputs

* Printing outputs

  ```
    output "output_name" {
      value: resorce_type.resource_name.<optional attribute>
    }
  ```

### Concepts

* Variables
  * Types
    * strings: "abcd"
    * number: 1
    * list: ['a', 'b', 'c']
    * map: { a = 'A', b = 'B', c = 'C'}
  * Use
    * Use map: var.types['a']
    * Use list: var.list[1]

* Conditions
  * if
    ```
    count = var.flag == true ? 2 : 1
    ```

* Local Values
  * Example
    ```
    * locals {
        common_tags = {
          Owner = "Team 1",
          service = "engineer"
        }
      }
    ```

* Functions
  * Terraform only support built-in functions
  * count, zipmap, distinct, flatten, merge, lenght, formatdate

* Dynamic Blocks
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

* Provisioners
Allow to run commands in a VM (useful to install packages).
Can be run according to conditions (start/stop resource)
If the provisioner failed, the resource is marked as Tainted
  * on_failure: continue (avoid taint resources)

* Splat Expression
Works as a comodin
  * value. = aws_iam_user.res1[*].arn

### Commands

* terraform init
* terraform init -upgrade
* terraform plan
* terraform plan -var-file .env
* terraform plan -out=file
* terraform apply
* terraform apply --auto-approve
* terraform apply -var-file .env
* terraform apply -target <resource>
* terraform apply -var "key=value"
* terraform destroy
* terraform destroy --auto-approve
* terraform destroy -target <resource>
* terraform state list
* terraform state show <resource>
* terraform refresh
* terraform output
* terraform fmt
* terraform validate
* terraform taing <resource>
* terraform console