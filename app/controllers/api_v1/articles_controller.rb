class ApiV1::ArticlesController < ApplicationController
  def index
    @articles = Article.all.order(created_at: :desc)
  end

  def parse_url
    ArticleParser.parse(params[:url])
  end
end
