class Quota < ActiveRecord::Base
	belongs_to :resource ;
	belongs_to :cities ;
end
