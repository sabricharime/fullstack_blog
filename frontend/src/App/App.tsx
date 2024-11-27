import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Home from "./Pages/home/Home";
import { NextUIProvider } from "@nextui-org/react";
import Auth from "./Pages/auth/Auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Protected from "./Protect Routes/Protected";
import Posts from "./Pages/posts/Posts";
import SinglePost from "./Pages/posts/SinglePost";
import AddPost from "./Pages/posts/AddPost";
import Profile from "./Pages/profile/Profile";
import Dashboard from "./Pages/dashboard/Dashboard";
import ManageUsers from "./Pages/dashboard/pages/ManageUsers";
import ManagePosts from "./Pages/dashboard/pages/ManagePosts";
import ManageMessages from "./Pages/dashboard/pages/ManageMessages";
import Other from "./Pages/dashboard/pages/Other";
import DashboardHome from "./Pages/dashboard/pages/DashboardHome";
import AdminRoute from "./Protect Routes/AdminRoute";
import UserSetting from "./Pages/dashboard/pages/UserSetting";
import CreateNewUser from "./Pages/dashboard/pages/CreateNewUser";
import { useAppSelector } from "../redux/hooks/hooks";

const Root = () => {
  return (
    <div className="min-h-[100vh]  min-w-full  flex flex-col bg-background  ">
      <Header />
      <div className="container  m-auto max-w-[1024px] ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: (
          <Protected>
            <Home />
          </Protected>
        ),
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/posts",
        element: (
          <Protected>
            <Posts />
          </Protected>
        ),
      },
      {
        path: "/bannedPage",
        element: <h1>Go Home You Are Banned </h1>,
      },
      {
        path: "/posts/:id",
        element: (
          <Protected>
            <SinglePost />
          </Protected>
        ),
      },
      {
        path: "/posts/create",
        element: (
          <Protected>
            <AddPost />
          </Protected>
        ),
      },
      {
        path: "/profiles/:id",
        element: (
          <Protected>
            <Profile />
          </Protected>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        ),
        children: [
          {
            path: "/dashboard",
            element: <DashboardHome />,
          },
          {
            path: "manage_users",
            element: <ManageUsers />,
            children: [
              {
                path: "user_setting",
                element: <UserSetting />,
              },
              {
                path: "user_create",
                element: <CreateNewUser />,
              },
            ],
          },
          {
            path: "manage_posts",
            element: <ManagePosts />,
          },
          {
            path: "manage_messages",
            element: <ManageMessages />,
          },
          {
            path: "other",
            element: <Other />,
          },
        ],
      },
      {
        path: "*",
        element: <h1>Not Found</h1>,
      },
    ],
  },
]);

const App = () => {
  const {darkMode} = useAppSelector(state=>state.config)
  return (
    <NextUIProvider className={`${darkMode?"dark":"light"} bg-background text-foreground`}>
      <RouterProvider router={router} />
      <ToastContainer />
    </NextUIProvider>
  );
};

export { App };
