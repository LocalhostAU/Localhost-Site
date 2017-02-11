###
# Page options, layouts, aliases and proxies
###

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

# General configuration

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
  activate :autoprefixer
end

activate :directory_indexes

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
  activate :asset_hash
end

activate :blog do |blog|
  blog.prefix = "blog"
  blog.layout = "blog"
  blog.permalink = "{year}/{month}/{title}.html"
  blog.paginate = true
  blog.page_link = "p{num}"
  blog.per_page = 6
end

configure :production do
  activate :minify_html
  activate :minify_css
  activate :minify_javascript
  activate :asset_host, :host => '//d2jh1s85ct6v2r.cloudfront.net'
end

configure :staging do
  activate :minify_html
  activate :minify_css
  activate :minify_javascript
end
