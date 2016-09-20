class WebSocketBrodcast
  def self.new_article(article)
    article = {
      id: article.id,
      body: article.body,
      header: article.header,
      url: article.url
    }
    ActionCable.server.broadcast("article_channel", { action: 'new_article', article: article })
  end

  def self.destroy_article(article)
    article = {
      id: article.id,
      body: article.body,
      header: article.header,
      url: article.url
    }
    ActionCable.server.broadcast("article_channel", { action: 'destroy_article', article: article })
  end
end
