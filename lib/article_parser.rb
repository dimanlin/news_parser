class ArticleParser
  def self.parse(url)
    html_doc = Nokogiri::HTML(open(url).read)
    h1 = html_doc.xpath('//h1')
    h2 = html_doc.xpath('//h2')
    h3 = html_doc.xpath('//h3')

    most_postoreny = [h1, h2, h3].sort {|a,b| b.size <=> a.size }.first

    most_postoreny.each do |header|
      parse_by_header_node(header, url)
    end
  end

  def self.parse_by_header_node(header, url)
    article_attributes = {}
    parent_node = header.parent
    if parent_node.search('p').first
      article_attributes.merge!({ body: parent_node.search('p').first.text.strip })
    end

    article_url = get_link(header)

    if article_url =~ /www|http/
      article_attributes.merge!({ url: article_url })
    else
      host = URI(url).host
      scheme = URI(url).scheme
      article_attributes.merge!({ url: "#{scheme}://#{host}" + article_url })
    end

    article_attributes.merge!({ header: header.text.strip.gsub('\n', '  ') })

    Article.create( article_attributes )
  end

  def self.get_link(header)
    if header.xpath('a/@href').present?
      header.xpath('a/@href').text
    else
      header.xpath('./ancestor::a/@href').text
    end
  end
end
