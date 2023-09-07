import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    // Provides dateTimes for all upcoming appointments

    const upcomingAppointments = await prisma.appointment.findMany({
        where: {
            dateTime: {
                gt: new Date()
            }
        },
        select: {
            dateTime: true,
        }
    });  
    return NextResponse.json(upcomingAppointments);
  };