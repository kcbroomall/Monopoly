var host = process.env.RDS_HOSTNAME || 'localhost'
var user = process.env.RDS_USERNAME || 'root'
var password = process.env.RDS_PASSWORD || '1234'
var port = process.env.RDS_PORT || '3306'
module.exports = {
  client: 'mysql',
  connection: {
    host,
    user,
    password,
    port,
    database: 'monopoly'
  }
}
