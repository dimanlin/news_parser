require 'rails_helper'

RSpec.describe Article, type: :model do
  let(:article) { FactoryGirl.create(:article) }

  describe 'send_to_channel_about_new_article' do
    before do
      expect(WebSocketBrodcast).to receive(:new_article).with(article).and_return true
    end

    it do
      expect(article.send(:send_to_channel_about_new_article)).to be_truthy
    end
  end

  describe 'send_to_channel_about_destroy_article' do
    before do
      expect(WebSocketBrodcast).to receive(:destroy_article).twice.with(article).and_return true
      article.destroy
    end

    it do
      expect(article.send(:send_to_channel_about_destroy_article)).to be_truthy
    end
  end
end
