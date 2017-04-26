###
# Page options, layouts, aliases and proxies
###

activate :aria_current

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page "/path/to/file.html", layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }
proxy "_redirects", "netlify-redirects", ignore: true

# General configuration

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload do |reload|
    reload.no_swf = true
  end
end


activate :directory_indexes
page "/404.html", :directory_index => false


###
# Helpers
###

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end


# Build-specific configuration
configure :build do
  activate :asset_hash, :ignore => %r{^blog/.*|ogimage.*.jpg}
end

activate :blog do |blog|
  blog.prefix = "blog"
  blog.layout = "blog-post"
  blog.permalink = "{year}/{month}/{day}/{title}.html"
  blog.paginate = true
  blog.page_link = "{num}"
  blog.per_page = 6
end

activate :ogp do |ogp|
  #
  # register namespace with default options
  #
  ogp.namespaces = {
    fb: data.ogp.fb,
    # from data/ogp/fb.yml
    og: data.ogp.og
    # from data/ogp/og.yml
  }
  ogp.base_url = 'https://localhost.events/'
  ogp.blog = true
end

configure :production do
  activate :minify_html
  activate :minify_css
  activate :minify_javascript
  ignore 'drafts/*'
end
