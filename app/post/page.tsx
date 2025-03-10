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

    const userid = session?.user?.id;

    console.log("User ID:", userid);

    if (!userid) {
      return setError("User not logged in.");
    }

    const validation = postRegister.safeParse({
      title,
      language,
      text,
      image_url,
    });
    console.log("title:", title);
    console.log("language:", language);
    console.log("text:", text);
    console.log("image", image_url);

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
      body: JSON.stringify({
        userId: userid,
        language,
        title,
        text,
        image_url: image_url ? image_url : "",
      }),
    });

    console.log("lol");
    const responseText = await res.text();
    console.log("Raw API Response:", responseText);

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (error) {
      console.error("Failed to parse response as JSON:", responseText);
      return window.alert(
        "Post creation failed. Error: Invalid JSON response."
      );
    }

    console.log("Parsed API Response:", result);

    if (res.ok) {
      window.alert("POST CREATED");
    } else {
      console.error("Error response:", result);

      // Extract error message safely
      const errorMessage =
        result?.error?.message ||
        result?.error ||
        result?.details ||
        "An unknown error occurred.";

      window.alert(`Post creation failed. Error: ${errorMessage}`);
      setError(errorMessage);
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
