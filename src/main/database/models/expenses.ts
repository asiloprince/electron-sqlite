import { Database } from 'sqlite3'

export function createExpensesTable(db: Database): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(
      `CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        expenses TEXT NOT NULL
      );`,
      (err) => {
        if (err) {
          console.error(err.message)
          reject(err)
        } else {
          console.log('Table created or already exists.')
          resolve()
        }
      }
    )
  })
}
