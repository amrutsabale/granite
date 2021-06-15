class AddCreatorIdToTask < ActiveRecord::Migration[6.1]
  def change
    add_column :tasks, :creator_id, :integer
  end
end
