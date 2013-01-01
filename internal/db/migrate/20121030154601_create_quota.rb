class CreateQuota < ActiveRecord::Migration
  def change
    create_table :quota do |t|
	  t.integer :resource_id  
	  t.integer :city_id
	  t.integer :quantity
	  t.integer :lock_version

      t.timestamps
    end
  end
end
