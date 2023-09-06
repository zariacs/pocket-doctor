import { SignedIn, UserButton, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

const header = () => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 30,
      }}
    >
      <Link href="/" className="header-text">
        <p className="header-text">Your Favourite Doctor</p>
      </Link>
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton />
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <SignInButton />
      </SignedOut>
    </header>
  );
};

export default header;
