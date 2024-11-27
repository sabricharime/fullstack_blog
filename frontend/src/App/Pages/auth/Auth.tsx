import { Button, Input } from "@nextui-org/react";
import { FormEvent, useEffect } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import {
  setImageLogin,
  setIsAuth,
  showImagelogin,
} from "../../../redux/slices/config.slice";
import { useLoginMutation, useRegisterMutation } from "../../../redux/api/API";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { toast } from "react-toastify";
import useImagePreview from "../../../hooks/useImagePreview";
import useSwitchAccount from "../../../hooks/useSwitchAccount";
import { Navigate, useNavigate } from "react-router-dom";
import useImageUpload from "../../../hooks/useImageUpload";

// Make Types For Register And Login
type Register = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar: string;
};
type Login = {
  email: string;
  password: string;
};

// Make Auth Componenet and logic
function Auth() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, {isLoading:loginLoading}] = useLoginMutation();
  const [register,{isLoading:registerLoading}] = useRegisterMutation();
  const { isAuth } = useAppSelector((state) => state.config);
  const [uploadImage] = useImageUpload();

  const {
    showImageLogin: show,
    fileImageLogin: image,
    hasAccount,
  } = useAppSelector((state) => state.config);

  const [previewFile] = useImagePreview();
  const [switchAccount] = useSwitchAccount();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const form = e.currentTarget as HTMLFormElement;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      if (hasAccount) {
        const response = await login(data as Login).unwrap();
        if (response) {
          dispatch(setIsAuth(true));
          navigate("/");
        } else {
          dispatch(setIsAuth(false));
          toast.error("Failed to Register");
        }
      } else {
        const form = e.currentTarget as HTMLFormElement;
        const fileInput = form.elements.namedItem("doc") as HTMLInputElement;

        const file = fileInput.files![0];
        const imageURL = await uploadImage({
          file,
          fileType: file.type,
          fileName: file.name,
        });

        const response = await register({
          ...(data as Register),
          avatar: imageURL as string,
        }).unwrap();
        dispatch(setIsAuth(true));
        navigate("/");
        if (response) {
          dispatch(setIsAuth(true));
          toast.success("Registered Successfully");
        } else {
          toast.error("Failed to Register");
          dispatch(setIsAuth(false));
        }
        fileInput.value = "";
        dispatch(setImageLogin(""));
        dispatch(showImagelogin(false));
      }
    } catch (error) {
      const err = error as {
        data: { message: string; statusCode: string | number };
      };
      toast.error(JSON.stringify(err));
      console.log(error);
      dispatch(setIsAuth(false));
    }
  };

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(isAuth));
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);
  return !isAuth ? (
    <div className="bg-background-300 size-full  md:p-20 grid place-items-center ">
      <div className="mainLoginPart bg-background-100 rounded-md shadow-lg w-full p-4 md:px-20 md:py-10 md:w-[700px] ">
        <form onSubmit={handleSubmit} className="form flex flex-col gap-4">
          <div className="flex justify-between">
            {" "}
            <h1 className="text-3xl font-bold text-start mb-4">
              {hasAccount ? "Login" : "Register"}
            </h1>
            <Button variant="light" color="secondary" onClick={switchAccount}>
              {hasAccount
                ? "Don't have an account? Register"
                : "You have an account? Login"}
            </Button>
          </div>
          <div className="form-group flex items-center gap-4 flex-col md:flex-row">
            {!hasAccount && (
              <Input
                name="username"
                type="text"
                label="username"
                placeholder="Username"
                variant="flat"
                color="default"
              />
            )}
            <Input
              name="email"
              type="email"
              label="email"
              placeholder="email eg: username@domain.com"
              variant="flat"
            />
          </div>
          <div className="form-group flex items-center gap-4 flex-col md:flex-row">
            <Input
              name="password"
              type="password"
              label="password"
              placeholder="Password"
              variant="flat"
            />
            {!hasAccount && (
              <Input
                name="confirmPassword"
                type="password"
                label="Confirm Password "
                placeholder="Confirm Password "
                variant="flat"
              />
            )}
          </div>
          {!hasAccount && (
            <div className="form-group flex items-center justify-center gap-4">
              <label
                htmlFor="doc"
                className="flex items-center gap-2 bg-primary-50 py-2 px-4 rounded-md cursor-pointer"
              >
                <AiOutlineUpload size={26} className="fill-primary" />
                <div className="space-y-2 w-full">
                  <h4 className="text-base font-semibold text-foreground-300">
                    Upload avatar
                  </h4>
                  <span className="text-sm text-gray-500">Max 2 MO</span>
                </div>
                <div className="preview">
                  <img
                    src={image}
                    alt="po"
                    width={80}
                    className={`rounded-full ${
                      show ? "inline-block" : "hidden"
                    }`}
                  />
                </div>
                <input
                  type="file"
                  id="doc"
                  name="doc"
                  className="hidden"
                  onChange={previewFile}
                />
              </label>
            </div>
          )}

          <Button
            variant="solid"
            color="primary"
            type="submit"
            isLoading={loginLoading || registerLoading}
          >
            {(loginLoading||registerLoading)? "Trying to login...":hasAccount?"Login":"Register"}
          </Button>
        </form>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
}

export default Auth;
