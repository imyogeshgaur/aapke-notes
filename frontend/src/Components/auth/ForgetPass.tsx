import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const forgetPass = () => {
  const [email, setEmail] = useState<string>("");

  const forgetPasswordUser = async () => {
    if (!email) {
      const a = toast.error("Please Provide the Data !!!", {
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
        const res = await axios.post("http://localhost:3000/users/forgetPass", {
          email,
        });
        const data = await res.data;
        if (data.message === "Invalid Credentials !!!") {
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
    }
  };
  return (
    <>
       <div className="flex-auto bg-red-400 p-4 text-center">Aapke Notes</div>
      <ToastContainer autoClose={1000}/>
      <div className="text-center">
        <h1 className="mt-24 text-3xl mb-4">Forget Password</h1>
        <input
          type="text"
          className="text-center p-2 outline-gray-400 bg-gray-200"
          style={{ borderRadius: "5px" }}
          size={40}
          placeholder="Enter Your User Name or Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="text-center">
        <button
          className="text-white bg-blue-500 mt-5 p-2"
          style={{ width: "16rem", borderRadius: "5px" }}
          onClick={forgetPasswordUser}
        >
          Forget Password
        </button>
      </div>
    </>
  );
};

export default forgetPass;
