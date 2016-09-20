require 'rails_helper'

RSpec.describe ArticlesController, type: :controller do
  describe '#index' do
    before do
      @article = FactoryGirl.create(:article)
      get :index
    end

    it 'success' do
      expect(response).to be_success
      expect(assigns(:articles)).to eq([@article])
    end
  end
end
