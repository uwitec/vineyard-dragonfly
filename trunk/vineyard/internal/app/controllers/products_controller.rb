class ProductsController < ApplicationController
	# GET /products/new
	def new 
		@product = Product.new()
		logger.info @product

		respond_to do |format|
			format.html # new.html.erb
		end
	end

	# POST /products
	def create
		@product = Product.create(params[:product])

		respond_to do |format|
			format.json { render json: {:id => @product._id}}
		end
	end
	
	# GET /products
	def index
		@products = Product.all

		respond_to do |format|
			format.html #index.html.erb
		end
	end

	# GET /products/:id
	def show
		@product = Product.find(params[:id])
		
		respond_to do |format|
			format.html #show.html.erb
		end
	end

	# GET /products/:id/edit
	def edit
		@product = Product.find(params[:id])
		
		respond_to do |format|
			format.html #edit.html.erb
			format.json { render json: @product } #edit.html.erb
		end
	end

	# PUT /products/:id
	def update
		@product = Product.find(params[:id])
		@product.update_attributes(params[:product])

		respond_to do |format|
			format.html { render action: "show"}	
			format.json { render json: @product.id }
		end
	end

	# DELETE /products/:id
	def destroy
		@product = Product.find(params[:id])
		@product.images.each do |image|
			image.remove_upload! unless image == nil
			image.destroy unless image == nil
		end
		@product.destroy

		respond_to do |format|
			format.html { redirect_to products_url }
			format.json { render json: 0 }
		end
	end

	# POST /products/delete
	def delete
		ids = params[:ids]
		ids.split(',').each { |id|
			product = Product.find(id)
			product.images.each do |image|
				image.remove_upload! unless image == nil
				image.destroy unless image == nil
			end
			product.destroy
		}

		respond_to do |format|
			format.html { redirect_to products_path }
			format.json { render json: 0 }
		end 
	end

end
