# Terraform Associate Certification

## IAC

* IaC: Improve productivity, Avoid Human error, Consistency configuration

## Features

* Execution plans
* Resource graph
* Change automation
* Multiple cloud platforms, Human readable configuration, track resources changes

## Syntax

* Block: Container of objects. Block have a type and optional labels
* Identifier: Arguments names
* Expression: Arguments values

```
<_BLOCK TYPE> "<_BLOCK LABEL>" "<_BLOCK LABEL>" {
  # Block body
  <_IDENTIFIER> = <_EXPRESSION> # Argument
}
```

* Block Types
  * resources
    * syntax: <_provider> <_resource_type> <_name>
    * meta-arguments
      * depends_on: handle hidden dependencies
      * count: handle multiple resources
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
    * Precedence: Environment variables, terraform.tfvars, -var | -var-file
  * output
    * Arguments
      * value
      * description
      * sensitive
    * Example
        ```
        output "output_name" {
          value: <_resorce_type>.<_resource_name>.<_optional attribute>
        }
        ```
  * local
    * Example
      ```
      locals {
        common_tags = {
          Owner = "Team 1"
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
          source: "github.com/example"
        }
        ```
  * providers
  * terraform
    * configuration/settings

## Workflow

* Init
  * Init directory, backends, child modules, plugin installaion
* Plan
  * Validate Sintax
* Apply
  * Creates a new plan and execute
  * Symbols
    * +: Add
    * -: Deleted
    * ~: Updated
* Destroy
  * Destroy resources

## Providers

* Plugins to interact with cloud providers
* Use required_providers when the provider is not developed by hashicorp
* Versioning
  * File terraform.lock.hcl keeps track of provider versioning constraints
  * ~> 3.6: Greater than 3.6 and lower than 4.0
  * <= 3.6: Less or equal than 3.6
  * > 3.2, < 3.6: Greater than 3.2 and Less than 3.6

## Default files/folders

* terraform.tfvars: Variables
* _override.tf | _override.tf.json: Overwrite specific portions of resources
* .terraform.lock.hcl: Track provider dependencies
* .terraform/plugins: store backends and plugins
* .terraformrc: configures per-user settings for CLI behaviors, which apply across all Terraform working directories
* credentials.tfrc.json: stores API token for Terraform Cloud

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

### Provisioners

Allow to run commands in a VM (useful to install packages)
Can be run according to conditions (start/stop resource)
If the provisioner failed, the resource is marked as Tainted
* on_failure: continue (avoid taint resources)

* Types
  * remote-exec: run scripts in the remote resource
    * requires a connection
      * SSH
      * winrm
  * local-exec: run scripts in the local resource
    * parameters
      * commmand*
      * working_dir
      * interpreter
      * environment: key-value object
  * file: copy files

## Import Resources

Allows to import resources already created in the cloud

## Backends

* Types
  * Enhanced Backend
    * Local
    * Terraform Cloud
  * Standard Backend
    * S3, Azurerm, manta, http, oss, pg, etcd, swift, kubernetes, consul, etc

## Remote State Management

* Options
  * Cloud Storage
  * Terraform cloud

## Workspaces

* Allow to handle virtual environments having a set of variables
* Can be attached to only one repository

## Expressions/Functions

* Terraform only support built-in functions
* min, max, count, zipmap, distinct, flatten, merge, lenght, formatdate

### Conditionals

* if
  ```
  count = var.flag == true ? 2 : 1
  ```

### Splat Expression

Works as a comodin

* value. = aws_iam_user.res1[*].arn

### Lookup

* lookup(map, key, default)

  ```
  lookup({a="ay", b="bee"}, "a", "what?")
  ay
  lookup({a="ay", b="bee"}, "c", "what?")
  what?
  ```

### Index

* index(list, value)

  ```
  index(["a", "b", "c"], "b")
  1
  ```

### Zipmap

* zipmap(keyslist, valueslist)

  ```
  zipmap(["a", "b"], [1, 2])
  {
    "a" = 1,
    "b" = 2,
  }
  ```

## Environment Variables

* TF_LOG
  * INFO, WARN, ERROR, DEBUG, TRACE
* TF_LOG_PATH
* TF_INPUT
* TF_VAR_name
* TF_DATA_DIR
* TF_WORKSPACE
* TF_CLI_CONFIG_FILE

## Terraform Cloud

* Use API Tokens instead of username/password
* Features
  * Git integration
  * Audit
  * Cost Estimation
  * Sentinel: enable policies
    * Sandboxing
    * Codification
    * Version Control
    * Testing
    * Automation

## Terraform Enterprise

* Features
  * SAML/SSO
  * Audit Logging
  * Servicenow integration
  * Cost Estimation
* Supported OS
  * Debian 9 - 10
  * Ubuntu 14.04.5 / 16.04 / 18.04 / 20.04
  * Red Hat Enterprise Linux 7.4 - 7.9 / 8.4
  * CentOS 7.4 - 7.9 / 8.4
  * Amazon Linux 2014.03 / 2014.09 / 2015.03 / 2015.09 / 2016.03 / 2016.09 / 2017.03 / 2017.09 / 2018.03 / 2.0
  * Oracle Linux 7.4 - 7.9 / 8.4

## Terraform Registry

* Community provider can be download automatically

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
* terraform apply -parallelism=n | default 10
* terraform state list
* terraform state list <_resource>
* terraform state list -id=<_resource_id>
* terraform state show <_resource>
* terraform state rm
* terraform state mv
* terraform refresh
* terraform output
* terraform fmt
* terraform validate
* terraform taint <_resource_type>.<_resource_name>
* terraform apply -replace=" <_resource_type>.<_resource_name>"
* terraform console
* terraform import <_resource_>.<_resource_name> <_resource_id>
* terraform workspace
* terraform workspace show
* terraform workspace new <_workspace_name>
* terraform workspace select <_workspace_name>
* terraform force-unlock [options] LOCK_ID [DIR]
* terraform providers
* terraform providers schema
* terraform login
* terraform logout
* terraform destroy
* terraform destroy --auto-approve
* terraform destroy -target <_resource>
