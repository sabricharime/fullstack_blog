import {
  Button,
  Card,
  Input,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { FaBan, FaCheck, FaImage } from "react-icons/fa";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useCreateUserMutation } from "../../../../redux/api/API";
import { toast } from "react-toastify";
import useImageUpload from "../../../../hooks/useImageUpload";

function CreateNewUser() {
  const [createUser, {isLoading:userLoading}] = useCreateUserMutation();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
    role: "USER",
    banned: false,
  });

  const [upload] = useImageUpload();
  const previewImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const reader = new FileReader();
    reader.onload = () => {
      setUser({ ...user, avatar: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const submitUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const file = e.currentTarget.file.files![0];
      const image = await upload({
        file,
        fileName: file.name,
        fileType: file.type,
      });
      setUser({ ...user, avatar: image as string });
      await createUser(user);
      toast.success("User created successfully");
    } catch (error) {
      const err = error as { data: { message: string; statusCode: number } };
      toast.error(err.data.message ? err.data.message : "Error creating user");
    }
  };

  useEffect(() => {}, [
    user.avatar,
    user.banned,
    user.email,
    user.password,
    user.role,
    user.username,
  ]);
  return (
    <div className="w-full row-span-2 " aria-label="CDer">
      <Card aria-label="CDtt">
        <form
          aria-label="CDe"
          className="flex flex-col gap-4 p-4"
          onSubmit={submitUser}
        >
          <Table aria-label="CDr">
            <TableHeader>
              <TableColumn className="text-foreground">USERNAME</TableColumn>
              <TableColumn className="text-foreground">EMAIL</TableColumn>
              <TableColumn className="text-foreground">PASSWORD</TableColumn>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>
                  <Input
                    placeholder="Enter username"
                    variant="flat"
                    color="primary"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setUser({ ...user, username: e.target.value });
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    placeholder="Enter email"
                    variant="flat"
                    color="primary"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setUser({ ...user, email: e.target.value });
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    placeholder="Enter password"
                    variant="flat"
                    color="primary"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setUser({ ...user, password: e.target.value });
                    }}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Table aria-label="CDee">
            <TableHeader>
              <TableColumn className="text-foreground">AVATAR</TableColumn>
              <TableColumn className="text-foreground">ROLE</TableColumn>
              <TableColumn className="text-foreground">BANNED</TableColumn>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>
                  <label htmlFor="avatar">
                    <div
                      style={{
                        backgroundImage: `url(${user.avatar})`,
                        backgroundSize: "cover",
                      }}
                      className="bg-background-300 border border-background-600/80 rounded-full w-[50px] h-[50px] grid place-items-center cursor-pointer"
                    >
                      <FaImage />
                    </div>
                    <input
                      name="file"
                      type="file"
                      id="avatar"
                      className="hidden"
                      onChange={previewImage}
                    />
                  </label>
                </TableCell>
                <TableCell>
                  <Select
                    aria-label="Select an option"
                    className="min-w-[100px]"
                    defaultSelectedKeys={["USER"]}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                      console.log(e.target.value);
                      setUser({ ...user, role: e.target.value });
                    }}
                  >
                    <SelectItem key={"ADMIN"}>ADMIN</SelectItem>
                    <SelectItem key={"USER"}>USER</SelectItem>
                    <SelectItem key={"VIP"}>VIP</SelectItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    defaultSelectedKeys={["NO"]}
                    aria-label="Select an option"
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                      console.log(e.target.value);
                      setUser({
                        ...user,
                        banned: e.target.value === "YES" ? true : false,
                      });
                    }}
                  >
                    <SelectItem
                      key={"YES"}
                      color="danger"
                      startContent={<FaBan />}
                    >
                      YES
                    </SelectItem>
                    <SelectItem
                      key={"NO"}
                      color="success"
                      startContent={<FaCheck />}
                    >
                      NO
                    </SelectItem>
                  </Select>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Button variant="shadow" color="primary" type="submit" isLoading={userLoading} isDisabled={userLoading} >
            Save User
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default CreateNewUser;
