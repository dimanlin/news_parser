class ArticleParser
  def self.parse(url)
    html_doc = Nokogiri::HTML(open(url.strip).read)
    h1 = html_doc.xpath('//h1')
    h2 = html_doc.xpath('//h2')
    h3 = html_doc.xpath('//h3')

    most_postoreny = [h1, h2, h3].sort { |a, b| b.size <=> a.size }.first

    Article.transaction do
      most_postoreny.each do |header|
        article_attributes = parse_by_header_node(header, url.strip)
        Article.create(article_attributes)
      end
    end
  end

  def self.parse_by_header_node(header, url)
    article_attributes = {}

    parent_node = header.parent
    if parent_node.search('p').first
      article_attributes[:body] = parent_node.search('p').first.text.strip
    end

    article_url = get_link(header)

    if article_url =~ /www|http/
      article_attributes[:url] = article_url
    else
      host = URI(url).host
      scheme = URI(url).scheme
      article_attributes[:url] = "#{scheme}://#{host}" + article_url
    end

    article_attributes.merge(header: header.text.strip.gsub('\n', '  '))
  end

  def self.get_link(header)
    if header.xpath('a/@href').present?
      header.xpath('a/@href').text
    else
      header.xpath('./ancestor::a/@href').text
    end
  end
end
