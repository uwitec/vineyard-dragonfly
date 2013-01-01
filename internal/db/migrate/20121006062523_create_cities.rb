class CreateCities < ActiveRecord::Migration
  def change
    create_table :cities do |t|
      t.string :name
	  t.boolean :available
	  t.integer :lock_version
	
      t.timestamps
    end
  end
end
