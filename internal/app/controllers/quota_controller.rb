class QuotaController < ApplicationController
	# GET /resources/:id/quota
	def index
		cities = getCitiesWithQuota(params[:resource_id].to_i)

		respond_to do |format|
			format.json { render :json => cities }
		end
	end

	# POST /resources/:id/quota
	def create
		params[:quota_cities_ids].each { |id| 
			if Quota.where({:resource_id => params[:resource_id].to_i,:city_id => id.to_i}).sum("id") == 0 
				Quota.create({'resource_id' => params[:resource_id], 'city_id' => id, 'quantity' => params[:quantity]})
			end
		}
		cities = getCitiesWithQuota(params[:resource_id].to_i)

		respond_to do |format|
			format.json { render :json => cities }
		end
	end

	# GET /resources/:id/quota/:id/edit
	def edit 
		quota = Quota.select("quota.*, cities.name").joins("join cities on cities.id = quota.city_id").where("quota.city_id" => params[:id])

		respond_to do |format|
			format.json { render :json => quota }
		end
	end

	# PUT /resources/:id/quota/:id
	def update
		quota = Quota.find(params[:id])
		attrs = {
			"quantity" => params[:edit_quantity],
			"privilege" => params[:edit_privilege]
		};
		respond_to do |format|
			if quota.update_attributes(attrs)
				cities = getCitiesWithQuota(params[:resource_id].to_i)
				format.json { render :json => cities }
			else
				format.json { render :json => 1 }
			end
		end
	end

	# DELETE /resources/:id/quota/:id
	def destroy
		quota = Quota.find(params[:id])
		if nil != quota
			quota.destroy
		end

		cities = getCitiesWithQuota(params[:resource_id].to_i)
		respond_to do |format|
			format.json { render :json => cities }
		end
	end

	#############################################
	#------- private method area
	#############################################
	# Get cities with they're quota information
	private
	def getCitiesWithQuota(resource_id)
		return City.select("cities.id,cities.name,quota.quantity").joins("left outer join quota on quota.city_id = cities.id and quota.resource_id = #{resource_id}").where({"cities.available" => true})
	end
end
