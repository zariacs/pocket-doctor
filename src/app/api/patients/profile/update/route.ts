import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import requestIp from 'request-ip';

export async function PUT (request:NextRequest, req: NextApiRequest) {
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

        // All IP address related code has been commented out for
        // const detectedIp = requestIp.getClientIp(req);
        // const userIp = request.ip as string;
        // const userIp = await profileData.ip as string;
        // if (!userIp) throw new Error('No IP address found');

        // Updates patient profile with new profile data
        const profile = await prisma.patient.update({
            where: {
                id: patientId,
            },
            data: {
                allergies: userAllergies,
                medications: userMedications,
                address: userAddress,
                // ip: userIp,
            }
        })
        // Returns profile along with new resource created status
        return NextResponse.json(profile, { status: 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Error updating profile' }, { status: 500 });
    }
};