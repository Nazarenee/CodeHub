"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import postRegister from "./schema";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";

interface CloudinaryResult {
  public_id: string;
  secure_url: string;
}

const PostCreate = () => {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [text, setText] = useState("");
  const [image_url, setImage_url] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.id) {
      return setError("User not logged in.");
    }

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

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: session.user.id,
        language,
        title,
        text,
        image_url,
      }),
    });

    const responseText = await res.text();

    let result;

    try {
      result = JSON.parse(responseText);
    } catch (error) {
      return window.alert("Post creation failed. Invalid JSON response.");
    }

    if (res.ok) {
      window.alert("POST CREATED");
      router.push("/");
    } else {
      const errorMessage =
        result?.error?.message || "An unknown error occurred.";
      window.alert(`Post creation failed. Error: ${errorMessage}`);
      setError(errorMessage);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleRegister} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="language" className="block text-gray-700">
            Language
          </label>
          <input
            type="text"
            id="language"
            placeholder="Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="text" className="block text-gray-700">
            Text
          </label>
          <textarea
            id="text"
            placeholder="Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={4}
          />
        </div>

        <div className="flex flex-col items-start space-y-2">
          <CldUploadWidget
            uploadPreset={uploadPreset}
            options={{
              sources: ["local", "url"],
              multiple: false,
              maxFiles: 1,
              styles: {
                palette: {
                  window: "#065F46",
                  sourceBg: "#15BD8E",
                  windowBorder: "#065F46",
                  tabIcon: "#ffffcc",
                  inactiveTabIcon: "#FFD1D1",
                  menuIcons: "#FFD1D1",
                  link: "#ffcc33",
                  action: "#ffcc33",
                  inProgress: "#00e6b3",
                  complete: "#a6ff6f",
                  error: "#ff1765",
                  textDark: "#3c0d68",
                  textLight: "#fcfffd",
                },
                fonts: {
                  default: null,
                  "'Kalam', cursive": {
                    url: "https://fonts.googleapis.com/css?family=Kalam",
                    active: true,
                  },
                },
              },
            }}
            onSuccess={(result) => {
              const info = result.info as CloudinaryResult;
              setImage_url(info.secure_url);
            }}
          >
            {({ open }) => (
              <button
                type="button"
                className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
                onClick={() => open()}
              >
                Upload Image
              </button>
            )}
          </CldUploadWidget>

          {image_url && (
            <img
              src={image_url}
              alt="Uploaded"
              className="mt-2 max-w-xs rounded-md"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-3 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Create Post
        </button>
      </form>

      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default PostCreate;
