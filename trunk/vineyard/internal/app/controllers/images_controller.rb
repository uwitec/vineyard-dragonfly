class ImagesController < ApplicationController
	# GET /products/:id/images
	def index
		count = Image.where(product_id: params[:product_id]).count
		respond_to do |format|
			if count == 0 
				format.html {redirect_to action: 'new'}
			else
				@images = Image.where(product_id: params[:product_id])
				format.html # index.html.erb
			end
		end
	end
	
	# GET /products/:id/images/new
	def new
		@product = Product.find(params[:product_id])
		logger.info @product
		respond_to do |format|
			format.html # new.html.erb
		end
	end

	# POST /products/:id/images
	def create
		@image = Image.create
		@image.product_id = params[:product_id]
		@image.upload = params[:image][:upload]
		@image.save!

		respond_to do | format |
			format.json { render json: { :url => @image.upload.thumb.url, :id => @image.id} }
		end
	end

	# GET /products/:id/images/:id
	def show
		
		respond_to do |format|
			format.html # show.html.erb
		end
	end

	# DELETE /products/:id/images/id
	def destroy
		image = Image.find(params[:id])
		image.remove_upload! unless image == nil
		image.destroy unless image == nil

		respond_to do |format|
			format.json { render :json => 0 }
			format.html { redirect_to product_images_path}
		end
	end
end
