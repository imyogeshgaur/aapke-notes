import { useNavigate } from "react-router";
import NavBar from "../assets/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Card from "../assets/Card";

const Home = () => {
  const navigate = useNavigate();
  const token: any = localStorage.getItem("jwt");
  const [data, setData] = useState([]);
  const objToken: any = jwt_decode(token);

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      axios
        .get(`http://localhost:3000/notes/allNotes/${objToken.userId}`,{
          headers:{
            Authorization:token
          }
        })
        .then((res) => res.data)
        .then((data) => setData(data))
        .catch((err) => {});
    }
  }, []);

  return (
    <>
      <NavBar />
      <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {data.map((val: any) => {
          return (
            <Card
              noteDescription={val.noteDescription}
              notePriority={val.notePriority}
              noteTitle={val.noteTitle}
              noteId={val.noteId}
            />
          );
        })}
      </div>
    </>
  );
};

export default Home;
