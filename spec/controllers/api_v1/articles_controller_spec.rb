require 'rails_helper'

RSpec.describe ApiV1::ArticlesController, type: :controller do

  render_views

  describe '#index' do
    before do
      @article = FactoryGirl.create(:article)
      get :index, format: :json
    end

    it 'success' do
      articles = JSON.parse(response.body)
      article = articles.first

      expect(articles.size).to eq(1)
      expect(article['header']).to eq(@article.header)
      expect(article['body']).to eq(@article.body)
      expect(article['url']).to eq(@article.url)
    end
  end

  describe '#parse_url' do
    let(:google_url) { 'http://www.google.com' }
    before do
      @article = FactoryGirl.create(:article)
      expect(ArticleParser).to receive(:parse).with(google_url).and_return true
      post :parse_url, url: google_url
    end

    it 'check response status code' do
      expect(response.status).to eq(204)
    end
  end

  describe '#destroy' do
    before do
      @article = FactoryGirl.create(:article)
      delete :destroy, id: @article.id
    end

    it 'check response status code' do
      expect(response.status).to eq(204)
      expect(Article.count).to eq(0)
    end
  end
end
