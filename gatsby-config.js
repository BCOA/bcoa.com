module.exports = {
	plugins: [
		`gatsby-plugin-sass`,
		`gatsby-plugin-netlify-cms`,
		`gatsby-plugin-netlify`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `pages`,
				path: `${__dirname}/src/pages/`,
			},
		},
	]
}
