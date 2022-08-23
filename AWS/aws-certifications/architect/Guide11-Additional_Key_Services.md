

### Security

#### AWS CloudHSM

* Hardware appliances
* Use to store cryptographic key material
* Best practice is to use two HSM's in high availability
* Create/Control both symmetric and asymmetric keys (public/private)

### Analytics

#### AWS Data Pipeline

* Process and Move data between AWS compute, storage, on-premise at specified intervals
* Transfer to: Amazon S3, Amazon RDS, Amazon DynamoDB, Amazon EMR
* Pipeline schedule definition: run every 15 minutes, every day, every week, etc.
* Pipeline interacts with Data Nodes for read/write
* Pipeline executes activities
* If an activity need extra resource, Pipeline will launch and tear down automatically after completion
* Support precondition (evaluate if conditional statement before starting)
* If fail, retry is automatic after a configured limit. Actions can be taken
* Use cases
  * Batch mode ETL
  * Regular activity, contrary to Kinesis with es best suit for data streams

### DevOps

#### AWS OpsWorks

* Configuration Management service using CHEF
* Include: architecture, package installation, software configuration, storage, etc
* Support Linux/Windows
* Support cloud instances or on-premise servers
* Architecture = Stack. Divided by layers
* Chef recipes: tasks such installing packages, instances, deploy applications, running scripts
* Support lifecycle event to run automatic recipes at time
* Applications and Files are stored in a repository (GIT, Amazon S3, etc)
* Each applications is represented by an App: Application type + repository
* Components
  * Stacks
  * Layers
  * Chef recipes
  * Instances
  * Apps
* Use cases
  * Host Multi-Tier applications
  * Continuous integration


#### AWS Code Commit (GIT repository)

#### AWS Code Build (Compile, run tests and package)

#### AWS Code Deploy (automates code depoy on intances premise/cloud)

#### AWS CodePipeline (Cotinuous integration and delivery, build, test, deploy)

#### AWS X-Ray (Analyze and debug, help troubleshooting)
