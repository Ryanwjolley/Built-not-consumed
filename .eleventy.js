module.exports = function (eleventyConfig) {
  // Copy CSS straight through to the output folder
  eleventyConfig.addPassthroughCopy("src/css");

  // {{ myDate | date }} -> "July 20, 2026"
  eleventyConfig.addFilter("date", function (value) {
    const d = new Date(value);
    if (isNaN(d)) return value;
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
  });

  // Any markdown file in src/lessons/ with "layout: lesson.njk" in its
  // front matter automatically becomes part of the "lessons" collection,
  // sorted newest first. This is what powers the /lessons/ index page.
  eleventyConfig.addCollection("lessons", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/lessons/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
  };
};
