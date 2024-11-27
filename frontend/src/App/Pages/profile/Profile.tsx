import {
  Image,
  Button,
  Input,
  Card,
  Spinner,
  CardFooter,
  CardBody,

  Avatar,
  Tooltip,
} from "@nextui-org/react";
import { FaCrown, FaStar, FaUpload, FaUser } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks/hooks";
import {
  useEditProfileMutation,
  useLazyGetProfileQuery,
} from "../../../redux/api/API";
import useImageUpload from "../../../hooks/useImageUpload";

function Profile() {
  const [profile, { data }] = useLazyGetProfileQuery();
  const [editProfile, { data: editProfileData }] = useEditProfileMutation();
  const [uploadImage] = useImageUpload();
  const [userData, setUserData] = useState({
    username: "",
    avatar: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.config);
  const [image, setImage] = useState("");
  const [showImage, setShowImage] = useState(false);
  const imagePreview = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files![0];
    const Reader = new FileReader();
    Reader.onload = function () {
      if (Reader.result) {
        setImage(Reader.result as string);
        setShowImage(true);
      }
    };
    Reader.readAsDataURL(file);
  };

  const editProfileFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("password", e.currentTarget.password.value);
      formData.append("confirmPassword", e.currentTarget.confirmPassword.value);

      if (e.currentTarget.username) {
        formData.append("username", e.currentTarget.username.value);
      }
      const file = e.currentTarget.avatar.files![0];
      console.log(file);
      if (file) {
        const img = await uploadImage({
          file: file,
          fileName: file.name,
          fileType: file.type,
        });

        console.log(img);
        formData.append("avatar", img as string);
      }

      const data = Object.fromEntries(formData);

      console.log(data);

      await editProfile({ ...data, id });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    profile({ id });
  }, [profile, id, editProfileData]);

  useEffect(() => {
    if (data) {
      setUserData((prev) => ({
        ...prev,
        username: data.username,
      }));
    }
  }, [data]);

  if (!data) {
    return (
      <div className="size-full grid items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-[90vh] px-6 md:px-0">
      <header className="h-[300px] w-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center relative">
        <div className="flex flex-col items-center">
          <Avatar src={data.avatar} className="w-[120px] h-[120px]" />

          <h2 className="text-foreground-100 text-2xl font-bold mt-4">
            {data.username}
          </h2>

          <p className="text-white text-lg">
            <Link to={"/profiles/" + data.id}>@{data.username}</Link>
          </p>
        </div>

        <div className="w-[300px] h-[50px]  absolute top-2 right-2 rounded-md flex items-center gap-4 px-4 justify-end">
          <Tooltip
            content={
              <h6>
                <small>{data.username} is admin </small>
              </h6>
            }
          >
            <Button
            variant="bordered"
              color={
                data.role === "ADMIN" ? (
                  "danger"
                ) : data.role === "USER" ? (
                  "secondary"
                ) : (
                  "warning"
                )
              }
              startContent={
                data.role === "ADMIN" ? (
                  <FaCrown />
                ) : data.role === "USER" ? (
                  <FaUser />
                ) : (
                  <FaStar />
                )
              }
            >
              {data.role}
            </Button>
          </Tooltip>
        </div>
      </header>
      <div
        className={`grid grid-cols-1 md:${
          currentUser.id === (Number(id) as number)
            ? "grid-cols-2"
            : "grid-cols-1"
        }`}
      >
        {currentUser.id === (Number(id) as number) && (
          <main className="flex flex-col items-center mt-6 mb-10 w-full  p-4">
            <Card className="w-full max-w-full p-6 shadow-lg ">
              <h4 className="text-xl font-semibold mb-4">Account Settings</h4>
              <p className="mb-6 text-grayColor-400">
                Update your account settings like password, email, and more...
              </p>
              <form
                className="flex flex-col gap-4 w-full"
                onSubmit={editProfileFormSubmit}
              >
                <Input
                  label="Username"
                  placeholder="Enter your username"
                  variant="underlined"
                  color="primary"
                  name="username"
                  value={userData.username}
                  onChange={(e) => {
                    setUserData({ ...userData, username: e.target.value });
                  }}
                />

                <Input
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="underlined"
                  color="primary"
                />
                <Input
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  type="password"
                  variant="underlined"
                  color="primary"
                />

                <div className="file-upload flex flex-col items-center justify-center border-2 border-dashed border-grayColor-400 p-6 rounded-lg hover:bg-gray-100 transition duration-200">
                  <label className="cursor-pointer flex flex-col items-center">
                    <FaUpload size={50} className="text-gray-600 mb-2" />
                    <input
                      name="avatar"
                      type="file"
                      className="hidden"
                      onChange={imagePreview}
                    />
                    <span className="text-lg font-semibold text-grayColor-700">
                      {"avatar"}
                    </span>
                  </label>

                  {showImage && (
                    <Image
                      src={`${image}`}
                      width={120}
                      height={120}
                      className="rounded-full border-4 border-foreground mb-5"
                    />
                  )}
                </div>
                <Button
                  variant="solid"
                  color="primary"
                  type="submit"
                  className="mt-4"
                >
                  Save Changes
                </Button>
              </form>
            </Card>
          </main>
        )}
        <main className="flex flex-col items-center mt-6 mb-10 w-full  p-4">
          <Card className="w-full max-w-full p-6  shadow-lg ">
            <h4 className="text-xl font-semibold mb-4 text-grayColor-900">
              Account Info{" "}
            </h4>
            <p className="mb-6 text-grayColor-800">
              Your account information is below. You can edit your account
            </p>

            <div className="flex flex-row  gap-4 items-center  justify-start mb-6">
              <h5 className="text-lg font-semibold text-grayColor-800">
                Username:
              </h5>
              <p className="text-grayColor-800 ">{data.username}</p>
            </div>
            <div className="flex flex-row  gap-4 items-center  justify-start mb-6">
              <h5 className="text-lg font-semibold text-grayColor-800">
                Email:
              </h5>
              <p className="text-grayColor-800 ">{data.email}</p>
            </div>
            <div className="flex flex-row  gap-4 items-center  justify-start mb-6">
              <h5 className="text-lg font-semibold text-grayColor-800">
                User ID :
              </h5>
              <p className="text-grayColor-800 ">{data.id}</p>
            </div>
            <h5 className="text-lg font-semibold mb-5 text-grayColor-800">
              {data.username}'s posts:{" "}
            </h5>
            <div
              className={`posts grid grid-cols-1  md:${
                currentUser.id === (Number(id) as number)
                  ? "grid-cols-2"
                  : "grid-cols-3"
              } gap-4`}
            >
              {data &&
                (
                  data.posts as {
                    id: number;
                    title: string;
                    imageURL: string;
                  }[]
                ).map((item, key) => {
                  return (
                    <Card
                      onClick={() => {
                        navigate("/posts/" + item.id);
                        alert("e");
                      }}
                      key={key}
                    >
                      <CardBody
                        style={{
                          backgroundImage: `url('${item.imageURL}')`,
                          cursor: "pointer",
                        }}
                        className={`bg-cover brightness-100 grid place-items-center cursor-pointer min-h-[150px ] *:pointer-events-none"`}
                      >
                        <h6 className="text-lg text-foreground font-semibold  text-center bg-background/80 px-8 py-12 w-full">
                          <small>{item.title} </small>{" "}
                        </h6>
                      </CardBody>

                      <CardFooter>
                        <div className="flex flex-row gap-4 items-center justify-end w-full">
                          <Button
                            onClick={() => navigate("/posts/" + item.id)}
                            variant="solid"
                            color="primary"
                          >
                            Read
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  );
                })}
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}

export default Profile;
