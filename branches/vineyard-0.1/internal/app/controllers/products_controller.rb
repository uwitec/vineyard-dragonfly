class ProductsController < ApplicationController
	# GET /products/new
	def new 
		product = Product.joins("join products_resources on products.id = products_resources.product_id").where('products_resources.resource_id' => params[:rid]).limit(1)
		logger.info product

		respond_to do |format|
			if product.length == 0  
				product = [Product.new]
			else 
				expiration = product[0].expiration.strftime("%m/%d/%Y") unless product[0].expiration == nil
			end
			format.json { render json: [product[0], expiration]}
		end
	end

	# POST /products
	def create
		product = Product.new
		product.price = params[:price].to_f
		expiration = DateTime.strptime(params[:expiration],"%m/%d/%Y").to_date
		product.expiration = expiration
		product.name = params[:name]
		product.save

		resource = Resource.find(params[:rid])
		product.resources<<resource

		respond_to do |format|
			format.json { render json: product.id, status: :created }
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
		product = Product.find(params[:id])
		
		respond_to do |format|
			format.json { render json: product } #edit.html.erb
		end
	end

	# PUT /products/:id
	def update
		product = Product.find(params[:id])

		respond_to do |format|
			product.name = params[:edit_name]
			product.price = params[:edit_price]
			expiration = DateTime.strptime(params[:edit_expiration],"%m/%d/%Y").to_date
			product.expiration = expiration
			product.save

			format.json { render json: product.id }
		end
	end

	# DELETE /products/:id
	def destroy
		@product = Product.find(params[:id])
		@product.resources.clear
		@product.advert.destroy
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
			product.resources.clear
			product.advert.destroy
			product.destroy
		}

		respond_to do |format|
			format.html { redirect_to products_path }
			fromat.json { render json: 0 }
		end 
	end

end
