import { createBrowserRouter } from "react-router-dom";
import Main from "../HomeComponent/Main/Main";
import Login from "../Authentication/Login";
import SignUp from "../Authentication/SignUp";
import Registration from "../Pages/privatePages/Registration";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
     children: [
        {
            path: 'login',
            element: <Login></Login>
        },
        {
            path: 'signUp',
            element: <SignUp></SignUp>
        },
        {
            path:'registration',
            element: <Registration></Registration>
        }
      ]
    },
  ]);

  export default router