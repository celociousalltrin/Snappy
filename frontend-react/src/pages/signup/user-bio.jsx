import React from "react";
import AppTextArea from "../../components/app-text-area";

const UserBio = ({
  data: { about },
  handleChange,
  formik: { handleBlur, errors, touched },
}) => {
  return (
    <div>
      <p className="text-muted mb-0">
        What makes you special? Don't think too hard, just have fun with it
      </p>
      <AppTextArea
        rows={3}
        cols={60}
        isNormalTextArea
        type={1}
        handleChange={handleChange}
        name="about"
        handleBlur={handleBlur}
        errors={errors}
        touched={touched.about}
        value={about}
      />
    </div>
  );
};

export default UserBio;
