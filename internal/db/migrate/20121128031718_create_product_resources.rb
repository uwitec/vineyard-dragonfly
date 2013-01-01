class CreateProductResources < ActiveRecord::Migration
	def change
		create_table :products_resources do |t|
			t.integer :product_id
			t.integer :resource_id
		end
	end
end
