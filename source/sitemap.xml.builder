---
layout: false
---

xml.instruct!
xml.urlset 'xmlns' => "http://www.sitemaps.org/schemas/sitemap/0.9" do
  sitemap.resources.select { |page| page.destination_path =~ /\.html/ && !(page.destination_path =~ /thank-you/) && !(page.destination_path =~ /404/) && !(page.destination_path =~ /logo-animation/) }.each do |page|
    xml.url do
      xml.loc "https://localhost.events#{page.url}"
      xml.lastmod Date.today.to_time.iso8601
      xml.changefreq page.data.changefreq || "monthly"
      xml.priority page.data.priority || "0.5"
    end
  end
end
