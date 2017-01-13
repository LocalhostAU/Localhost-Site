module SiteHelpers
  def page_title
    title = "Middleman: "
    if current_page.data.title
      title << current_page.data.title
    else
      title << t("index.sub_title")
    end
    title
  end
end
