const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: "development",
	entry: {
		background: path.resolve(__dirname, "src/core/background/background.ts"),
		content: path.resolve(__dirname, "src/core/content/content.ts"),
		popup: path.resolve(__dirname, "src/core/popup/popup.tsx"),
		options: path.resolve(__dirname, "src/core/options/options.tsx"),
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
				test: /\.css$/,
				use: [
					process.env.NODE_ENV === "production" ? MiniCssExtractPlugin.loader : "style-loader",
					"css-loader",
					"postcss-loader",
				],
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
			template: "src/core/index.html",
			filename: "popup.html",
			chunks: ["popup"],
		}),
		new HtmlWebpackPlugin({
			template: "src/core/index.html",
			filename: "options.html",
			chunks: ["options"],
		}),
		new MiniCssExtractPlugin({
			filename: "styles.[contenthash].css",
		}),
	],
	resolve: {
		alias: {
			assets: path.resolve(__dirname, "src/assets/"),
			features: path.resolve(__dirname, "src/features/"),
			store: path.resolve(__dirname, "src/store/"),
			core: path.resolve(__dirname, "src/core/"),
			"@": path.resolve(__dirname, "src"),
		},
		extensions: [".tsx", ".ts", ".js", ".json"],
	},
};
