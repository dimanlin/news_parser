class AddColumnsToArticlesHeaderBodyUrl < ActiveRecord::Migration[5.0]
  def change
    add_column :articles, :header, :string
    add_column :articles, :body, :text
    add_column :articles, :url, :string
  end
end
