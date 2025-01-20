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
import AdminDashboard from "../Pages/privatePages/AdminAction/AdminDashboard";
import AdminHome from "../Pages/privatePages/AdminAction/AdminDashHome/AdminHome";
import AllUsers from "../Pages/privatePages/AdminAction/AllUsers";



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
    },
    {
        path: 'AdminDashboard',
        element: <AdminDashboard></AdminDashboard>,
        children: [
            {
                index: true,
                element: <AdminHome></AdminHome>,
                loader: async () => {
                    try {
                        const [usersResponse, donationRequestsResponse] = await Promise.all([
                            fetch('http://localhost:5000/user'),
                            fetch('http://localhost:5000/donationRequests'),
                        ]);
                
                        if (!usersResponse.ok || !donationRequestsResponse.ok) {
                            throw new Error('Failed to fetch data');
                        }
                
                        const users = await usersResponse.json();
                        const donationRequests = await donationRequestsResponse.json();
                
                        return { users, donationRequests };
                    } catch (error) {
                        console.error('Error fetching data:', error);
                        throw error; // React Router will handle this and display an error page
                    }
                }
                
            },
            {
                path: 'allUsers',
                element: <AllUsers></AllUsers>,
                loader: () => fetch('http://localhost:5000/user')
            }
        ]
    }
]);

export default router