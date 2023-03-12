import { useLocation } from "react-router";
import { BsPersonFill } from "react-icons/bs";
import { MdAddBox } from "react-icons/md";
import { Link } from "react-router-dom";

const NavBar = () => {
  const token: any = localStorage.getItem("jwt");
  const location = useLocation();

  if (location.pathname === "/notes") {
    return (
      <>
        <div className="flex bg-red-400 p-4">
          <div className="mx-auto">Aapke Notes</div>
          <div className="me-auto">
            <Link to="/addNote">
              <MdAddBox size={27} />
            </Link>
          </div>
          <div className="me-auto ml-3">
            <BsPersonFill size={27} />
          </div>
        </div>
      </>
    );
  } else if (location.pathname === "/addNote") {
    return (
      <>
        <div className="flex bg-red-400 p-4">
          <div className="mx-auto">Aapke Notes</div>
          <div className="me-auto ml-3">
            <BsPersonFill size={27} />
          </div>
        </div>
      </>
    );
  } else if (token) {
    return (
      <>
        <div className="flex bg-red-400 p-4">
          <div className="mx-auto">Aapke Notes</div>
          <div className="me-auto">
            <Link to="/addNote">
              <MdAddBox size={27} />
            </Link>
          </div>
          <div className="me-auto ml-3">
            <BsPersonFill size={27} />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex-auto bg-red-400 p-4 text-center">Aapke Notes</div>
      </>
    );
  }
};

export default NavBar;
