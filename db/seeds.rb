10.times do
    User.create(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, username: Faker::Internet.username, password_digest: Faker::Internet.password, email: Faker::Internet.email, avatar: Faker::Avatar.image)
end

puts "done seeding fren"
