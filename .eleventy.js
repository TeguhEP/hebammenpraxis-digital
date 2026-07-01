module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("de");
  eleventyConfig.addPassthroughCopy("id");
  eleventyConfig.addPassthroughCopy("en");
  eleventyConfig.addPassthroughCopy("admin");

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};