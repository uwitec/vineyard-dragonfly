class Image 
  include Mongoid::Document

	field :is_master, type: Boolean, default: false

	mount_uploader :upload, FileUploader
	attr_accessible :upload, :product_id, :is_master

	belongs_to :product
end
