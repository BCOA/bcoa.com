module.exports = {
	plugins: [
		'gatsby-plugin-react-helmet',
		`gatsby-plugin-sass`,
		`gatsby-plugin-netlify-cms`,
		`gatsby-plugin-netlify`,
		'gatsby-link',
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `pages`,
				path: `${__dirname}/src/pages/`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `projects`,
				path: `${__dirname}/src/pages/projects/`,
			},
		},
	]
}
