class DeleteAllTasks < ActiveRecord::Migration[6.1]
  def change
    Task.delete_all
  end
end
