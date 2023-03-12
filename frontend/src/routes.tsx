import { lazy } from "react";

const SignIn = lazy(() => import("./Components/auth/SignIn"));
const SignUp = lazy(() => import("./Components/auth/SignUp"));
const ForgetPass = lazy(() => import("./Components/auth/ForgetPass"));
const ResetPass = lazy(() => import("./Components/auth/ResetPass"));
const Home = lazy(() => import("./Components/common/Home"));
const AddNote = lazy(()=>import("./Components/common/AddNote"))
const Note = lazy(()=>import("./Components/common/Note"))

const allRoutes = [
  { path: "/", element: <SignIn /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/forgetPassword", element: <ForgetPass /> },
  { path: "/resetPassword/:id", element: <ResetPass /> },

  //? notes routes
  { path: "/notes", element: <Home /> },
  { path: "/addNote", element: <AddNote /> },
  { path: "/note/:id", element: <Note /> },
];

export default allRoutes;
