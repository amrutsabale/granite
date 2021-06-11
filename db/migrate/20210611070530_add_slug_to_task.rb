class AddSlugToTask < ActiveRecord::Migration[6.1]
  def change
    add_column :tasks, :slug, :string, null: false
    add_index :tasks, :slug, unique: true
  end
end
