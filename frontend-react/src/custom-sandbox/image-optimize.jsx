import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import heavyImage from "../assets/mock-image/sample_5184×3456.jpeg";

const ImageOptimize = () => {
  const [newImage, setNewImage] = useState();

  const [urlimage, setUrlImage] = useState();

  const [apiData, setAPiData] = useState([]);

  const [cloudImage, setCloudImage] = useState();
  const [resizeCloudImage, setResizeCloudImage] = useState();
  console.log(
    "🚀 ~ file: image-optimize.jsx:13 ~ ImageOptimize ~ cloudImage:",
    cloudImage
  );

  useEffect(() => {
    handleGenerateImage();
  }, []);

  const canvasRef = useRef();

  const handleSelect = async (e) => {
    const file = e.target.files[0];
    console.log(
      "🚀 ~ file: image-optimize.jsx:20 ~ handleSelect ~ file:",
      file
    );

    if (file) {
      optimizeAndSetImage(file);
      setUrlImage(file);
    }
  };

  const optimizeAndSetImage = (file) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = canvasRef.current;
      const targetWidth = 500;
      const ratio = targetWidth / img.width;

      canvas.width = targetWidth;
      canvas.height = img.height * ratio;

      const context = canvas.getContext("2d");
      context.drawImage(img, 0, 0, canvas.width, canvas.height);

      const optimizedDataUrl = canvas.toDataURL("image/jpeg", 90);
      setNewImage(optimizedDataUrl);
      console.time("time");
      optimizedURLtoFile(optimizedDataUrl);
      console.timeEnd("time");
    };
  };

  const optimizedURLtoFile = (url) => {
    let arr = url.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let data = arr[1];

    let dataStr = atob(data);

    let n = dataStr.length;

    let dataArr = new Uint8Array(n);

    for (let n = dataStr.length - 1; n >= 0; n--) {
      dataArr[n] = dataStr.charCodeAt(n);
    }

    let file = new File([dataArr], "File.jpg", { type: mime });
    return URL.createObjectURL(file);
  };

  if (newImage) {
    fetch(newImage)
      .then((response) => response.blob())
      .then((blob) => {
        const fileSizeInBytes = blob.size;
        const fileSizeInKB = fileSizeInBytes / 1024;

        console.log(`File size: ${fileSizeInKB.toFixed(2)} KB`);
      })
      .catch((error) => {
        console.error("Error fetching the image:", error);
      });
  }

  const handleGenerateImage = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image_url:
          "https://i.pinimg.com/originals/ec/b9/2d/ecb92d18c7855c986a5571c1b6f7cad2.jpg",
      }),
    };
    const result = await fetch(
      "http://localhost:5000/api/user/get-image-url",
      requestOptions
    );
    const result1 = await result.json();
    setAPiData(result1);
  };

  const handleUploadCloudinary = async () => {
    const formData = new FormData();
    formData.append("myFile", urlimage);

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/user/upload-cloudinary-image",
        requestOptions
      );

      const result = await response.json();
      console.log(
        "🚀 ~ file: image-optimize.jsx:126 ~ handleUploadCloudinary ~ result:",
        result
      );

      setCloudImage(result.orginal_image.secure_url);
      setResizeCloudImage(result.resized_image);
    } catch (err) {
      console.log(
        "🚀 ~ file: image-optimize.jsx:102 ~ handleUploadCloudinary ~ err:",
        err
      );
    }
  };

  const handleDeleteCloudinary = async () => {
    const requestOptions = {
      method: "POST",
      body: {
        public_id: "new image",
      },
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/user/delete-cloudinary-image",
        requestOptions
      );
    } catch (err) {
      console.log(
        "🚀 ~ file: image-optimize.jsx:102 ~ handleUploadCloudinary ~ err:",
        err
      );
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleUploadCloudinary}
        className="btn btn-primary me-4"
      >
        Cloudinary upload
      </button>
      <button
        type="button"
        onClick={handleDeleteCloudinary}
        className="btn btn-sm btn-danger ms-3 me-3"
      >
        Delte Asset
      </button>
      <input type="file" onChange={handleSelect} name="myFile" />

      <h1>Orginalk Cloud Image</h1>
      <img src={cloudImage} width={100} height={100} />
      <h1>Resized Image</h1>
      <img src={resizeCloudImage} width={100} height={100} />
      {newImage && <img src={newImage} alt="New Image" />}
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {urlimage && <img src={urlimage} width={1000} height={300} />}
      {/* <button
        className="btn btn-lg btn-primary ms-3"
        onClick={handleGenerateImage}
      >
        Click Here{" "}
      </button> */}
      {apiData.length != 0 && (
        <div className="img-api">
          {apiData.map((obj) => (
            <div className="m-2">
              <img
                src={obj}
                width={50}
                height={50}
                className="friends_profile--img"
              />
            </div>
          ))}
        </div>
      )}
      {Array.from({ length: 11 }, (_, i) => (
        <img
          className="m-2"
          key={i}
          src={heavyImage}
          alt={`Image ${i}`}
          width={100}
          height={100}
        />
      ))}
      <img
        src="https://res.cloudinary.com/dcbw3cocz/image/upload/v1693891224/rsj3ymwtnhlwjqwzus4k.jpg"
        width={500}
        height={500}
      />
    </div>
  );
};

export default ImageOptimize;
