// Adds a new patient record to the database 
// containing clerk ID, first name, and last name
// to later be used immediately after registration

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const newUser = await currentUser();
    if (!newUser) throw new Error('No user found')

    const newEmail = newUser.emailAddresses[0].emailAddress as string;
    const newId = newUser.id as string;
    const newFirstName = newUser.firstName as string;
    const newLastName = newUser.lastName as string;
    const newIp = request.ip as string;

    // used for testing
    console.log('Values being passed to prisma.patient.create():', {
        id: newId,
        email: newEmail,
        fname: newFirstName,
        lname: newLastName,
        ip: newIp,
      });


    const patient = await prisma.patient.create({
        data: {
            id: newId,
            fname: newFirstName,
            lname: newLastName,
            email: newEmail,
            ip: newIp,
        },
      })
    console.log("Created patient:", patient); 
    return NextResponse.json(patient);
}