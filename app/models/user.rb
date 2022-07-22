class User < ApplicationRecord
    has_secure_password

    validates :email, :username, :first_name, :last_name, presence: true
    validates :email, :username, uniqueness: true
end
