import { useState } from "react";
import { Form } from "react-bootstrap";
import { responseMessage } from "../../utils/response-message";
import "./style.css";

const AppEmail = ({
  setIsNotRecieved,
  isVerifyCode,
  data,
  handleChange,
  formik: { handleBlur, touched, errors, dirty },
  GenerateVerifyCode,
}) => {
  const [isCodeGenerating, setIsCodeGenrating] = useState(false);
  const handleGenerateEmailCode = async (input) => {
    setIsCodeGenrating(true);
    try {
      await GenerateVerifyCode(input);
      setIsNotRecieved(false);
    } catch (err) {
      console.log(
        "🚀 ~ file: index.jsx:17 ~ handleGenerateEmailCode ~ err:",
        err
      );
      responseMessage(err?.data?.code);
    } finally {
      setIsCodeGenrating(false);
    }
  };
  return (
    <div className="ps-3 p-md-0 mb-0 mb-md-3 forgot-password-email-container">
      <p className="text-muted mb-3">
        Enter your email and we'll send you a Verification Code
      </p>
      <Form.Label>
        Email <span className="text-danger">*</span>
      </Form.Label>
      <Form.Control
        type="email"
        placeholder="email"
        name="email"
        value={data.email}
        onChange={handleChange}
        onBlur={handleBlur}
        isValid={!errors.email && dirty}
        isInvalid={!!errors.email && touched.email}
      />
      <Form.Control.Feedback type="invalid" className="text-center mt-2">
        {errors.email}
      </Form.Control.Feedback>
      {isVerifyCode && (
        <button
          className="btn btn-sm btn-dark mt-3"
          onClick={() => handleGenerateEmailCode(data)}
        >
          {isCodeGenerating ? "Generating...." : "Generate Code"}
        </button>
      )}
    </div>
  );
};

export default AppEmail;
