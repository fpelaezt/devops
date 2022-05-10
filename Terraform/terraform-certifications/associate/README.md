# Terraform Associate Certification

## IAC

* IaC: Improve productivity, Avoid Human error, Consistency configuration

## Features

* Execution plans
* Resource graph
* Change automation
* Human readable configuration, track resources changes
* Supports HCL (Hashicorp Configuration Language) y JSON
* Cloud agnostic (different from CloudFormation or Azure Resource Manager)

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
      * depends_on: handle hidden dependencies (explicit dependency)
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
        * destroy: if fails will rerun on next apply
    * timeouts: Control timers
  * data
    * Allow data to be fetched or computed
    * Can have local source
    * By providers or custom
    * Can have information from another configuration
    * Filters inside data blocks are supported
    * Example
        ```
        data "terraform_remote_state" "remote_state" {
          backend   = "remote"
          config    = {
            organization = "whizlabs"
            workspaces {
              name  = "prod"
            }
          }
        }
        ```
  * variables
    * Arguments
      * default: default value
      * type: value type
      * description: documentation
      * validation: validation rules
      * sensitive: limits Terraform UI output
      * nullable: defines if can be null
    * Precedence: Environment variables, terraform.tfvars, *.auto.tfvars, -var | -var-file
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
    * Requirements
      * Public GitHub
      * Named terraform-<_PROVIDER>-<_NAME>
      * Short Description
      * Release Tag must be present using semantic version x.y.z
    * For Public modules version is not mandatory but recommended
    * Sources
      * Local paths
      * Terraform Registry
      * GitHub
      * Bitbucket
      * Generic Git, Mercurial Repositories
      * HTTP URLs
      * S3 Buckets
      * GCS Buckets
    * Private Module
      * source: "app.terraform.io/<_organization>/<_module_name>/<_provider>
    * Registry Module
      * source: "<_namespace>/<_module_name>/<_provider>
    * Arguments
      * source
      * version
    * Meta-Arguments
      * count
      * provider
      * for_each
      * depends_on
    * Supported HTTP extensions
      * zip, tar.bz2, tbz2, tar.gz, tgz, tar.xz, txz
    * Example
      ```
      module "my-demo" {
        source: "github.com/example"
      }
      module "my-demo" {
        source: "https://myendpoint.com/vpc-module.zip"
      }
      module "consul" {
        source = "hashicorp/consul/aws"
        version = "0.1.0"
      }
      module "vpc" {
        source = "app.terraform.io/example_corp/vpc/aws"
        version = "0.9.3"
      }
      module "vpc" {
        source = "git::https://example.com/vpc.git?ref=v1.2.0"
      }
      ```
    * Accesing Outputs: module.<_resource_type><_resource_name>
  * providers
    * Alias example
      ```
      provider "aws" {
        region = "us-east-1"
      }
      # Resources can reference this as `aws.west`
      provider "aws" {
        alias  = "west"
        region = "us-west-2"
      }
      ```
  * terraform
    * configuration/settings
    * required_version
    * Only constants are allowed
    * Example
      ```
      terraform {
          backend "local" {
          path = "relative/path/to/terraform.tfstate"
        }
      }
      ```

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
* Third-Party plugins must be donwloaded manually
* Plugins must be written in Go

## Default files/folders

* terraform.tfvars: Variables
* terraform.tstate: State
* _override.tf | _override.tf.json: Overwrite specific portions of resources
* .terraform.lock.hcl: Track provider dependencies
* .terraform/plugins/: store backends and plugins
* ~/.terraform.d/plugins/: manually user specific plugins
* .terraformrc: configures per-user settings for CLI behaviors, which apply across all Terraform working directories
* credentials.tfrc.json: stores API token for Terraform Cloud
* terraform.tfstate.d/: store workspace state files (JSON format)

## Concepts

### Variables

* Types
  * strings: "abcd" or number (converted to string)
  * number: 1
  * list: ['a', 'b', 'c']
  * list(string)
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

* Allows to import resources already created in the cloud
* Flow
  * Create config files
  * terraform import <_resource_>.<_resource_name> <_resource_id>
  * terraform plan
  * terraform apply

## Backends

