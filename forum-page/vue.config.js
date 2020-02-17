var path = require('path');
module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				"@": path.resolve("src"),
				"assets": path.resolve(__dirname, 'src/assets/'),
				"components": path.resolve(__dirname, 'src/components/'),
				"request": path.resolve(__dirname, 'src/request/'),
				"views": path.resolve(__dirname, 'src/views/'),
			}
		}
	},
	devServer:{
    proxy:{
			'/api': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true
			},
			'/hottopic': {
        target: 'http://tieba.baidu.com/hottopic/browse/topicList?red_tag=c3338312053',
        ws: true,
        changeOrigin: true
			},
			'/floor':{
				target: 'http://localhost:11010',
        ws: true,
        changeOrigin: true
			}
		}
  }
}