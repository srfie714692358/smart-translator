const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: "development",
	entry: {
		background: path.resolve(__dirname, "src/background/background.ts"),
		content: path.resolve(__dirname, "src/content/content.ts"),
		popup: path.resolve(__dirname, "src/popup/popup.tsx"),
		options: path.resolve(__dirname, "src/options/options.tsx"),
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js",
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
					},
				},
			},
		],
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{ from: "src/manifest.json", to: "." },
				{ from: "public", to: "." },
			],
		}),
		new HtmlWebpackPlugin({
			title: "Smart translator | popup",
			filename: "popup.html",
			chunks: ["popup"],
		}),
		new HtmlWebpackPlugin({
			title: "Smart translator | options page",
			filename: "options.html",
			chunks: ["options"],
		}),
		new MiniCssExtractPlugin(),
	],
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
	},
};
