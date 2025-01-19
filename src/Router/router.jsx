import { createBrowserRouter } from "react-router-dom";
import Main from "../HomeComponent/Main/Main";
import Login from "../Authentication/Login";
import SignUp from "../Authentication/SignUp";
import Registration from "../Pages/privatePages/Registration";
import DashBoard from "../Pages/privatePages/Dashboard/DashBoard";
import ProfilePage from "../Pages/privatePages/Dashboard/ProfilePage";
import DashboardHome from "../Pages/privatePages/Dashboard/DashboardHome/DashboardHome";
import UpdateDonation from "../Pages/privatePages/Dashboard/DashboardHome/UpdateDonation";
import ViewDetails from "../Pages/privatePages/Dashboard/DashboardHome/ViewDetails";
import CreateRequest from "../Pages/privatePages/Dashboard/CreateRequest/CreateRequest";
import MyDonationReq from "../Pages/privatePages/Dashboard/MyDonation/MyDonationReq";


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
                path: 'registration',
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
                loader: () => fetch('http://localhost:5000/donationRequests')
            },
            {
                path: 'profile',
                element: <ProfilePage></ProfilePage>,
                loader: () => fetch('http://localhost:5000/user')
            },
            {
                path: 'updateDonation/:id',
                element: <UpdateDonation></UpdateDonation>,
                loader: ({ params }) => fetch(`http://localhost:5000/donationRequests/${params.id}`)
            },
            {
                path: 'viewDetails/:id',
                element: <ViewDetails></ViewDetails>,
                loader: ({ params }) => fetch(`http://localhost:5000/donationRequests/${params.id}`)
            },
            {
                path: 'createRequest',
                element: <CreateRequest></CreateRequest>
            },
            {
                path:'myDonationReq',
                element: <MyDonationReq></MyDonationReq>,
                loader: () => fetch('http://localhost:5000/donationRequests')
            }
        ]
    }
]);

export default router