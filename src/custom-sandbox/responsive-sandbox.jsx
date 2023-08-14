import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { BsThreeDots } from "react-icons/bs";

function BasicExample() {
  const styleFn = (input) => {
    switch (input) {
      case 1:
        return "text-primary fs-6 ";
      case 2:
        return "text-secondary";
      default:
        return "text-danger";
    }
  };
  return (
    <div>
      <h1 className={styleFn(1)}>Hello world</h1>
    </div>
  );
}

export default BasicExample;
