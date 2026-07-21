module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("index.html");
  eleventyConfig.addPassthroughCopy("de/index.html");
  eleventyConfig.addPassthroughCopy("de/impressum.html");
  eleventyConfig.addPassthroughCopy("id/index.html");
  eleventyConfig.addPassthroughCopy("en/index.html");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("de/schwangerschaft.html");
  eleventyConfig.addPassthroughCopy("de/wochenbett.html");
  eleventyConfig.addPassthroughCopy("de/stillbegleitung.html");
  eleventyConfig.addPassthroughCopy("id/kehamilan.html");
  eleventyConfig.addPassthroughCopy("id/nifas.html");
  eleventyConfig.addPassthroughCopy("id/menyusui.html");
  eleventyConfig.addPassthroughCopy("en/pregnancy.html");
  eleventyConfig.addPassthroughCopy("en/postnatal.html");
  eleventyConfig.addPassthroughCopy("en/breastfeeding.html");
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("de/igel.html");
  eleventyConfig.addPassthroughCopy("en/igel.html");
  eleventyConfig.addPassthroughCopy("id/igel.html");
  

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