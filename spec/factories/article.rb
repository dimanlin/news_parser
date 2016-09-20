FactoryGirl.define do
  sequence :article_header do |n|
    "article_header_#{n}"
  end

  sequence :article_body do |n|
    "article_body_#{n}"
  end

  sequence :article_url do |n|
    "http://www.google.com/#{n}"
  end

  factory :article do
    header { FactoryGirl.generate(:article_header) }
    body { FactoryGirl.generate(:article_body) }
    url { FactoryGirl.generate(:article_url) }
  end
end
