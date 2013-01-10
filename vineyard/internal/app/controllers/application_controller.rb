class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :require_login

  private
  def require_login
	  unless logged_in?
		  flash[:notice] = "You must be logged in to access this section"
		  redirect_to root_url # halts request cycle
	  end
  end
  
  def logged_in?
	  !!session[:admin_id]
  end

end
