import { google } from 'googleapis'

function getAuthClient() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY
    ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
    : ''

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  return auth
}

async function getSheetsClient() {
  const auth = getAuthClient()
  const sheets = google.sheets({ version: 'v4', auth })
  return sheets
}

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID

/**
 * Get all rows from a sheet as objects (uses first row as headers)
 */
export async function getSheet(sheetName) {
  const sheets = await getSheetsClient()
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: sheetName,
  })

  const rows = response.data.values || []
  if (rows.length === 0) return []

  const headers = rows[0]
  return rows.slice(1).map((row) => {
    const obj = {}
    headers.forEach((header, index) => {
      obj[header] = row[index] || ''
    })
    return obj
  })
}

/**
 * Get all rows as raw arrays (including header row)
 */
export async function getAllRows(sheetName) {
  const sheets = await getSheetsClient()
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: sheetName,
  })

  return response.data.values || []
}

/**
 * Append a new row to a sheet
 */
export async function appendRow(sheetName, rowArray) {
  const sheets = await getSheetsClient()
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: sheetName,
    valueInputOption: 'RAW',
    requestBody: {
      values: [rowArray],
    },
  })
}

/**
 * Update a specific row by 1-based row index (1 = header row, 2 = first data row)
 */
export async function updateRow(sheetName, rowIndex, rowArray) {
  const sheets = await getSheetsClient()
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!A${rowIndex}`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [rowArray],
    },
  })
}

/**
 * Find the first row matching a value in a specific column (0-based colIndex)
 * Returns { row: {...}, rowIndex: number (1-based, counting header as 1) } or null
 */
export async function findRow(sheetName, colIndex, value) {
  const sheets = await getSheetsClient()
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: sheetName,
  })

  const rows = response.data.values || []
  if (rows.length === 0) return null

  const headers = rows[0]

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][colIndex] === value) {
      const obj = {}
      headers.forEach((header, idx) => {
        obj[header] = rows[i][idx] || ''
      })
      return { row: obj, rowIndex: i + 1 } // rowIndex is 1-based (row 1 = header)
    }
  }

  return null
}

/**
 * Delete a row by 1-based row index
 */
export async function deleteRow(sheetName, rowIndex) {
  const sheets = await getSheetsClient()

  // First we need to get the sheet ID
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId: SPREADSHEET_ID,
  })

  const sheet = spreadsheet.data.sheets.find(
    (s) => s.properties.title === sheetName
  )

  if (!sheet) throw new Error(`Sheet "${sheetName}" not found`)

  const sheetId = sheet.properties.sheetId

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SPREADSHEET_ID,
    requestBody: {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId,
              dimension: 'ROWS',
              startIndex: rowIndex - 1, // 0-based
              endIndex: rowIndex, // exclusive
            },
          },
        },
      ],
    },
  })
}
