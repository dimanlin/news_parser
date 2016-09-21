require 'rails_helper'

RSpec.describe ArticleParser do
  let(:url) { 'https://www.example.com' }

  let(:content) { '<h1><a href="/h1">h1</a></h1>
                  <h2><a href="/h2">h2</a></h2>
                  <h2><a href="/h2">h2</a></h2>
                  <h3><a href="/h3">h3</a></h3>' }

  describe '.parse' do

    let(:article_attributes) { FactoryGirl.attributes_for(:article) }
    before do
      some_html = instance_double('some_html', read: content)
      expect(ArticleParser).to receive(:parse_by_header_node).twice.and_return(article_attributes)
      expect(ArticleParser).to receive(:open).with("https://www.example.com").and_return(some_html)
    end

    it do
      expect(ArticleParser.parse(url)).to be_truthy
    end
  end

  describe '.parse_by_header_node' do
    context 'if header link have a relative path' do
      let(:html_doc) { Nokogiri::HTML('<html><body><div><h2><a href="/h2">h2</a></h2><p>Description</p></div></body></html>') }
      let(:header) { html_doc.xpath('//h2').first }
      let(:result) { { body: "Description",
                        url: "https://www.example.com/h2",
                        header: "h2"} }

      it 'return hash attributes for article' do
        expect(ArticleParser.parse_by_header_node(header, url)).to eq(result)
      end
    end

    context 'if header link have a host name' do
      let(:html_doc) { Nokogiri::HTML('<html><body><div><h2><a href="http://www.h2.com/h2">h2</a></h2><p>Description</p></div></body></html>') }
      let(:header) { html_doc.xpath('//h2').first }
      let(:result) { { body: "Description",
                        url: "http://www.h2.com/h2",
                        header: "h2"} }

      it 'return hash attributes for article' do
        expect(ArticleParser.parse_by_header_node(header, url)).to eq(result)
      end
    end
  end

  describe '.get_link' do
    context 'link inside header' do
      let(:html_doc) { Nokogiri::HTML('<div><h2><a href="http://www.h2.com/h2">h2</a></h2><p>Description</p></div>') }
      let(:header) { html_doc.xpath('//h2').first }

      it 'return href' do
        expect(ArticleParser.get_link(header)).to eq('http://www.h2.com/h2')
      end
    end

    context 'header inside link' do
      let(:html_doc) { Nokogiri::HTML('<div><a href="http://www.h2.com/h2"><h2>h2</h2></a><p>Description</p></div>') }
      let(:header) { html_doc.xpath('//h2').first }

      it 'return href' do
        expect(ArticleParser.get_link(header)).to eq('http://www.h2.com/h2')
      end
    end

  end

end
