import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    // Provides all appointments related to the current user
    const user = await currentUser();
    if (!user) throw new Error('No user found')
    const userId = user.id;

    const appointments = await prisma.appointment.findMany({
        where: {
            patientId: userId
        }
    });    
    return NextResponse.json(appointments);
  };