import { createBrowserRouter } from "react-router-dom";
import Main from "../HomeComponent/Main/Main";
import Login from "../Authentication/Login";
import SignUp from "../Authentication/SignUp";
import Registration from "../Pages/privatePages/Registration";
import DashBoard from "../Pages/privatePages/Dashboard/DashBoard";
import ProfilePage from "../Pages/privatePages/Dashboard/ProfilePage";
import DashboardHome from "../Pages/privatePages/Dashboard/DashboardHome/DashboardHome";

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
    {
        path: 'dashboard',
        element: <DashBoard></DashBoard>,
        children: [
            {
                index: true,
                element: <DashboardHome></DashboardHome>,
                loader: ()=> fetch('http://localhost:5000/bloodDonor')
            },
            {
                path: 'profile',
                element: <ProfilePage></ProfilePage>,
                loader: () => fetch('http://localhost:5000/user')
            }
        ]
    }
  ]);

  export default router