class CreateArticles < ActiveRecord::Migration[5.0]
  def change
    create_table :articles, &:timestamps
  end
end
