const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
	entry: {
		'docs-table/index': path.resolve(
			__dirname,
			'src/docs-table/index.js'
		),
		'docs-table-row/index': path.resolve(
			__dirname,
			'src/docs-table-row/index.js'
		),
	},
	output: {
		...defaultConfig.output,
		path: path.resolve( __dirname, 'build' ),
	},
};
