import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { useState, useEffect } from "react";
import Doctors from "@/app/components/doctors";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>HOME PAGE</h1>
      <Doctors />
      <Link href="/components/appointments/">
        <button>Make New Appointment</button>
      </Link>
    </main>
  );
}
