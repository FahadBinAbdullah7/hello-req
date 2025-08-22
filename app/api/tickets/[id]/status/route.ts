import { type NextRequest, NextResponse } from "next/server"
import { googleSheetsService } from "@/lib/google-sheets"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { status } = await request.json()
    const ticketId = params.id

    console.log(`[v0] Updating ticket ${ticketId} status to ${status}`)

    const success = await googleSheetsService.updateTicketStatus(ticketId, status)

    if (success) {
      return NextResponse.json({
        success: true,
        message: "Ticket status updated successfully",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to update ticket status",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("[v0] Error updating ticket status:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
