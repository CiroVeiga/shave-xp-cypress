const { Pool } = require('pg')

const dbConfig = {

  host: 'trumpet.db.elephantsql.com',
  user: 'lqddxhbr',
  password: '81jry3STcVLG7GdZ3yNPzlYibOpzLKsx',
  database: 'lqddxhbr',
  port: 5432
}

module.exports = {
    removeUser(email) {
        return new Promise(function (resolve) {
          const pool = new Pool(dbConfig)

          pool.query('DELETE FROM users WHERE email = $1', [email], function (error, result) {
            if (error) {
              throw error
            }
            resolve({ success: result })
          })
        })
      }


}