"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const { status, data: session } = useSession();

  return (
    <div className="p-4 bg-emerald-800 flex justify-between items-center shadow-md">
      <div className="text-white font-semibold text-lg">
        <Link href="/" className="hover:text-gray-200 mr-5">
          Home
        </Link>
        {status === "authenticated" && <Link href="/post">Create Post</Link>}
      </div>
      <div className="space-x-6">
        {status === "unauthenticated" && (
          <Link
            href="/api/auth/signin?callbackUrl=/"
            className="text-white hover:text-gray-200 font-medium"
          >
            Login
          </Link>
        )}

        {status === "authenticated" && (
          <div className="text-white font-medium">
            Welcome, {session.user?.name}
          </div>
        )}

        {status === "loading" && (
          <div className="text-white font-medium">Loading...</div>
        )}

        {status === "unauthenticated" && (
          <Link
            href="/register"
            className="text-white hover:text-gray-200 font-medium"
          >
            Register
          </Link>
        )}

        {status === "authenticated" && (
          <Link href="/user/settings">Profile</Link>
        )}

        {status === "authenticated" && (
          <Link href="/api/auth/signout">Log out</Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
