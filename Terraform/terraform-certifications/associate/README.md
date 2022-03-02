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

### Commands

* terraform init
* terraform init -upgrade
* terraform plan
* terraform plan -var-file .env
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
