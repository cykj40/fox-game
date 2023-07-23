module.exports = {
  // Specify the entry point of your application
  // In this case, it's the index.html file in the 'src' directory
  entry: "src/index.html",

  // Specify the output directory for the bundled files
  output: {
    dir: "dist", // Output files will be placed in the 'dist' directory
    publicUrl: ".", // Set this to '.' if your site is served from the root
  },
};
