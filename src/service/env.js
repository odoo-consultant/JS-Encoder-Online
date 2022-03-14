const isProd = ['production', 'prod'].includes(process.env.NODE_ENV)

const env = {
  dev: {
    // server: 'http://106.12.123.56:8090',
    // server: 'http://192.168.10.58:8090',
    server: 'http://192.168.3.188:8069',
    // server: 'https://api.moco.co',
    client: 'http://localhost:8080',
  },
  prod: {
    server: 'https://api.moco.co',
    client: 'https://odoo.moco.co',
  }
}

module.exports = isProd ? env.prod : env.dev