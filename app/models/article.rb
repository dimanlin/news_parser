class Article < ApplicationRecord

  after_create :send_to_channel_about_new_article
  after_destroy :send_to_channel_about_destroy_article

  private

  def send_to_channel_about_new_article
    WebSocketBrodcast.new_article(self)
  end

  def send_to_channel_about_destroy_article
    WebSocketBrodcast.destroy_article(self)
  end
end
