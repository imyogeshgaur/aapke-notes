import { Link } from "react-router-dom";

const Card = (props: any) => {
  return (
    <>
      {props.notePriority === "Low" ? (
        <div className="rounded overflow-hidden shadow-lg bg-green-100">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{props.noteTitle}</div>
            <p className="text-gray-700 text-base mb-3">
              {props.noteDescription.substr(0, 19)}...
            </p>
          </div>
          <div className="px-6 pb-2">
            <Link to={`/note/${props.noteId}`}>
              <button className="text-white bg-green-500 p-2 rounded-lg">
                Read Complete Note
              </button>
            </Link>
          </div>
        </div>
      ) : props.notePriority === "Medium" ? (
        <div className="rounded overflow-hidden shadow-lg bg-yellow-100">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{props.noteTitle}</div>
            <p className="text-gray-700 text-base mb-3">
              {props.noteDescription.substr(0, 19)}...
            </p>
          </div>
          <div className="px-6 pb-2">
            <Link to={`/note/${props.noteId}`}>
              <button className="text-white bg-yellow-500 p-2 rounded-lg">
                Read Complete Note
              </button>
            </Link>
          </div>
        </div>
      ) : props.notePriority === "High" ? (
        <div className="rounded overflow-hidden shadow-lg bg-red-100">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{props.noteTitle}</div>
            <p className="text-gray-700 text-base mb-3">
              {props.noteDescription.substr(0, 19)}...
            </p>
          </div>
          <div className="px-6 pb-2">
            <Link to={`/note/${props.noteId}`}>
              <button className="text-white bg-red-500 p-2 rounded-lg">
                Read Complete Note
              </button>
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default Card;
