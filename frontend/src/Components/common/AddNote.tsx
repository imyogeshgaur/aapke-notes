import { useState,useEffect } from "react";
import NavBar from "../assets/NavBar";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router";

const AddNote = () => {
  const token: any = localStorage.getItem("jwt");
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [noteDescription, setNoteDescription] = useState<string>("");
  const [notePriority, setNotePriority] = useState<string>("");
  const objToken: any = jwt_decode(token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [])
  
  const backAStep = ()=>{
    window.history.back();
  }

  const addNoteOfUser = async () => {
    const res = await axios.post("http://localhost:3000/notes/createNote", {
      noteDescription,
      notePriority,
      noteTitle,
      creatorId: objToken.userId,
    });
    const data = await res.data;
    if (data.message === "Please Fill All Fields !!!") {
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
          navigate("/notes")
        }, 2000);
      }
    }
  };
  return (
    <>
      <NavBar />
      <ToastContainer autoClose={1000} />
      <div className="text-center">
        <h1 className="mt-24 text-3xl mb-4">Add Note</h1>
        <input
          type="email"
          className="text-center p-2 outline-gray-500 bg-gray-200"
          style={{ borderRadius: "5px" }}
          size={40}
          placeholder="Add Note Title"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
        />
      </div>
      <div className="text-center">
        <textarea
          className="text-center p-2 mt-5 outline-gray-500 bg-gray-200"
          style={{ borderRadius: "5px" }}
          rows={4}
          cols={41}
          placeholder="Enter Your Description"
          value={noteDescription}
          onChange={(e) => setNoteDescription(e.target.value)}
        />
      </div>
      <div className="text-center">
        <select
          className="text-center p-2 mt-5 outline-gray-500 bg-gray-200"
          style={{ width: "22rem" }}
          value={notePriority}
          onChange={(e) => setNotePriority(e.target.value)}
        >
          <option value="" disabled selected>
            Select Priority of note
          </option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <div className="text-center">
          <button
            className="text-white bg-blue-500 mt-5 p-2"
            style={{ width: "16rem", borderRadius: "5px" }}
            onClick={addNoteOfUser}
          >
            Add Note
          </button>
        </div>
        <div className="text-center">
          <button
            className="text-white bg-green-500 mt-5 p-2"
            style={{ width: "16rem", borderRadius: "5px" }}
            onClick={backAStep}
          >
            Back 
          </button>
        </div>
      </div>
    </>
  );
};

export default AddNote;
