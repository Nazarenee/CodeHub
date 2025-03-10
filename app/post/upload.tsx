"use client";
import React, { useState } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";

interface CloudinaryResult {
  public_id: string;
}

const UploadPage = () => {
  const [publicId, setPublicId] = useState("");
  return (
    <>
      <CldUploadWidget
        uploadPreset="cryng4"
        options={{
          sources: ["local", "url"],
          multiple: false,
          maxFiles: 5,
          styles: {
            palette: {
              window: "#5D005D",
              sourceBg: "#3A0A3A",
              windoßwBorder: "#AD5BA3",
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
          console.log("Upload success:", result.info);
          const info = result.info as CloudinaryResult;
          setPublicId(info.public_id);
        }}
      >
        {({ open }) => (
          <button className="btn btn-primary" onClick={() => open()}>
            Upload
          </button>
        )}
      </CldUploadWidget>
    </>
  );
};

export default UploadPage;
