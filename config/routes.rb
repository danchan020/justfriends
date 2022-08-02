Rails.application.routes.draw do
  resources :messages
  resources :conversations
  resources :users
  resources :conversations do
    resources :messages
  end

  mount ActionCable.server => "/cable"
  
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get "/me", to: "users#show"
  get "/featuredusers", to: "users#other_users"
  get "/profile/:id", to: "users#profile"
  post "/signup", to: "users#create"
  patch "/users/:id", to: "users#update"
  delete "/users/:id", to: "users#destroy"

  get "/conversations", to: "conversations#index"
  post "/conversations", to: "conversations#create"

  get "/conversations/:conversation_id/messages", to: "messages#index"
  post "/conversations/:conversation_id/messages", to: "messages#create"


    # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end
