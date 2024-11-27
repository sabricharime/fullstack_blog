import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  Button,
  Dropdown,
  Avatar,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Switch,

} from "@nextui-org/react";
import { IoIosLogOut, IoLogoEuro, IoMdAdd } from "react-icons/io";
import { FaSun, FaMoon } from "react-icons/fa";

import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser, setDarkMode, setIsAuth } from "../../redux/slices/config.slice";
import {
  useEditProfileMutation,
  useLazyGetMeQuery,
  useLogoutMutation,
} from "../../redux/api/API";
import { toast } from "react-toastify";

function Header() {
  const isAuth = useAppSelector((state) => state.config.isAuth);
  const [edit, { data }] = useEditProfileMutation();
  const dispatch = useAppDispatch();
  const [out] = useLogoutMutation();
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    avatar: "",
    id: 0,
    role: "USER",
    banned: false,
  });
  const [getMyProfile,{data:profileData}] = useLazyGetMeQuery();

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const login = () => {
    navigate("/auth");
  };

  const logout = async () => {
    dispatch(setIsAuth(false));
    await out();
  };

  const createPost = () => navigate("/posts/create");
  const dashboard = () => navigate("/dashboard");
  useEffect(()=>{
    getMyProfile({}).unwrap()
  },[getMyProfile])
  useEffect(()=>{
    setOpen(prev=>prev)
  }, [open])


  useEffect(() => {
    if (isAuth) {
      (async () => {
        try {
          const myProfile = await getMyProfile({}).unwrap();

          if (myProfile.role === "ADMIN") {
            localStorage.setItem("isAdmin", JSON.stringify(true));
          }

          setProfile((prev) => ({
            ...prev,
            username: myProfile.username,
            email: myProfile.email,
            avatar: myProfile.avatar,
            id: myProfile.id, // add id to profile
            role: myProfile.role,
            banned: myProfile.banned,
          }));

          dispatch(
            setCurrentUser({
              username: myProfile.username,
              email: myProfile.email,
              avatar: myProfile.avatar,
              id: +myProfile.id,
              role: myProfile.role,
              banned: myProfile.banned,
            })
          );
        } catch (error) {
          if (error) {
            const err = error as {
              data: { message: string; statusCode: number };
            };
            dispatch(setIsAuth(false));
            toast.error(err.data.message as string, {
              position: "bottom-left",
            });
            logout();
            localStorage.clear();
          }
        }
      })();
    }
  }, [isAuth, edit, data, localStorage , profileData]);



  return (
    <Navbar onMenuOpenChange={setOpen} isMenuOpen={open}>
      <NavbarBrand>
        <h5 className="text-primary">Weelive</h5>
      </NavbarBrand>

      <NavbarContent className=" hidden sm:flex ">
        <NavbarItem>
          <Link to="/">
            <Button variant="light">Home</Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/posts">Posts</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to={"/profiles/" + profile.id}>Profile</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Switch
          defaultSelected
          size="sm"
          color="primary"
          startContent={<FaSun/>}
          endContent={<FaMoon/>}
          onChange={(e:ChangeEvent<HTMLInputElement>)=>{
            return dispatch(setDarkMode(e.target.checked));
          }}
          >

          </Switch>
        </NavbarItem>
        <NavbarItem>

          {isAuth ? (
            <div className="flex gap-4 items-center ">
              <h6>
                <small>Welcome {profile.username}</small>
              </h6>
              <Dropdown placement="top-start">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    src={profile.avatar}
                  />
                </DropdownTrigger>
                <DropdownMenu variant="solid" color="success">
                  <DropdownItem key="logout" textValue="go to logout">
                    <div className="flex justify-between items-center">
                      <Button
                        className="justify-between"
                        endContent={
                          <IoIosLogOut
                            className="fill-primary-300 "
                            size={18}
                          />
                        }
                        variant="bordered"
                        color="primary"
                        onClick={logout}
                        fullWidth
                      >
                        logout
                      </Button>
                    </div>
                  </DropdownItem>
                  <DropdownItem key="create" textValue="go to create post">
                    <div className="flex justify-between items-center">
                      <Button
                        className="justify-between"
                        endContent={<IoMdAdd />}
                        variant="bordered"
                        color="primary"
                        onClick={createPost}
                        fullWidth
                      >
                        Create Post
                      </Button>
                    </div>
                  </DropdownItem>
                  {profile.role === "ADMIN" ? (
                    <DropdownItem key="dashboard" textValue="go to dashboard">
                      <div className="flex justify-between items-center">
                        <Button
                          className="justify-between"
                          endContent={<IoLogoEuro />}
                          variant="bordered"
                          color="primary"
                          onClick={dashboard}
                          fullWidth
                        >
                          Dashboard
                        </Button>
                      </div>
                    </DropdownItem>
                  ) : (
                    <>""</>
                  )}
                </DropdownMenu>
              </Dropdown>
            </div>
          ) : (
            <Button variant="bordered" color="primary" onClick={login}>
              Login
            </Button>
          )}
        </NavbarItem>

        <NavbarMenuToggle
          aria-label={open ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      </NavbarContent>

      <NavbarMenu  >
        <NavbarMenuItem  onClick={()=> {setOpen(false)}} >
          <Link to="/">Home</Link>
        </NavbarMenuItem>
        <NavbarMenuItem onClick={()=> {setOpen(false)}}>
          <Link to={"/profiles/" + profile.id}>Profile</Link>
        </NavbarMenuItem>
        <NavbarMenuItem onClick={()=> {setOpen(false)}}>
          <Link to="/posts">Posts</Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

export default Header;
