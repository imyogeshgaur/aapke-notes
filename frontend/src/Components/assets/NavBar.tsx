import { useLocation, useNavigate } from "react-router";
import { BsPersonFill } from "react-icons/bs";
import { MdAddBox } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const NavBar = () => {
  const token: any = localStorage.getItem("jwt");
  const location = useLocation();
  const objToken: any = jwt_decode(token);
  const navigate = useNavigate();
  
  const signOutUser = () => {
    const conf = confirm("Do you want to logout ?");
    if (conf) {
      localStorage.removeItem("jwt");
      navigate("/");
    } else {
      window.location.reload();
    }
  };

  const deleteAllNotes = async () => {
    const conf = confirm("Are You Sure To Delete All Notes ?");
    if (conf) {
      try {
        const res = await axios.delete(
          `http://localhost:3000/notes/allNotes/${objToken.userId}`
        );
        const data = await res.data;
        if (data.message === "Notes not Deleted !!!") {
          const a = toast.error(data.message, {
            position: toast.POSITION.TOP_CENTER,
            closeOnClick: false,
            closeButton: false,
            style: {
              color: "red",
              backgroundColor: "rgb(255, 206, 206)",
            },
          });
          if (a == 1) {
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        } else {
          const a = toast.success(data.message, {
            position: toast.POSITION.TOP_CENTER,
            closeOnClick: false,
            closeButton: false,
            style: {
              color: "green",
              backgroundColor: "rgb(183, 248, 183)",
            },
          });
          if (a == 1) {
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        }
      } catch (error) {
        console.log(error);
        const a = toast.error("Network Error !!!", {
          position: toast.POSITION.TOP_CENTER,
          closeOnClick: false,
          closeButton: false,
          style: {
            color: "red",
            backgroundColor: "rgb(255, 206, 206)",
          },
        });
        if (a == 1) {
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      }
    } else {
      window.location.reload();
    }
  };

  if (location.pathname === "/notes") {
    return (
      <>
        <ToastContainer autoClose={1000} />
        <div className="flex bg-red-400 p-4">
          <div className="mx-auto">Aapke Notes</div>
          <div className="me-auto">
            <Link to="/addNote">
              <MdAddBox size={27} title="Add a note" />
            </Link>
          </div>
          <div className="me-auto ml-3">
            <BsPersonFill size={27} onClick={signOutUser} />
          </div>
          <div className="me-auto ml-3">
            <MdDelete
              size={27}
              title="Delete all notes"
              onClick={deleteAllNotes}
            />
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
            <BsPersonFill size={27} onClick={signOutUser} />
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
              <MdAddBox size={27} title="Add a note" />
            </Link>
          </div>
          <div className="me-auto ml-3">
            <BsPersonFill size={27} onClick={signOutUser} />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
      
      </>
    );
  }
};

export default NavBar;
