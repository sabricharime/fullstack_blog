import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";

const CustomFileUpload = () => {
  const [fileName, setFileName] = useState("Upload Avatar");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("Upload Avatar");
    }
  };

  return (
    <div className="file-upload flex ">
      <label className="cursor-pointer p-3 fill-primary flex  items-center gap-2">
        <FaUpload size={26} className="fill-primary" />
        <input type="file" onChange={handleFileChange} className="hidden" />
        <span>{fileName}</span>
      </label>
    </div>
  );
};

export default CustomFileUpload;
