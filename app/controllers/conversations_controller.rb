class ConversationsController < ApplicationController


    def index
        @conversations = Conversation.participating(@current_user).order('updated_at DESC')
        render json: @conversations
    end

    def create
        if Conversation.between(params[:author_id], params[:receiver_id]).present?
            @conversation = Conversation.between(params[:author_id], params[:receiver_id]).first
        else
            @conversation = Conversation.create!(conversation_params)
        end
        render json: @conversation, include: :receiver
    end


      
      private
      
    def conversation_params
        params.permit(:author_id, :receiver_id)
    end



end
