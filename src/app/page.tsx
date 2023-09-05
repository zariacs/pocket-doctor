import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { useState, useEffect } from "react";
import Doctors from "@/app/components/doctors";

export default function Home() {
  return (
    <main>
      <h1>HOME PAGE</h1>
      <Doctors />
    </main>
  );
}
