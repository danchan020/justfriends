class User < ApplicationRecord
    has_secure_password

    validates :email, :username, :first_name, :last_name, presence: true
    validates :email, :username, uniqueness: true

    scope :all_except, ->(user) {where.not(id: user)}

end
