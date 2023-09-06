import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { useState, useEffect } from "react";
import Doctors from "@/app/components/doctors";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Welcome</h1>
      <h4>to your favourite doctor&apos;s office</h4>
      <Link href="/components/appointments/">
        <button type="button" className="btn btn-dark">
          Get Started
        </button>
      </Link>
    </main>
  );
}
