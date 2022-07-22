Rails.application.routes.draw do
  resources :users

  post "/signup", to: "users#create"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

end
