class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
	  t.integer :resource_id 
      t.integer :lock_version
	  t.attachment :photo

      t.timestamps
    end
  end
end
