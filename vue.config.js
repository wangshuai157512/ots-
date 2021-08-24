module.exports = {
    devServer: {
        overlay: {
            // 让浏览器 overlay 同时显示警告和错误
            warnings: true,
            errors: true
        },
        // host: 'localhost',
        port: 1234, // 端口号
        // https: false, // https:{type:Boolean}
        // open: true, // 配置自动启动浏览器
        hotOnly: true, // 热更新
        proxy: {
            // 配置多个跨域
            '/api': {
                target: 'http://172.16.6.130:8080/oxer',//跨域接口的地址
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                },
                secure: false
            }
        },
        // headers: {
        //     'Access-Control-Allow-Origin': '*',
        // }
    }
};

// module.exports = {
//     devServer: {
//         open: true,
//         port: 8080,
//         proxy: {
//             '/api': {
//                 target: 'http://172.16.6.130:8080/oxer',//https://otstest.chinaedu.net:8443/
//                 // https: true,
//                 // target: 'https://otstest.chinaedu.net:8443/mini',//https://otstest.chinaedu.net:8443
//                 // target: 'https://api.github.com',
//                 pathRewrite: {'^/api' : ''},
//                 ws: true,
//                 changeOrigin: true,     // target是域名的话，需要这个参数，
//                 secure: false
//             }
//         }
//         // proxy: 'https://otstest.chinaedu.net:8443/mini'

//     }
// }