import { NextResponse } from "next/server"
import { googleSheetsService } from "@/lib/google-sheets"

export async function GET() {
  try {
    const stats = await googleSheetsService.getDashboardStats()
    const tickets = await googleSheetsService.getTickets()

    // Get recent tickets (last 5)
    const recentTickets = tickets
      .sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
      .slice(0, 5)
      .map((ticket) => ({
        id: ticket.id,
        title: ticket.productName,
        type: ticket.type,
        priority: ticket.priority,
        assignedTeam: ticket.teamSelection,
        status:
          ticket.status === "done"
            ? "Completed"
            : ticket.status === "in-progress"
              ? "In Progress"
              : ticket.status === "review"
                ? "Pending Review"
                : "Todo",
        dueDate: ticket.deliveryTimeline,
      }))

    return NextResponse.json({
      success: true,
      stats,
      recentTickets,
    })
  } catch (error) {
    console.error("[v0] Error fetching dashboard data:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch dashboard data",
      },
      { status: 500 },
    )
  }
}
