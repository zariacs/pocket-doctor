import { currentUser } from "@clerk/nextjs";

export async function getAppointmentsForUser(id: string) {}

export default async function Page() {
  const user = await currentUser();

  if (!user) throw new Error("User not found");

  const appointments = await getAppointmentsForUser(user.id);
}