* Types
  * Enhanced Backend
    * Local (lock supported using System API)
    * Terraform Cloud
  * Standard Backend
    * artifactory (lock NOT supported)
    * azurerm (lock supported using Blob Storage)
    * consul (lock supported)
    * cos - Tencent Cloud Object Storage (lock supported)
    * etcd -2 (lock NOT supported)
    * etcdv3 (lock supported)
    * gcs (lock supported)
    * http (lock supported optionally)
    * kubernetes (lock supported using secrets)
    * manta (lock supported)
    * oss - Alibaba Cloud OSS (lock supported)
    * pg (lock supported)
    * s3 (lock supported using DynamoDB)
    * swift - OpenStack (lock supported)
* Can be setup as "partial configuration"

## Remote State Management

* Options
  * Cloud Storage
  * Terraform cloud

## Workspaces

* Allow to handle virtual environments having a set of variables
* Can be attached to only one repository
* default workspace can't be deleted

## Expressions/Functions

* Terraform only support built-in functions
* min, max, count, zipmap, distinct, flatten, merge, lenght, formatdate
* echo 'split(",","foo,bar,baz")' | terraform console

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

### Split

* split(",","foo,bar,baz")
  toList(["foo", "bar", "baz"])


### Dynamic Blocks

```
variable "ports" {
  type        = list(number)
  description = "Ports"
  default     = [8080, 8088]
}

resource "aws_security_groups" "whizlabs" {
  name  = "whizlabs"
  description = "Ingress for whizlabs"
  vpc_id = aws_vpc.my_vpc_id
  dynamic "ingress" {
    for_each = var.ports
    content {
      from_port = ingress.value
      to_port = ingress.value
      protocol = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }
}

# Using Iterator
resource "aws_security_groups" "whizlabs" {
  name  = "whizlabs"
  description = "Ingress for whizlabs"
  vpc_id = aws_vpc.my_vpc_id
  dynamic "ingress" {
    iterator = port
    for_each = var.ports
    content {
      from_port = port.value
      to_port = port.value
      protocol = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }
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
    * Types
      * hard-mandatory
      * soft-mandatory
      * advisory
    * Advantages
      * Sandboxing
      * Codification
      * Version Control
      * Testing
      * Automation
* Supported VCS Providers
  * GitHub
  * GitLab
  * BitBucket
  * Azure DevOpss

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
* terraform init -plugin-dir=PATH
* terraform init -backend-config=PATH
* terraform init -backend=false
* terraform plan
* terraform plan -var-file .env
* terraform plan -out=file
* terraform plan --destroy -out=file
* terraform plan -refresh-only
* terraform plan -lock=false
* terraform graph | dot files
* terraform apply
* terraform apply --auto-approve
* terraform apply <_plan_name>
* terraform apply -var-file .env
* terraform apply -target <_resource_>
* terraform apply -var "key=value"
* terraform apply -parallelism=n | default 10
* terraform apply -destroy
* terraform state list | overview
* terraform state list <_resource>
* terraform state list -id=<_resource_id>
* terraform state show <_resource>
* terraform state rm
* terraform state mv [OPTIONS] <_source> <_destination>
* terraform state push <_local_state_file>
* terraform show | full attributes
* terraform show terraform.tfstate
* terraform refresh
* terraform output
* terraform output <_output_name>
* terraform output -state=terraform.tfstate
* terraform fmt
* terraform fmt -check
* terraform fmt -recursive
* terraform validate | syntax
* terraform taint <_resource_type>.<_resource_name>
* terraform apply -replace="<_resource_type>.<_resource_name>"
* terraform console
* terraform import <_resource_>.<_resource_name> <_resource_id>
* terraform workspace
* terraform workspace show
* terraform workspace new <_workspace_name>
* terraform workspace new -state=<_state_file> <_workspace_name>
* terraform workspace select <_workspace_name>
* terraform workspace delete <_workspace_name>
* terraform force-unlock [options] LOCK_ID [DIR]
* terraform providers
* terraform providers schema
* terraform login
* terraform logout
* terraform destroy
* terraform destroy -auto-approve
* terraform destroy -target=<_resource>
* TF_LOG=trace terraform apply --auto-approve &> log.log
