import boto3
import sys
 
def main(stack_name = 'MyFirstVPC',file_path = '../CloudFormation/VPC-NotNAT.yml'):
#def main(stack_name, file_path):
    print("Starting stack creation")
    # open the test file from the current diectory
    template = open(file_path).read()
    # create the boto3 cloudformation client
    cloudformation = boto3.client("cloudformation")
    stacks = cloudformation.describe_stacks(stack_name)
    print(stacks)
    # Validate if stack exists
    waiter = cloudformation.get_waiter('stack_exists')
    print(waiter)
    if 'StackExist' in str(waiter): 
        print("StackName '" + stack_name + "' already exist, aborting...")
    else:
        # create the new stack
        cloudformation.create_stack(StackName=stack_name,TemplateBody=template)
        # create the new waiter
        waiter = cloudformation.get_waiter('stack_create_complete')
        # wait until the stack state changes to "CREATE_COMPLETE"
        #    waiter.wait(StackName=stack_name)
        print("StackName '" + stack_name + "' was created sucessfully")

if __name__ == "__main__":
    #stack_name = sys.argv[1]
    #file_path = sys.argv[2]
    #main(stack_name, file_path)
    main()
