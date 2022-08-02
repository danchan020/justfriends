class MessageSerializer < ActiveModel::Serializer
  attributes :id, :body, :user_id
  has_one :conversation
  has_one :user
end
