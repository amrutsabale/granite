class SessionsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, only: [:destroy]

  def create
   user = User.find_by(email: login_params[:email].downcase)
   if user.present? && user.authenticate(login_params[:password])
     render status: :ok, json: { auth_token: user.authentication_token, userId: user.id,user_name: user.name }
   else
     render status: :unauthorized, json: {
       notice: t('session.incorrect_credentials')
     }
   end
  end
  
  def destroy
    @current_user = nil
  end

 private

   def login_params
     params.require(:login).permit(:email, :password)
   end
end