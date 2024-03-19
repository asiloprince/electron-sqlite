import { Database } from 'sqlite3'

// Define a type for the user data
type User = {
  id: number
  name: string
  // Add other properties as needed
}

export function insertUser(db: Database, name: string): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO user(name) VALUES(?)`, [name], function (err) {
      if (err) {
        console.error(err.message)
        reject(err)
      } else {
        console.log(`Row inserted with rowid ${this.lastID}`)
        resolve()
      }
    })
  })
}

export function fetchUsers(db: Database): Promise<User[]> {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM user`, (err, rows: User[]) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
}
