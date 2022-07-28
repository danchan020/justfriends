class User < ApplicationRecord
    has_secure_password

    has_many :authored_conversations, class_name: 'Conversation', foreign_key: 'author_id'
    has_many :received_conversations, class_name: 'Conversation', foreign_key: 'received_id'
    has_many :messages, dependent: :destroy

    validates :email, :username, :first_name, :last_name, presence: true
    validates :email, :username, uniqueness: true

    scope :all_except, ->(user) { where.not(id: user.id) }

end
