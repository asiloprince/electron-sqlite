// import { app } from 'electron'
// import path from 'node:path'
// import { type Database, verbose } from 'sqlite3'

// const TAG = '[sqlite3]'
// let database: Promise<Database>

// export function getSqlite3(
//   filename = path.join(app.getPath('userData'), 'database.sqlite3')
// ): Promise<Database> {
//   return (database ??= new Promise<Database>((resolve, reject) => {
//     const db = new (verbose().Database)(filename, (error) => {
//       if (error) {
//         console.log(TAG, 'initialize failed :(')
//         console.log(TAG, error)
//         reject(error)
//       } else {
//         console.log(TAG, 'initialize success :)')
//         console.log(TAG, filename)
//         resolve(db)
//       }
//     })
//   }))
// }

import { app } from 'electron'
import path from 'node:path'
import { type Database, verbose } from 'sqlite3'

const TAG = '[sqlite3]'
let database: Promise<Database>

export function getSqlite3(
  filename = path.join(app.getPath('userData'), 'test.sqlite3')
): Promise<Database> {
  return (database ??= new Promise<Database>((resolve, reject) => {
    const db = new (verbose().Database)(filename, (error) => {
      if (error) {
        console.log(TAG, 'initialize failed :(')
        console.log(TAG, error)
        reject(error)
      } else {
        console.log(TAG, 'initialize success :)')
        console.log(TAG, filename)

        resolve(db)
      }
    })
  }))
}

export function insertFormData(db: Database, name: string): void {
  db.run(`INSERT INTO user(name) VALUES(?)`, [name], function (err) {
    if (err) {
      return console.error(err.message)
    }
    console.log(`Row inserted with rowid ${this.lastID}`)
  })
}
// Define a type for the user data
type User = {
  id: number
  name: string
  // Add other properties as needed
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
