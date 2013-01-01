class CitiesController < ApplicationController
	# GET /cities/new
	def new
		@city = City.new

		respond_to do |format|
			format.html # new.html.erb
		end
	end

	# POST /cities
	def create
		@city = City.new(params[:city])

		respond_to do |format|
			count = City.where("name = :name", { :name => params[:city][:name]}).count
			if count > 0 
				flash[:notice] = "The city is already in developing!"
				format.html { render action: 'new' }
			else 
				if @city.save
					format.html { redirect_to cities_url }
				else 
					format.html { render action: 'new' }
				end
			end
		end	
	end
	
	# GET /cities
	def index
		@cities = City.all

		respond_to do |format|
			format.html # index.html.erb
		end
	end

	# DELETE /cities/:id
	def destroy
		@city = City.find(params[:id])
		@city.destroy

		respond_to do |format|
			format.html { redirect_to cities_url }
		end
	end

	# GET /cities/:id/edit
	def edit 
		@city = City.find(params[:id])

		respond_to do |format|
			format.html #edit.html.erb
		end
	end

	# POST /cities/:id
	def update
		@city = City.find(params[:id])

		respond_to do |format|
			if @city.update_attributes(params[:city])
				format.html { redirect_to @city, notice:'successful updated.' }
			else
				format.html { render action: 'edit' }
			end
		end
	end

	# GET /cities/:id
	def show
		@city = City.find(params[:id])

		respond_to do |format|
			format.html #show.html.erb
		end
	end

	# GET /cities/:id/report
	def report 
		respond_to do |format|
			format.html #report.html.erb
		end
	end
	
	# GET /cities/:id/open
	def open
		city = City.find(params[:id])
		city.available = true 
		city.save

		respond_to do |format|
			format.html { redirect_to cities_url }
		end
	end

	# POST /cities/batchopen
	def batchopen
		ids = params[:open_ids]
		ids.split(',').each { |id|
			city = City.find(id)
			city.available = true 
			city.save
		}

		respond_to do |format|
			format.html { redirect_to cities_path }
		end
	end

	# GET /cities/:id/close
	def close
		city = City.find(params[:id])
		city.available = false 
		city.save

		respond_to do |format|
			format.html { redirect_to cities_url }
		end
	end

	# POST /cities/batchclose
	def batchclose
		ids = params[:close_ids]
		ids.split(',').each { |id|
			city = City.find(id)
			city.available = false ;
			city.save
		}

		respond_to do |format|
			format.html { redirect_to cities_url }
		end
	end

	# POST /cities/delete
	def delete
		ids = params[:ids]
		ids.split(',').each { |id|
			city = City.find(id)
			city.destroy
		}

		respond_to do |format|
			format.html { redirect_to cities_url }
		end
	end
end
