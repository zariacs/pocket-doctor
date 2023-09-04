import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const doctors = await prisma.doctor.findMany({});    
    return NextResponse.json(doctors);
  };
