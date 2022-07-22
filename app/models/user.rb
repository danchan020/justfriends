class User < ApplicationRecord
    has_secure_password

    validates :email, :first_name, :last_name, presence: true
    validates :email, uniqueness: true
end
