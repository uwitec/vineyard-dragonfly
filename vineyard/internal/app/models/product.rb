class Product 
	include Mongoid::Document

  field :title, type: String
  field :category,type: String
  field :sub_category,type: String
  field :orign_country,type: String
  field :orign_area,type: String
  field :vender,type: String
  #key :breed_ids, Array
  #man :breed, :in => :breed_ids
  field :reference_year,type: Integer
  field :alcoholic,type: Float
  field :capacity,type: Integer
  field :price,type: Float
	field :created_at, type: DateTime, default: -> {DateTime.now}
	field :updated_at, type: DateTime, default: -> {DateTime.now}
	field :enable, type: Boolean, default: true

  has_many :images do
		def master
			where(is_master: true).first
		end
		def slaver
			where(is_master: false)
		end
	end

end
