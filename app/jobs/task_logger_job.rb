class TaskLoggerJob < ApplicationJob
  sidekiq_options queue: :default, retry: 3 # this option is only available with sidekiq versions >=6.0.1
  queue_as :default
  
  def perform(task)
    puts "Created a task with following attributes :: #{task.attributes}"
  end
end