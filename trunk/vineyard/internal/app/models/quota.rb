class Quota
	include Mongoid::Document
	field :quantity, type: Integer
	field :created_at, type: DateTime, default: -> {DateTime.now}
	field :updated_at, type: DateTime, default: -> {DateTime.now}

	belongs_to :product 
	belongs_to :city 
end
