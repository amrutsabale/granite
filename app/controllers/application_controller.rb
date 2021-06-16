class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  include Pundit
  rescue_from Pundit::NotAuthorizedError, with: :handle_unauthorized_user
  protect_from_forgery with: :null_session

  def authenticate_user_using_x_auth_token
    user_email = request.headers["X-Auth-Email"]
    auth_token = request.headers["X-Auth-Token"].presence
    user = user_email && User.find_by_email(user_email)

    if user && auth_token &&
      ActiveSupport::SecurityUtils.secure_compare(
        user.authentication_token, auth_token
      )
      @current_user = user
    else
      render status: :unauthorized, json: {
        errors: [t('session.could_not_auth')]
      }
    end
  end

  private
    def current_user
      @current_user
    end

    def handle_unauthorized_user
      render json: { error: "Permission Denied" }, status: :forbidden
    end
end
