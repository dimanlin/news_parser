# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class ArticlesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "article_channel"
  end

  def unsubscribed
  end
end
