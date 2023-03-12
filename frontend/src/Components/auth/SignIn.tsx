import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const token:any = localStorage.getItem("jwt")
    if(token){
      navigate("/notes")
    }
  }, [])
  

  const signInUser = async () => {
    if (!email || !password) {
      const a = toast.error("Please Fill All Data !!!", {
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
      try {
        const res = await axios.post("http://localhost:3000/users/login", {
          email,
          password,
        });
        const data = await res.data;
        if (data.message) {
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
        } else if (data.token) {
          localStorage.setItem("jwt", data.token);
          navigate("/notes");
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
    }
  };

  return (
    <>
      <div className="flex-auto bg-red-400 p-4 text-center">Aapke Notes</div>
      <ToastContainer autoClose={1000} />
      <div className="text-center">
        <h1 className="mt-24 text-3xl mb-4">Login Here</h1>
        <input
          type="email"
          className="text-center p-2 outline-gray-500 bg-gray-200"
          style={{ borderRadius: "5px" }}
          size={40}
          placeholder="Enter Email or User Name"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="text-center">
        <input
          type="password"
          className="text-center p-2 mt-5 outline-gray-500 bg-gray-200"
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
          onClick={signInUser}
        >
          Login Here
        </button>
      </div>
      <div className="text-center">
        <Link to="/signup">
          <button
            className="text-white bg-green-500 mt-5 p-2"
            style={{ width: "16rem", borderRadius: "5px" }}
          >
            Create an Account
          </button>
        </Link>
      </div>
      <div className="text-center mt-3">
        Forget Password ? &nbsp;
        <Link to="/forgetPassword" className="text-red-400">
          Click here
        </Link>
      </div>
    </>
  );
};

export default SignIn;
