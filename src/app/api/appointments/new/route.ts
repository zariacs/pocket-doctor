import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        // Gets current user's ID
        const patient = await currentUser();
        if (!patient) throw new Error('No user found')
        const patientId = patient.id;

        // Prepares appointment date and time details
        const aptData = await request.json();
        const aptDate = await aptData.date as Date;
        const aptTime = await aptData.time as Date;

        // Create a new appointment in the database
        const appointment = await prisma.appointment.create({
          data: {
            date: aptDate,
            time: aptTime,
            patientId: patientId
          },
        });
  
        return NextResponse.json(appointment, { status: 201 });
      } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error creating appointment' }, { status: 500 });
      }
  };
