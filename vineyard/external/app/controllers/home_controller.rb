class HomeController < ApplicationController
	# GET /
	def index
		@l1_products = Product.all
		@l2_products = Product.all
	end
end
