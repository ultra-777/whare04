import path from 'path';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import AutoPrefixer from 'autoprefixer';
import webpack from 'webpack';

/**
 *  Application source files location
 */
const SOURCE_FOLDER = 'src';

/**
 * Assets folder
 */
const ASSETS_FOLDER = 'assets';

/**
 * Application entry file
 */
const ENTRY_FILE_NAME = 'index';

/**
 * Application HTML template
 */
const HTML_TEMPLATE_FILE_NAME = 'index.html';

/**
 * Favicon
 */
const FAVICON_FILE_NAME = 'favicon.ico';

/**
 * Images folder
 */
const IMG_FOLDER_NAME = 'img';

/**
 * Middle configuration file
 */
const MIDDLE_CONFIG_FILE_NAME = 'config.js';

/**
 * Target distributive folder
 */
const TARGET_FOLDER = 'dist';

/**
 * Styles bundle name
 */
const TARGET_STYLES_FILE_NAME = 'application';

/**
 * Maximal image size to be injectd in CSS
 */
const MAX_IMAGE_INLINE_SIZE = 65536;

/**
 * Folders to use css class modules
 * @type {RegExp[]}
 */
const CSS_CLASS_MODULE_FOLDERS = [
	/\/components\/.*.(styl|css)$/i,
	/\/session-client\/.*.(styl|css)$/i
];


export default (envs, argv) =>
{
	const {mode, env} = argv;

	const isDevelopment = (mode === 'development');
	const isTesting = (mode === 'testing');
	const isProduction = (mode === 'production');

	return {
		resolve: {
			modules: ["node_modules", "src"]
		},
		entry: {
			'application': path.join(__dirname, `${SOURCE_FOLDER}/${ENTRY_FILE_NAME}`)
		},
		devServer: {
			contentBase: './dist',
			hot: true,
			port: 3000
		},
		output: {
			path: path.join(__dirname, TARGET_FOLDER),
			filename: '[name].[hash:20].js',
			chunkFilename: '[name].[hash:20].bundle.js',
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader"
					}
				},
				{
					test: /.*\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot)$/,
					use: `url-loader?limit=${MAX_IMAGE_INLINE_SIZE}`
				},
				/*{
					test: /\.svg$/,
					use: [
						{
							loader: "babel-loader"
						},
						{
							loader: "react-svg-loader",
							options: {
								jsx: true // true outputs JSX tags
							}
						}
					]
				},*/
				{
					test: /\.html$/,
					use: [
						{
							loader: "html-loader",
							options: { minimize: true }
						}
					]
				},
				{
					test: /\.(styl|css)$/,
					include: CSS_CLASS_MODULE_FOLDERS,
					use: ExtractTextPlugin.extract({
						fallback: "style-loader",
						use: [
							{
								loader: "css-loader",
								options: {
									sourceMap: false,
									modules: true,
									localIdentName: (env || {}).production ? '[hash:base64:8]' : '[path][name]__[local]--[hash:base64:4]',
									minimize: (env || {}).production
								},
							},
							{
								loader: "postcss-loader",
								options: {
									plugins: () => [
										AutoPrefixer({
											browsers: [
												'last 3 version',
												'ie >= 10',
											],
										}),
									],
								}
							},
							{loader: "stylus-loader"},
						],
					})
				},
				{
					test: /\.(styl|css)$/,
					exclude: CSS_CLASS_MODULE_FOLDERS,
					use: ExtractTextPlugin.extract({
						fallback: "style-loader",
						use: [
							{
								loader: "css-loader",
								options: {
									sourceMap: false,
									modules: false,
									minimize: isProduction
								},
							},
							{
								loader: "postcss-loader",
								options: {
									plugins: () => [
										AutoPrefixer({
											browsers: [
												'last 3 version',
												'ie >= 10',
											],
										}),
									],
								}
							},
							{ loader: "stylus-loader" },
						],
					}),
				}
			]
		},
		plugins: [
			new HtmlWebPackPlugin({
				filename: HTML_TEMPLATE_FILE_NAME,
				template: `./${SOURCE_FOLDER}/${HTML_TEMPLATE_FILE_NAME}`,
				favicon: `./${ASSETS_FOLDER}/${FAVICON_FILE_NAME}`,
				minify: {
					collapseWhitespace: isProduction,
					minifyCSS: isProduction || isTesting,
					minifyJS: isProduction || isTesting,
					removeComments: isProduction || isTesting,
					useShortDoctype: isProduction|| isTesting
				},
			}),
			new CopyWebpackPlugin([
				{ from: ASSETS_FOLDER },
				//{ from: IMG_FOLDER_NAME, to: IMG_FOLDER_NAME },
				{ from: MIDDLE_CONFIG_FILE_NAME }
			]),
			new ExtractTextPlugin(`${TARGET_STYLES_FILE_NAME}.[contenthash:20].css`),
			...(isProduction || isTesting) ? [new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production')
			})] : []//,
			//isDevelopment ? [new webpack.NamedModulesPlugin()] : [],
			//isDevelopment ? [new webpack.HotModuleReplacementPlugin()] : []
		]
	}
};