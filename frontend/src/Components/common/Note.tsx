import axios from "axios";
import { useNavigate, useParams } from "react-router";
import NavBar from "../assets/NavBar";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const DeleteNotes = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const [notePriority, setNotePriority] = useState("");

  useEffect(() => {
    const token: any = localStorage.getItem("jwt");
    if (!token) {
      navigate("/");
    } else {
      axios
        .get(`http://localhost:3000/notes/note/${params.id}`)
        .then((res) => {
          setNoteDescription(res.data.noteDescription);
          setNotePriority(res.data.notePriority);
          setNoteTitle(res.data.noteTitle);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const updateNoteForUser = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3000/notes/updateNote/${params.id}`
        ,{
          noteDescription,
          notePriority,
          noteTitle
        }
      );
      const data = await res.data;
      if (data.message === "Note Not Updated !!!") {
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
  };

  const deleteNoteForUser = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/notes/deleteNote/${params.id}`
      );
      const data = await res.data;
      if (data.message === "Note Not Deleted !!!") {
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
            className="text-white bg-yellow-500 mt-5 p-2"
            style={{ width: "16rem", borderRadius: "5px" }}
            onClick={updateNoteForUser}
          >
            Update Note
          </button>
        </div>
        <div className="text-center">
          <button
            className="text-white bg-red-500 mt-5 p-2"
            style={{ width: "16rem", borderRadius: "5px" }}
            onClick={deleteNoteForUser}
          >
            Delete Note
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteNotes;
