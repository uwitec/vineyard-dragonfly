class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
	  t.float :price
	  t.boolean :privilege
	  t.datetime :expiration
	  t.attachment :advert

      t.timestamps
    end
  end
end
