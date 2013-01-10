class Image 
  include Mongoid::Document

	mount_uploader :upload, FileUploader

	attr_accessible :upload, :product_id

	belongs_to :product
end
