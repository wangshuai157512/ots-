const baseUrlConfig = {
  // 'development' : 'http://172.16.6.130:8080',
  // 'test' : 'http://172.16.6.130:8080',
  'production' : 'http://172.16.6.130:8080',
}

const getBaseurl = mode => baseUrlConfig[mode];

const config = {
  method : 'POST',
  baseURL : getBaseurl(process.env.NODE_ENV),
  headers: {
    'Content-Type': 'application/json;charset=UTF-8', 
  },
  timeout: 1000 * 60,
  withCredentials : true
}

export default config
