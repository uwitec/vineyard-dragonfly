class Resource < ActiveRecord::Base
	validates :name, :presence => true
	validates :category, :presence => true
	validates :breed, :presence => true
	validates :orign_country, :presence => true
	validates :alcoholic, :presence => true, :numericality => true
	validates :capacity, :presence => true, :numericality => true

	has_many :images
	has_many :quota

	has_and_belongs_to_many :products, :uniq => true 
end
