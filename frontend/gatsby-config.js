require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Find Computer`,
    description: `Find your computer needs.`,
    author: `Priambudi Lintang Bagaskara`,
    siteUrl: `https://find-computer.priambudi.fyi`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: "find-computer",
        region: "ap-southeast-1",
        acl: "public-read",
      },
    },
    {
      resolve: 'gatsby-plugin-brotli',
      options: {
        extensions: ['css', 'html', 'js', 'svg']
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `find-computer`,
        short_name: `Find Computer`,
        start_url: `/`,
        background_color: `#41403e`,
        theme_color: `#41403e`,
        display: `minimal-ui`,
        icon: `src/images/hermes.jpg`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
