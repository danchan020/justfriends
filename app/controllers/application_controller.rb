class ApplicationController < ActionController::API
  include ActionController::Cookies


  before_action :authorize
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_resp
  rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found

  def authorize
    @current_user ||= User.find_by(id: session[:user_id])
    render json: { errors: ["Not authorized"]}, status: :unauthorized unless @current_user
  end

  private

  def render_unprocessable_entity_resp(exception)
     render json: {errors: exception.record.errors.full_messages}, status: :unprocessable_entity
  end

  def render_record_not_found(exception)
     render json: {error: "#{exception.model} not found"}, status: :not_found
  end

end
