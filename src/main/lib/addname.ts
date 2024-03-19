// formHandler.js

import { getSqlite3, insertFormData } from '../database/sqlite'

export async function handleFormSubmission(event: any, data: any): Promise<void> {
  console.log(data) // Logs the form data

  // Get the database connection
  const db = await getSqlite3()

  // Insert the data into the database
  insertFormData(db, data.name)
}
