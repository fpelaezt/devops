## AWS Identity and Access Management (IAM)

* Uses users, groups and access control list to control permissions
* Available: Console, CLI, SDK, IAM Query/HTTPS API
* It's not an authorization system for your applications
* For Application you can use AWS Directory Service, For Mobile Application you can use Amazon Cognito
* AWS Partner Network provides several tools to manage IAM
* Types of permissions
 * Identity-Based
 * Resource-Based

* Principals
  * An entity allowed to interact with AWS resources
  * Types
    * Root User
      * Default user, Full Access. Don't use on a regular basics, even for administrative tasks
    * IAM Users
      * Individual, system or application. Persist with no expiration
    * Roles/Temporary Security Tokens
      * Actor with specific privileges for a fixed duration of time
      * Can be authenticated by AWS or External System
      * Provide temporary Token from AWS Security Token Service (STS) API (AssumeRole, AssumeRoleWithWebIdentity, AssumeRoleWithSAML)
      * SAML is used for Single Sign-On
      * Range from 15min - 36hours. Default 12 hours
  * Up to 500 by default
  * Use for
    * Amazon EC2 Roles
      * Permission to applications running on a EC2 instance
      * When the application use the API of the requested resource, automatically ask for a Token
      * Avoids storing the credential in a configuration file
    * Cross-Account Access
      * Permission to another AWS account
    * Federation
      * Permission to users authenticated by a trusted external system (Identity Providers IdP)
    * Temporary token is provided for a console session based on the user's identity in and external IdP
      * Supports web (Facebook/Google) via OpenID Connect (OIDC)
      * Supports internal (Active Directory/LDAP) via Security Assertion Markup Language 2.0 (SAML) - AssumeRoleWithSAML

* Authentication
  * Password/Access Key are not created by default
  * Types
    * User Name/Password: A policy can enforce password complexity/expiration
    * Access Key
      * Combination of Access Key ID (string 20) + Access Secret Key (string 40)
      * Use mainly for programs like CLI and Windows Power Shell
    * Multi-Factor Authentication devices (It's not a security Token*)
      * Access Key/Session Token

* Authorization
  * Policies
    * Use case: tags to differentiate resources
    * JSON document (Definition of a permission)
      * Effect: Allow|Deny
      * Service: AWS Cloud Service
      * Resource: Specific AWS Infrastructure in Amazon Resource Name (ARN)
        * Example ARN: "arn:aws:service:region:account-id:(resourcetype:)resource"
        * For some service, like S3, wildcards are allowed
      * Action: Set of actions (eg: Read*)
      * Condition
        * Optional
        * Use for: Specify IP, Time Interval
  * Association Policies vs Principals
    * Users
      * User Policy: Exists only to the specific user
      * Managed Policies: Can be associated with many users/groups
        * Best practice: Use the predefined Managed Policies
    * Groups
      * Group Policy: Exists only to the specific group
      * Managed Policies: same way to the user
    * Best practice
      * Create IAM group "IAM Administrator"
      * Assign Manage Policy "IAMFullAccess"
      * Creat IAM user "Administrator"
      * Add user to the group and use IAM user for administration
    * Role
      * An authenticated IAM user or person/process by service outside of AWS
      * After the Role is assumed, it will use a temporary security Token

* Other features
  * Multi-Factor Authentication (MFA)
    * Extra security layer with One-Time Password (OTP). Device or Smart App
    * Something you "know" / Something you "have"
    * Best practice: Use MFA for root user
  * Rotating Keys
    * To facilitate IAM allow two active access keys at a time
    * Disable old access key and only after verifying Delete
    * Best practice: Rotate Keys on a regular schedule
  * Resolving Multiple Permission
    * Request is deny by default
    * If there's a Deny, request is denied and evaluation stops
    * If no Deny and Allow is found, the request is allowed
    * If no Deny/Allow are found, the request is denied
    * Exception if AssumeRole calls role and policy (policy can't override a default in the role)
  * Policy Simulator
    * Allows understand, test and validate policies
  * Power Users Access (Similar to admin users but cannot modify others users)
