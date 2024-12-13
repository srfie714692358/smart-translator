const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
	mode: "development",
	devtool: "cheap-module-source-map",
	entry: {
		popup: path.resolve("./src/popup/popup.jsx"),
	},
	module: {
		rules: [
			{
				use: "babel-loader",
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
			},
			{
				test: /\.css$/i,
				use: [
					"style-loader",
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [require("tailwindcss"), require("autoprefixer")],
							},
						},
					},
				],
			},
		],
	},
	plugins: [
		new CopyPlugin({
			patterns: [{ from: path.resolve("assets"), to: path.resolve("dist") }],
		}),
		new HtmlPlugin({
			title: "Smart translator",
			filename: "popup.html",
			chunks: ["popup"],
		}),
	],
	output: {
		filename: "[name].js",
	},
};
