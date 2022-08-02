class MessageSerializer < ActiveModel::Serializer
  attributes :id, :body, :user_id
  # , :created_at
  has_one :conversation
  has_one :user
end
