import { Form } from "react-bootstrap";
import "./style.css";
const AppEmail = ({ setIsNotRecieved, isVerifyCode }) => {
  return (
    <div className="ps-3 p-md-0 mb-0 mb-md-3 forgot-password-email-container">
      <p className="text-muted mb-3">
        Enter your email and we'll send you a Verification Code
      </p>
      <Form.Label>Enter a Email</Form.Label>
      <Form.Control type="text" placeholder="Email Address" />
      {isVerifyCode && (
        <button
          className="btn btn-sm btn-dark mt-3"
          onClick={() => setIsNotRecieved(false)}
        >
          Generate Code
        </button>
      )}
    </div>
  );
};

export default AppEmail;
