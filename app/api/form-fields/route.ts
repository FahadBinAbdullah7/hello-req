import { NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
})

const sheets = google.sheets({
  version: "v4",
  auth,
})

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID

interface FormField {
  id: string
  label: string
  type: "text" | "textarea" | "select" | "date" | "url" | "checkbox"
  required: boolean
  options?: string[]
}

// GET /api/form-fields
export async function GET() {
  if (!SPREADSHEET_ID) {
    return NextResponse.json({ message: "Spreadsheet ID not configured" }, { status: 500 })
  }

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "FormFields!A:G", // Assuming fields are in columns A-G
    })

    const rows = response.data.values
    if (!rows || rows.length === 0) {
      return NextResponse.json({ formFields: [] }, { status: 200 })
    }

    const headers = rows[0]
    const formFields: FormField[] = rows.slice(1).map((row) => {
      const field: Partial<FormField> = {}
      headers.forEach((header, index) => {
        const value = row[index]
        switch (header) {
          case "id":
            field.id = value
            break
          case "label":
            field.label = value
            break
          case "type":
            field.type = value as FormField["type"]
            break
          case "required":
            field.required = value === "TRUE"
            break
          case "options":
            field.options = value ? value.split(",").map((opt: string) => opt.trim()) : undefined
            break
          // Add other fields if necessary
        }
      })
      return field as FormField
    })

    return NextResponse.json({ formFields }, { status: 200 })
  } catch (error) {
    console.error("Error fetching form fields:", error)
    return NextResponse.json({ message: "Error fetching form fields", error }, { status: 500 })
  }
}

// POST /api/form-fields
export async function POST(req: NextRequest) {
  if (!SPREADSHEET_ID) {
    return NextResponse.json({ message: "Spreadsheet ID not configured" }, { status: 500 })
  }

  try {
    const { formFields: newFormFields } = await req.json()

    if (!Array.isArray(newFormFields)) {
      return NextResponse.json({ message: "Invalid data format. Expected an array of form fields." }, { status: 400 })
    }

    const headers = ["id", "label", "type", "required", "options"]
    const values = newFormFields.map((field: FormField) => [
      field.id,
      field.label,
      field.type,
      field.required ? "TRUE" : "FALSE",
      field.options ? field.options.join(", ") : "",
    ])

    // Clear existing data and then append new data
    await sheets.spreadsheets.values.clear({
      spreadsheetId: SPREADSHEET_ID,
      range: "FormFields!A:G",
    })

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "FormFields!A:G",
      valueInputOption: "RAW",
      requestBody: {
        values: [headers, ...values],
      },
    })

    return NextResponse.json({ message: "Form fields updated successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error updating form fields:", error)
    return NextResponse.json({ message: "Error updating form fields", error }, { status: 500 })
  }
}
