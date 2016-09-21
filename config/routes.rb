Rails.application.routes.draw do
  root 'articles#index'
  mount ActionCable.server => "/cable"

  resources :articles, only: :index
  namespace :api_v1 do
    resources :articles, only: [:index, :destroy] do
      collection do
        post :parse_url
      end
    end
  end
end
