class AddProgressToTasks < ActiveRecord::Migration[6.1]
  def change
    add_column :tasks, :progress, :integer, default: 0, null: false
  end
end
