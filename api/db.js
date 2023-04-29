const { Pool } = require('pg')

const dbConfig = {

  host: 'trumpet.db.elephantsql.com',
  user: 'lqddxhbr',
  password: '81jry3STcVLG7GdZ3yNPzlYibOpzLKsx',
  database: 'lqddxhbr',
  port: 5432
}

const pool = new Pool(dbConfig)
async function deleteUser(email) {
    await pool.query('DELETE FROM users WHERE email = $1', [email])
}

async function insertUser(user){
    
}

module.exports = {
    deleteUser

}