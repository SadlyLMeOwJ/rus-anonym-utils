import * as path from "path";
import * as webpack from "webpack";
import nodeExternals from "webpack-node-externals";
import TerserWebpack from "terser-webpack-plugin";

const config: webpack.Configuration = {
	mode: "production",
	target: "node",
	entry: "./src/main.ts",
	optimization: {
		minimize: true,
		minimizer: [
			new TerserWebpack({
				parallel: true,
				terserOptions: {
					module: true,
				},
			}),
		],
	},
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	externals: [nodeExternals()],
	output: {
		filename: "main.js",
		library: {
			type: "umd",
			name: "rus-anonym-utils",
		},
		path: path.resolve(__dirname, "dist"),
	},
};

export default config;
