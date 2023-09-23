import React, { useState } from "react";
import "./style.css";
import avatar from "../../assets/avatar/avatar-icon.png";
import { TbCameraPlus } from "react-icons/tb";
import AppImageCropper from "../../components/app-image-cropper";
import { convertFileToDataURL } from "../../utils/common-function";
import AppImageDialogueBox from "../../components/app-image-Dialogue-box";

const UploadProfilePicture = ({ data, formik: { setFieldValue } }) => {
  const [date, setDate] = useState(new Date());
  const [selectedImageDataURL, setSelectedImageDataURL] = useState();
  const [isOpenDialogueBox, setIsOpenDialogueBox] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setDate(new Date());

    if (selectedFile) {
      // We can Create Like this but it does not support on every browser
      // const imageURL = URL.createObjectURL(selectedFile);
      const imageURL = await convertFileToDataURL(selectedFile);
      setSelectedImageDataURL(imageURL);
      setIsOpenDialogueBox(true);
    }
  };

  return (
    <div className="text-start p-4 pt-1 pb-0">
      <div>
        <p className="fs-6 text-muted">
          Have a Favourite Selfie? Upload it now
        </p>
        <div className="signup-edit-prof">
          <img
            src={!data ? avatar : data}
            alt="profile-img"
            width="130px"
            height="130px"
            className="rounded-circle signup-edit-prof-img"
          />

          <div>
            <label htmlFor="fileInput">
              <TbCameraPlus
                size={50}
                className="signup-edit-prof__camicon1 position-absolute start-50 top-50 translate-middle"
              />
            </label>
            <input
              type="file"
              id="fileInput"
              key={date}
              style={{ display: "none" }}
              onChange={handleFileChange}
              name="myFile"
            />
          </div>
        </div>
      </div>

      <AppImageDialogueBox
        imageCropperComp={
          <AppImageCropper
            image={selectedImageDataURL}
            shape="round"
            setCroppedAreaPixels={setCroppedAreaPixels}
          />
        }
        show={isOpenDialogueBox}
        setShow={setIsOpenDialogueBox}
        setSelectedImageDataURL={setSelectedImageDataURL}
        selectedImageDataURL={selectedImageDataURL}
        croppedAreaPixels={croppedAreaPixels}
        callback={(url) => {
          setFieldValue("investor_data_url", url);
        }}
      />
    </div>
  );
};

export default UploadProfilePicture;
