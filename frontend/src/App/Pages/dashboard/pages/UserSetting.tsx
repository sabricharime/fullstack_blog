import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useEditUserByAdminMutation,
  useLazyGetProfileByIdQuery,
} from "../../../../redux/api/API";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@nextui-org/react";
import { FaCheck, FaCrown, FaImage, FaUser, FaUserCheck } from "react-icons/fa";
import { FaBan } from "react-icons/fa6";
import { toast } from "react-toastify";
import useImageUpload from "../../../../hooks/useImageUpload";

type USER = {
  username: string;
  email: string;
  role: string;
  avatar: string;
  banned: boolean;
};
function UserSetting() {
  const navigate = useNavigate()
  const location = useLocation();
  const { state } = location || {};
  const { id } = state || {};
  const [getUser, { data, isLoading }] = useLazyGetProfileByIdQuery();
  const [editUser, { data: edituserData }] = useEditUserByAdminMutation();
  const [user, setUser] = useState<USER>({
    username: "",
    email: "",
    role: "USER",
    avatar: "",
    banned: false,
  });

  const [avatar, setAvatar] = useState<File>();
  const [upload] = useImageUpload();

  const imageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      setAvatar(e.currentTarget.files![0]);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setUser((prev) => ({ ...prev, avatar: reader.result as string }));
        }
      };
      reader.readAsDataURL(e.currentTarget.files![0]);
    }
  };

  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const imageResult = await upload({
        file: avatar as File,
        fileName: avatar?.name as string,
        fileType: avatar?.type as string,
      });

      setUser((prev) => ({
        ...prev,
        avatar: imageResult as string,
      }));

      const userresult = await editUser({
        payload: { ...user },
        id: id as string,
      });

      if (userresult) {
        setUser((prev) => ({
          ...prev,
          username: userresult.data.username,
          email: userresult.data.email,
          role: userresult.data.role,
          banned: userresult.data.banned,
          avatar: userresult.data.avatar,
        }));
      }

      toast.success("User Updated Successfully");
      navigate("/dashboard/manage_users")

    } catch (error) {
      toast.error(JSON.stringify(error));
    }
  };

  useEffect(() => {
    getUser({ id });
  }, [getUser]);

  useEffect(() => {
    getUser({ id });
  }, [id]);

  useEffect(() => {
    if (data) {
      setUser((prev: USER) => ({
        ...prev,
        username: data.username,
        email: data.email,
        role: data.role,
        banned: data.banned,
        avatar: data.avatar,
      }));
    }
    if (edituserData) {
      setUser((prev: USER) => ({
        ...prev,
        username: edituserData.username,
        email: edituserData.email,
        role: edituserData.role,
        banned: edituserData.banned,
        avatar: edituserData.avatar,
      }));
    }
  }, [data, edituserData]);

  if (isLoading) return <Spinner />;

  if (data)
    return (
      <div className="w-full mb-5 ">
        <Card className="w-full   ">
          <Card className="p-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge>
                  <User
                    name={data.username}
                    description={
                      <Link to={"/profiles/" + data.id}>View Full</Link>
                    }
                    avatarProps={{
                      src: user?.avatar,
                      size: "lg",
                      isBordered: true,
                      color: data.banned ? "danger" : "success",
                    }}
                  />
                </Badge>
              </div>
            </CardHeader>
            <CardBody>
              <form
                aria-label="erte"
                className="flex flex-col gap-4"
                onSubmit={formSubmit}
              >
                <Table aria-label="tester">
                  <TableHeader>
                    <TableColumn className="text-foreground">
                      USERNAME
                    </TableColumn>
                    <TableColumn className="text-foreground">EMAIL</TableColumn>
                    <TableColumn className="text-foreground">
                      AVATAR
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Input
                          value={user.username}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setUser({ ...user, username: e.target.value });
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={user.email}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setUser({ ...user, email: e.target.value });
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <label htmlFor="avatar">
                          <div
                            style={{
                              backgroundImage: `url('${user.avatar}')`,
                              backgroundSize: "cover",
                            }}
                            className="w-20 h-20 rounded-full grid place-items-center contrast-50 cursor-pointer"
                          >
                            <FaImage size={26} className="fill-secondary-600" />
                          </div>
                          <input
                            onChange={imageChange}
                            type="file"
                            className="hidden"
                            id="avatar"
                            name="avatar"
                          />
                        </label>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Table aria-label="tester">
                  <TableHeader>
                    <TableColumn className="text-foreground">ROLE</TableColumn>
                    <TableColumn className="text-foreground">
                      BANNED
                    </TableColumn>
                    <TableColumn className="text-foreground">
                      CONFIRM
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Select
                          label="New Role"
                          labelPlacement="outside-left"
                          color="secondary"
                          placeholder={user.role}
                          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            setUser((prev) => ({
                              ...prev,
                              role: e.target.value,
                            }));
                          }}
                          endContent={
                            user.role === "ADMIN" ? <FaCrown /> : <FaUser />
                          }
                        >
                          <SelectItem key={"ADMIN"}>ADMIN</SelectItem>
                          <SelectItem key={"USER"}>USER</SelectItem>
                          <SelectItem key={"VIP"}>VIP</SelectItem>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Select
                          label="User Ban"
                          labelPlacement="outside-left"
                          defaultOpen={false}
                          placeholder="Ban or allow user "
                          defaultSelectedKeys={[
                            user.banned
                              ? "true"
                              : user.banned === null
                              ? "null"
                              : "false",
                          ]}
                          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            const action =
                              e.target.value === "true"
                                ? true
                                : e.target.value === "false"
                                ? false
                                : null;
                            if (action === null) {
                              return;
                            } else {
                              setUser((prev) => ({
                                ...prev,
                                banned: action,
                              }));
                            }

                            console.log(user.banned);
                          }}
                          endContent={user.banned ? <FaBan /> : <FaUserCheck />}
                          color={user.banned ? "danger" : "success"}
                        >
                          <SelectItem key={"true"}>Ban</SelectItem>
                          <SelectItem key={"false"}>Allow</SelectItem>
                          <SelectItem key={"null"}>no Action</SelectItem>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <label htmlFor="avatar">
                          <Button
                            type="submit"
                            variant="shadow"
                            color="primary"
                            startContent={<FaCheck />}
                          >
                            Confirm Changes{" "}
                          </Button>
                          <input
                            type="file"
                            className="hidden"
                            id="avatar"
                            name="avatar"
                          />
                        </label>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </form>
            </CardBody>
          </Card>
        </Card>
      </div>
    );
}

export default UserSetting;
