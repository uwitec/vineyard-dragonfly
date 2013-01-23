class ImagesController < ApplicationController
	# GET /products/:id/images
	def index
		@product = Product.find(params[:product_id])

		respond_to do |format|
			format.html # index.html.erb
		end
	end
	
	# GET /products/:id/images/new
	#def new
	#	@product = Product.find(params[:product_id])

	#	respond_to do |format|
	#		format.html # new.html.erb
	#	end
	#end

	# POST /products/:id/images
	def create
		@image = Image.create
		count = Image.where({product_id: params[:product_id],is_master: true}).count
		@image.is_master = true unless count > 0
		@image.product_id = params[:product_id]
		@image.upload = params[:image][:upload]
		@image.save!

		respond_to do | format |
			format.json { render json: { :url => @image.upload.thumb.url, :id => @image.id, :product_id => @image.product_id } }
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
			format.json { render json: { :result => 0 }}
			format.html { redirect_to product_images_path}
		end
	end
end
