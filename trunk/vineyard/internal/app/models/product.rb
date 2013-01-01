class Product < ActiveRecord::Base
	has_and_belongs_to_many :resources

	attr_accessible :advert
	has_attached_file :advert,
		:url => "/system/:class/:attachment/:id/:style.:extension",
		:path => ":rails_root/public/system/:class/:attachment/:id/:style.extension"
end
