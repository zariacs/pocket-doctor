import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PUT (request:NextRequest) {
    try {
        // Retrieves current user's id
        const patient = await currentUser();
        if (!patient) throw new Error('No user found')
        const patientId = patient.id as string;

        // Retrieves profile data from request body
        const profileData = await request.json();
        const userAllergies = await profileData.allergies as string;
        const userMedications = await profileData.medications as string;
        const userAddress = await profileData.address as string;

        const userIp = request.ip as string;

        // Updates patient profile with new profile data
        const profile = await prisma.patient.update({
            where: {
                id: patientId,
            },
            data: {
                allergies: userAllergies,
                medications: userMedications,
                address: userAddress,
                ip: userIp,
            }
        })
        // Returns profile along with new resource created status
        return NextResponse.json(profile, { status: 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Error updating profile' }, { status: 500 });
    }
};