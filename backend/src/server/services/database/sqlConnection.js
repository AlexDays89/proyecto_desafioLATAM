import pg from 'pg'

const { Pool } = pg
const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  allowExitOnIdle: true,
  ssl: process.env.PG_SSL === 'true'
})

const sqlConnection = (query, values) => pool
  .query(query, values)
  .then(({ rows }) => rows)
  .catch((error) => { throw error })

export default sqlConnection
