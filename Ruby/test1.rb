env_name = ENV['CI_ENVIRONMENT_NAME'] || ARGV[0] || raise('Missing env variable CI_ENVIRONMENT_NAME or from argument command line')
author = ENV['GITLAB_USER_NAME'] || `git config user.name`.strip
commit = ENV['CI_COMMIT_SHORT_SHA'] || `git rev-parse HEAD`.strip
branch = ENV['CI_COMMIT_BRANCH'] || `git rev-parse --abbrev-ref HEAD`.strip
if ENV['CI_MERGE_REQUEST_TARGET_BRANCH_NAME']
  log_message = `git log --pretty=format:"%an: %s" "$CI_MERGE_REQUEST_TARGET_BRANCH_NAME"..`.strip
  merge = true
else
  puts 'here'
  merge = true
  log_message = ENV['CI_COMMIT_MESSAGE'] || `git show -s --pretty=format:%B HEAD`.strip
end

message = "#{author} is deploying #{commit} on #{branch} to #{env_name}\n"
message += "Log Messsage: '#{log_message}'\n"
message += "Pipeline: #{ENV['CI_PROJECT_URL']}/pipelines/#{ENV['CI_PIPELINE_ID']}\n"

if (merge)
    message += 'Its a merge'
else
    message += 'Not a merge'
end
puts message