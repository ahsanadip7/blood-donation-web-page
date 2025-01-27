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
import AllBloodDonation from "../Pages/privatePages/AdminAction/AllBloodDonation";
import ContentManagement from "../Pages/privatePages/AdminAction/Contentmanagement";
import AddBlog from "../Pages/privatePages/AdminAction/AdminDashHome/AddBlog";
import VolunteerDash from "../Pages/privatePages/VolunteerAction/VolunteerDash";
import VolunteerHome from "../Pages/privatePages/VolunteerAction/OtherRoutes/VolunteerHome";
import AllBloodDonationVol from "../Pages/privatePages/VolunteerAction/OtherRoutes/AllBloodDonationVol";
import ContentManagementVol from "../Pages/privatePages/VolunteerAction/OtherRoutes/ContentmanagementVol";
import AddBlogVol from "../Pages/privatePages/VolunteerAction/OtherRoutes/AddBlogVol";
import Blogs from "../HomeComponent/Main/OtherRoutes/Blogs";
import BlogsDetails from "../HomeComponent/Main/OtherRoutes/BlogsDetails";
import Home from "../HomeComponent/Main/Home";
import SearchPage from "../HomeComponent/Main/SearchPage";
import BloodDonationReq from "../HomeComponent/Main/BloodDonationReq";
import ReqDetails from "../HomeComponent/Main/ReqDetails";
import FundingPage from "../HomeComponent/Main/FundingPage";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
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
            },
            {
                path: 'blog',
                element: <Blogs></Blogs>,
                loader: () => fetch('https://assignment-12-server-omega-six.vercel.app/blogs')
            },
            {
                path: 'blogDetails/:id',
                element: <BlogsDetails></BlogsDetails>,
                loader: ({ params }) => fetch(`https://assignment-12-server-omega-six.vercel.app/blogs/${params.id}`)

            },
            {
                path: 'donation-requests/donationDetails/:id',
                element: <ReqDetails></ReqDetails>,
                loader: ({ params }) => fetch(`https://assignment-12-server-omega-six.vercel.app/donationRequests/${params.id}`)

            },
            {
                path: 'funding',
                element: <FundingPage></FundingPage>
            },

            {
                path: "search",
                element: <SearchPage></SearchPage>,
                loader: () => fetch('https://assignment-12-server-omega-six.vercel.app/donationRequests')
            },
            {
                path: 'donation-requests',
                element: <BloodDonationReq></BloodDonationReq>,
                loader: () => fetch('https://assignment-12-server-omega-six.vercel.app/donationRequests')
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
                loader: () => fetch('https://assignment-12-server-omega-six.vercel.app/donationRequests')
            },
            {
                path: 'profile',
                element: <ProfilePage></ProfilePage>,
                loader: () => fetch('https://assignment-12-server-omega-six.vercel.app/user')
            },
            {
                path: 'updateDonation/:id',
                element: <UpdateDonation></UpdateDonation>,
                loader: ({ params }) => fetch(`https://assignment-12-server-omega-six.vercel.app/donationRequests/${params.id}`)
            },
            {
                path: 'viewDetails/:id',
                element: <ViewDetails></ViewDetails>,
                loader: ({ params }) => fetch(`https://assignment-12-server-omega-six.vercel.app/donationRequests/${params.id}`)
            },
            {
                path: 'createRequest',
                element: <CreateRequest></CreateRequest>
            },
            {
                path:'myDonationReq',
                element: <MyDonationReq></MyDonationReq>,
                loader: () => fetch('https://assignment-12-server-omega-six.vercel.app/donationRequests')
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
                            fetch('https://assignment-12-server-omega-six.vercel.app/user'),
                            fetch('https://assignment-12-server-omega-six.vercel.app/donationRequests'),
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
                loader: () => fetch('https://assignment-12-server-omega-six.vercel.app/user')
            },
            {
                path: 'allDonation',
                element: <AllBloodDonation></AllBloodDonation>,
                loader: ()=>fetch('https://assignment-12-server-omega-six.vercel.app/donationRequests')
            },
            {
                path:'contentManagement',
                element:<ContentManagement></ContentManagement>,
                loader: ()=>fetch('https://assignment-12-server-omega-six.vercel.app/blogs')

            },
            {
                path: 'contentManagement/addBlog',
                element: <AddBlog></AddBlog>
            }
        ]
    },
    {
        path:'volunteerDashboard',
        element: <VolunteerDash></VolunteerDash>,
        children: [
            {
                index: true,
                element: <VolunteerHome></VolunteerHome> ,
                loader: async () => {
                    try {
                        const [usersResponse, donationRequestsResponse] = await Promise.all([
                            fetch('https://assignment-12-server-omega-six.vercel.app/user'),
                            fetch('https://assignment-12-server-omega-six.vercel.app/donationRequests'),
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
                path: 'allDonation',
                element: <AllBloodDonationVol></AllBloodDonationVol>,
                loader: ()=>fetch('https://assignment-12-server-omega-six.vercel.app/donationRequests')
            },
            {
                path: 'contentManagement',
                element: <ContentManagementVol />,
                loader: async () => {
                  const res = await fetch('https://assignment-12-server-omega-six.vercel.app/blogs');
                  if (!res.ok) {
                    throw new Error('Failed to fetch blogs');
                  }
                  const blogs = await res.json();
                  return blogs;
                }
              },              
            {
                path: 'contentManagement/addBlog',
                element: <AddBlogVol></AddBlogVol>
            }
        ]
    }
]);

export default router