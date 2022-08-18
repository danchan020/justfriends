class Conversation < ApplicationRecord

    belongs_to :author, class_name: 'User'
    belongs_to :receiver, class_name: 'User'
    has_many :messages, -> { order(created_at: :asc) }, dependent: :destroy

    validates :author, uniqueness: {scope: :receiver}

    scope :participating, -> (user) do
        where("(conversations.author_id = ? OR conversations.receiver_id = ?)", user.id, user.id)
    end

    scope :between, -> (author_id, receiver_id) do
        where("(conversations.author_id = ? AND conversations.receiver_id = ?) 
        OR (conversations.receiver_id = ? AND conversations.author_id = ?)", author_id, receiver_id, receiver_id, author_id)
    end

end
