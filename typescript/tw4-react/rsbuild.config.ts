import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

export default defineConfig({
	plugins: [pluginReact()],
	server: {
		port: 5000,
	},
	output: {
		distPath: {
			root: 'build',
		},
		sourceMap: {
			css: true,
			js:
				process.env.NODE_ENV === 'production'
					? // Use a high quality source map format for production
					  'source-map'
					: // Use a more performant source map format for development
					  'cheap-module-source-map',
		},
	},
	html: {
		title: 'tw4',
		// template: './static/index.html',
		favicon: './public/img/logoico.svg',
		// appIcon: './public/img/logo.svg',
		meta: {
			description: 'Веб интерфейс управления сервером Angar',
			charset: {
				charset: 'UTF-8',
			},
		},
	},
	tools: {
		rspack: (config, { env }) => {
			if (process.env.NODE_ENV === 'development') {
				config.devtool = 'cheap-module-source-map'
			}
			return config
		},
	},
})
