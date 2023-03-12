import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const SignUp = () => {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const signUpUser = async () => {
    try {
      const res = await axios.post("http://localhost:3000/users/signup", {
        userName,
        email,
        password,
      });
      const data = await res.data;
      if (data.message === "Please Fill ALl Data !!!") {
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
      } else if (data.message === "User already exist !!!") {
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
            navigate("/");
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
  };
  return (
    <>
      <div className="flex-auto bg-red-400 p-4 text-center">Aapke Notes</div>
      <ToastContainer autoClose={1000} />
      <div className="text-center">
        <h1 className="mt-24 text-3xl mb-4">Register Here</h1>
        <input
          type="text"
          className="text-center p-2 outline-gray-400 bg-gray-200"
          style={{ borderRadius: "5px" }}
          size={40}
          placeholder="Enter Your User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="text-center">
        <input
          type="email"
          className="text-center p-2 mt-5 outline-gray-400 bg-gray-200"
          style={{ borderRadius: "5px" }}
          size={40}
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="text-center">
        <input
          type="password"
          className="text-center p-2 mt-5 outline-gray-400 bg-gray-200"
          style={{ borderRadius: "5px" }}
          size={40}
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="text-center">
        <button
          className="text-white bg-blue-500 mt-5 p-2"
          style={{ width: "16rem", borderRadius: "5px" }}
          onClick={signUpUser}
        >
          Register Here
        </button>
      </div>
      <div className="text-center">
        <Link to="/">
          <button
            className="text-white bg-green-500 mt-5 p-2"
            style={{ width: "16rem", borderRadius: "5px" }}
          >
            Login Here
          </button>
        </Link>
      </div>
    </>
  );
};

export default SignUp;
