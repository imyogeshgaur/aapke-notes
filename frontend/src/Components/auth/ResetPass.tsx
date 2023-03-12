import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useParams, useNavigate } from "react-router";

const ResetPass = () => {
  const [password, setPassword] = useState<string>("");
  const [cPassword, setCPassword] = useState<string>("");
  const params = useParams();
  const navigate = useNavigate();

  const resetPasswordUser = async () => {
    if (!password || !cPassword) {
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
      if (password === cPassword) {
        try {
          const res = await axios.post(
            `http://localhost:3000/users/resetPass/${params.id}`,
            {
              password,
            }
          );
          const data = await res.data;
          if (data.message === "Password Reset Successfully !!!") {
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
          } else {
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
          }
        } catch (error) {
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
        const a = toast.error("Password Don't Match !!!", {
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
        <h1 className="mt-24 text-3xl mb-4">Reset Password</h1>
        <input
          type="password"
          className="text-center p-2 outline-gray-400 bg-gray-200"
          style={{ borderRadius: "5px" }}
          size={40}
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="text-center mt-4">
        <input
          type="password"
          className="text-center p-2 outline-gray-400 bg-gray-200"
          style={{ borderRadius: "5px" }}
          size={40}
          placeholder="Confirm Your Password"
          value={cPassword}
          onChange={(e) => setCPassword(e.target.value)}
        />
      </div>
      <div className="text-center">
        <button
          className="text-white bg-blue-500 mt-5 p-2"
          style={{ width: "16rem", borderRadius: "5px" }}
          onClick={resetPasswordUser}
        >
          Reset Password
        </button>
      </div>
    </>
  );
};

export default ResetPass;
