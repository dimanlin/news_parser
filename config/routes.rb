Rails.application.routes.draw do
  root 'articles#index'
  resources :articles
  namespace :api_v1 do
    resources :articles
  end

end
