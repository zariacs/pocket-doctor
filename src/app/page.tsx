import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { useState, useEffect } from "react";
import Doctors from "@/app/components/doctors";

function Home() {
  // var [doctors, setDoctors] = useState<Doctors | null>(null);
  // var [doctors, setDoctors] = useState<NextResponse | null>(null);

  // const [isLoading, setLoading] = useState(true);

  // const getDoctors = async () => {
  //   const data = await fetch("api/doctors", {
  //     method: "GET",
  //   });
  //   setDoctors(NextResponse.json(data));
  //   setLoading(false);
  //   return NextResponse.json(data);
  // };

  // type Doctors = {
  //   id: number;
  //   fname: string;
  //   lname: string;
  // };

  // const displayDoctors = (doctors: any) => {
  //   if (doctors)
  //     return (
  //       <ul>
  //         {/* {doctors.map((doctor: any) => ( */}
  //         <li key={doctors.id}>{doctors.fname}</li>
  //         {/* ))} */}
  //       </ul>
  //     );
  // };

  // useEffect(() => {
  //   // getDoctors();
  //   displayDoctors(getDoctors());
  // }, []);

  // if (isLoading) return <p>Loading...</p>;
  // if (!doctors) return <p>No doctors available</p>;

  return (
    <main>
      <h1>HOME PAGE</h1>
      {/* <button onLoad={displayDoctors} onClick={displayDoctors}>
        MY BUTTON
      </button> */}
      {/* <Doctors /> */}
      <Doctors />
    </main>
  );
}

export default Home;
