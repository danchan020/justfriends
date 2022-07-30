class ConversationSerializer < ActiveModel::Serializer
  attributes :id, :author_id, :receiver_id
  has_many :messages
end
