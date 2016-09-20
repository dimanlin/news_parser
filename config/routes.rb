Rails.application.routes.draw do
  root 'articles#index'
  mount ActionCable.server => "/cable"

  resources :articles
  namespace :api_v1 do
    resources :articles do
      collection do
        post :parse_url
      end
    end
  end
end
