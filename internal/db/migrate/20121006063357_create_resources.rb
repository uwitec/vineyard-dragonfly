class CreateResources < ActiveRecord::Migration
  def change
    create_table :resources do |t|
      t.string :name
	  t.string :category
	  t.string :breed
	  t.string :orign_country
	  t.string :orign_area
	  t.string :reference_year
	  t.string :color
	  t.string :odour
	  t.float :alcoholic
	  t.integer :capacity
	  t.integer :score
	  t.integer :lock_version

      t.timestamps
    end
  end
end
