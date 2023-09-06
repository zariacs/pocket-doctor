import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  return (
    // The header needs some space between the title on the left and the user icon on the right
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 30,
      }}
    >
      {/* Header title will always take users back to landing page when clicked */}
      <Link href="/" className="header-text">
        <p className="header-text">Your Favourite Doctor</p>
      </Link>
      <SignedIn>
        {/* Signed in users are able to manage their accounts and sign out */}
        <UserButton />
      </SignedIn>
      <SignedOut>
        {/* Signed out users may access the sign in button */}
        <SignInButton>
          <button type="button" className="btn btn-dark">
            Sign in
          </button>
        </SignInButton>
      </SignedOut>
    </header>
  );
}
