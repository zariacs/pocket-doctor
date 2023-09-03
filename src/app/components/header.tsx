import { SignedIn, UserButton, SignedOut, SignInButton } from "@clerk/nextjs";

const header = () => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 30,
      }}
    >
      <h1>Your Favourite Doctor</h1>
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
