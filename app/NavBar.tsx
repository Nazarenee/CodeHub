import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <div>
      <Link href="/api/auth/signin?callbackUrl=/" className="mr-10">
        Login
      </Link>
      <Link href="/users/register">Register</Link>
    </div>
  );
};

export default NavBar;
