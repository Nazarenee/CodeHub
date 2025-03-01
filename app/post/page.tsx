"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import postRegister from "./schema";

const PostCreate = () => {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [text, setText] = useState("");
  const [image_url, setImage_url] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = postRegister.safeParse({
      title,
      language,
      text,
      image_url,
    });

    if (!validation.success) {
      const errorMessages = validation.error.errors
        .map((err) => err.message)
        .join(", ");
      return setError(errorMessages);
    }

    const userId = session?.user;

    if (!userId) {
      return setError("User not logged in.");
    }

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, language, text, image_url, userId }),
    });

    if (res.ok) {
    } else {
      setError("Post creation failed.");
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
        <textarea
          placeholder="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image_url}
          onChange={(e) => setImage_url(e.target.value)}
        />
        <button type="submit">Create Post</button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default PostCreate;
