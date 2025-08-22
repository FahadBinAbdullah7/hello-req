import { type NextRequest, NextResponse } from "next/server"
import { googleSheetsService } from "@/lib/google-sheets"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Generate ticket ID
    const ticketId = `TKT-${Date.now().toString().slice(-6)}`

    const ticketData = {
      id: ticketId,
      productName: formData.productName || "",
      type: formData.type || "",
      deliveryTimeline: formData.deliveryTimeline || "",
      teamSelection: formData.teamSelection || "",
      details: formData.details || "",
      requisitionBreakdown: formData.requisitionBreakdown || "",
      priority: formData.priority || "Medium",
      status: formData.isDraft ? "draft" : "todo",
      createdDate: new Date().toISOString().split("T")[0],
    }

    console.log("[v0] Submitting ticket to Google Sheets:", ticketData)

    const success = await googleSheetsService.appendTicket(ticketData)

    if (success) {
      return NextResponse.json({
        success: true,
        ticketId,
        message: formData.isDraft ? "Ticket saved as draft" : "Ticket submitted successfully",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to submit ticket",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("[v0] Error in ticket submission:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    const tickets = await googleSheetsService.getTickets()
    return NextResponse.json({ success: true, tickets })
  } catch (error) {
    console.error("[v0] Error fetching tickets:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch tickets",
      },
      { status: 500 },
    )
  }
}
