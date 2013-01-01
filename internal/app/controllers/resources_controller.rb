class ResourcesController < ApplicationController
	# GET /resources/new
	def new
		@resource = Resource.new

		respond_to do |format|
			format.html # new.html.erb
		end
	end
    # POST /resources
	def create
		@resource = Resource.new(params[:resource])
		
		respond_to do |format|
			if @resource.save
				format.html { redirect_to resources_url }
			else
				format.html { render action: 'new' }
			end
		end
	end
	# GET /resources/:id/edit
	def edit
		@resource = Resource.find(params[:id])
		@images = @resource.images
		@pids = @resource.product_ids

		respond_to do |format|
			format.html # edit.html.erb
		end
	end

	# POST /resources/:id
	def update
		@resource = Resource.find(params[:id])
		@pids = @resource.product_ids
		respond_to do |format|
			if @resource.update_attributes(params[:resource])
				if @pids != nil and @pids.size == 0 and params[:release_as_product].to_i == 1
					product = @resource.products.create
					product.price = params[:product_price].to_f
					logger.info DateTime
					expiration_date = DateTime.strptime(params[:experation_datepicker],"%m/%d/%Y").to_date
					product.expiration_date = expiration_date
					product.name = @resource.name
					product.description = @resource.description
					product.save
					@pids = @resource.product_ids
				end
				format.html { render action: 'edit' }
				format.json { render json: [@resource,@pids], status: :created, location: @resource }
			else 
				format.html { render action: 'edit' }
				format.json { render json: @post.errors, status: :unprocessable_entity }
			end
		end
	end
	
	# GET /resources
	def index
		@resources = Resource.all

		respond_to do |format|
			format.html #index.html.erb
		end
	end

	# GET /resource/:id
	def show
		@resource = Resource.find(params[:id])

		respond_to do |format|
			format.html #show.html.erb
		end
	end

	# DELETE /resources/:id
	def destroy 
		@resource = Resource.find(params[:id])
		@resource.quota.each { |quota|
			quota.destroy
		}
		@resource.images.each { |image|
			image.destroy
		}
		@resource.products.each { |product|
			product.destroy
		}
		@resource.destroy

		respond_to do |format|
			format.html {redirect_to resources_path }
		end
	end

	# POST /resources/delete
	def delete
		ids = params[:ids]
		ids.split(",").each { |id| 
			resource = Resource.find(id)
			resource.quota.each { |quota|
				quota.destroy
			}
			resource.images.each { |image|
				image.destroy
			}
			resource.products.each { |product|
				product.destroy
			}
			resource.destroy
		}
		respond_to do |format|
			format.html { redirect_to resources_path }
		end
	end

end
