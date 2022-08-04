class UsersController < ApplicationController
    
skip_before_action :authorize, only: [:create, :index, :destroy]

   def create
      user = User.create!(user_params)
      session[:user_id] = user.id
      render json: user, status: :created
   end

   def show
      render json: @current_user
   end

   def profile
      @user = User.find(params[:id])
      render json: @user
   end

   def other_users
         @users = User.all_except(@current_user)
         render json: @users
   end

   def update
      @current_user.update!(user_params)
      render json: @current_user, status: :accepted
   end

   def destroy
      user = User.find(params[:id])
      user.destroy
      head :no_content
   end
   
private

   def user_params
      params.permit(:id, :first_name, :last_name, :email, :username, :password, :password_confirmation, :avatar, :bio)
   end

end

