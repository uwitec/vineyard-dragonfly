class LoginsController < ApplicationController
	skip_before_filter :require_login, :only => [:new,:create]

	def new
		@user = User.new

		respond_to do |format|
			format.html # new.html.erb
		end
	end

	def create
		user = User.where({:username => params[:username],:password => params[:password]}).limit(1)
		respond_to do |format|
			if user != nil && user[0] != nil
				session[:current_user_id] = user.id
				format.html { redirect_to root_url }
			else
				@user = User.new({:username => params[:username],:password => params[:password]})
				flash[:error] = "Invalid username or password"
				format.html { render action: "new"}
			end
		end
	end

	def destroy
		@_current_user = session[:current_user_id] = nil
		flash[:notice] = "You have successfully logged out"
		redirect_to root_url
	end

end
