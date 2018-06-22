const autoprefixer = require('autoprefixer');
const customProperties = require('postcss-custom-properties');
module.exports = {
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-postcss-sass`,
      options: {
        postCssPlugins: [
          autoprefixer({
            browsers: ['last 2 versions'],
            grid: true,
          }),
          customProperties
        ],
        precision: 8
      }
    },
    `gatsby-plugin-netlify`,
    "gatsby-link",
    `gatsby-transformer-remark`,
    `gatsby-plugin-styled-components`,
    "gatsby-transformer-json",
    'gatsby-plugin-react-next',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `index`,
        path: `${__dirname}/src/pages/projects/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `contact`,
        path: `${__dirname}/src/_data/contact`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `settings`,
        path: `${__dirname}/src/_data/settings`
      }
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`
      }
    }
  ]
};
