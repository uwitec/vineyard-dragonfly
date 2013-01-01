class ImagesController < ApplicationController
	# GET /resources/:id/images
	def index
		respond_to do |format|
			format.json { render :json => 0}
		end
	end

	# POST /resources/:id/images
	def create
		image = Image.new({"photo" => params[:photo]})
		image.resource_id = params[:resource_id].to_i
		image.save
		logger.info image

		respond_to do | format |
			format.json { render :json => image }
		end
	end

	# DELETE /resources/:id/images/id
	def destroy
		image = Image.find(params[:id])
		image.photo.destroy
		image.destroy

		respond_to do |format|
			format.json{ render :json => 0 }
		end
	end
end
