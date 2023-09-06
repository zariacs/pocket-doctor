import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('No user found');
        const userId = user.id;

        const patient = await prisma.patient.findUnique({
            where: {
                id: userId
            }
        });
        console.log(patient);
        return NextResponse.json(patient);
    } catch (error) {
        return NextResponse.json({error: 'Error retrieving patient'}, {status: 500});
    }
};