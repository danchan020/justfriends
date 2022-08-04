class MessagesController < ApplicationController
    before_action :find_conversation!

  def index
    @messages = @conversation.messages
    render json: @messages
  end

  def create
    @message = @conversation.messages.create(message_params)
    ConversationChannel.broadcast_to(@conversation , @message)
    render json: @message
  end

  private

  def message_params
    params.require(:message).permit(:body, :user_id)
  end

  def find_conversation!
    @conversation = Conversation.find_by(id: params[:conversation_id])
  end
end
