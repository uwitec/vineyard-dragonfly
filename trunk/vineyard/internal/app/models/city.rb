class City
	include Mongoid::Document
	field :name, type: String
	field	:enable, type: Boolean, default: true
	field :created_at, type: DateTime, default: -> {DateTime.now}
	field :updated_at, type: DateTime, default: -> {DateTime.now}
end
