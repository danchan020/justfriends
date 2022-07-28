class ConversationSerializer < ActiveModel::Serializer
  attributes :id, :author_id, :receiver_id
end
