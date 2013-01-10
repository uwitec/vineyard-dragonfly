class AdminController < ApplicationController
	USERS = { "henry" => "!0519@zandy#"}

	before_filter :authenticate

	skip_before_filter :require_login, :only => [:new]

	def new
		session[:admin_id] = "admin is logining"
		redirect_to root_url
	end

	def destroy
		session[:admin_id] = nil
		redirect_to root_url, :notice => "Admin has successfully logged out"
	end

	private 

	def authenticate
		authenticate_or_request_with_http_digest do |username|
			USERS[username]
		end
	end
end
