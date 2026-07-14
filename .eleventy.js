module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("index.html");
  eleventyConfig.addPassthroughCopy("de/index.html");
  eleventyConfig.addPassthroughCopy("de/impressum.html");
  eleventyConfig.addPassthroughCopy("id/index.html");
  eleventyConfig.addPassthroughCopy("en/index.html");
  eleventyConfig.addPassthroughCopy("admin");

  eleventyConfig.addCollection("blog_de", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/de/blog/*.md");
  });

  eleventyConfig.addCollection("blog_id", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/id/blog/*.md");
  });

  eleventyConfig.addCollection("blog_en", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/en/blog/*.md");
  });

  eleventyConfig.addFilter("dateDisplay", function(date) {
    return new Date(date).toLocaleDateString("de-DE", {
      year: "numeric", month: "long", day: "numeric"
    });
  });

  eleventyConfig.addFilter("dateDisplayId", function(date) {
    return new Date(date).toLocaleDateString("id-ID", {
      year: "numeric", month: "long", day: "numeric"
    });
  });

  eleventyConfig.addFilter("dateDisplayEn", function(date) {
    return new Date(date).toLocaleDateString("en-GB", {
      year: "numeric", month: "long", day: "numeric"
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};