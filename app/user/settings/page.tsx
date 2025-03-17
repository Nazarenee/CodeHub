"use client";

import React from "react";
import { useSession } from "next-auth/react";

const userSettings = () => {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Email: </h1>
      <p> {session?.user?.email!}</p>
    </div>
  );
};

export default userSettings;
