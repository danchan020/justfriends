class ConversationSerializer < ActiveModel::Serializer
  attributes :id, :author_id, :receiver_id
  has_many :messages
  belongs_to :author, class_name: 'User'
  belongs_to :receiver, class_name: 'User'
end
