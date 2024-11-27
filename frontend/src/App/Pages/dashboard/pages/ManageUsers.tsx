import { useEffect } from "react";
import {
  useBanUserMutation,
  useLazyGetAllUsersQuery,
} from "../../../../redux/api/API";
import {
  Badge,
  Button,
  Chip,
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@nextui-org/react";

import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaArchive,
  FaTrash,
  FaBan,
  FaUserCheck,
  FaExternalLinkAlt,
  FaCrown,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../../redux/hooks/hooks";
import { Outlet, useNavigate } from "react-router-dom";

type userData = {
  id: number;
  avatar: string;
  username: string;
  email: string;
  role: string;
  banned: boolean;
  comment: [];
  follower: [];
  following: [];
  posts: {
    content: string;
    id: number;
    imageURL: string;
    postStatus: string;
    title: string;
    userID: number;
  }[];
};

function UserBadgeIcon({ role }: { role: string }) {
  switch (role) {
    case "ADMIN":
      return <FaCrown size={16} className="fill-foreground" />;
    case "USER":
      return <FaUserCheck size={16} className="fill-foreground" />;
    case "MODERATOR":
      return <FaUserCheck size={16} className="fill-foreground" />;
    default:
      return <FaUserCheck size={16} className="fill-foreground" />;
  }
}

function ManageUsers() {
  const [fetchALlUsers, { data, isLoading, error }] = useLazyGetAllUsersQuery();
  const [banUser, { data: BanData }] = useBanUserMutation();
  const { currentUser } = useAppSelector((state) => state.config);
  const navigate = useNavigate();

  useEffect(() => {
    fetchALlUsers({});
  }, [fetchALlUsers]);

  useEffect(() => {
    if (BanData) {
      fetchALlUsers({});
    }
  }, [BanData]);

  if (isLoading) {
    return (
      <div className="w-full grid place-items-center">
        <Spinner />
      </div>
    );
  }
  if (error) {
    return (
      <div className="size-full grid place-items-center">
        <p>Error Somthing went wrong we cant fetch users</p>
      </div>
    );
  }

  if (data) {
    return (
      <div className="size-full  grid grid-cols-1  grid-rows-6 gap-8">
        <header className="bg-background-600 text-foreground-200 p-4 w-full row-span-1">
          <h4 className=" font-bold">
            <small>Manage Users</small>
          </h4>
          <p className="font-medium  ">
            <small>
              Manage users and their roles. You can add, edit, and delete users
              , as well as assign roles to them. by Searching in the input below
              you'll get every user name
            </small>
          </p>

          <div className="w-full flex items-center gap-4 py-4 ">
            <Input
              startContent={<FaSearch />}
              variant="flat"
              color="primary"
              placeholder={"Searching about any user by typing  his username "}
            />
            Or
            <Button
              variant="shadow"
              color="primary"
              startContent={<FaPlus />}
              className="w-[120px]"
              onClick={() => {
                navigate("user_create");
              }}
            >
              Create
            </Button>
          </div>
        </header>

        <main className="w-full px-4 row-span-5">
          <Outlet />
          <Table aria-label="table ">
            <TableHeader>
              <TableColumn className="text-foreground">ID</TableColumn>
              <TableColumn className="text-foreground">USER</TableColumn>
              <TableColumn className="text-foreground">
                BANNED/ALLOWED
              </TableColumn>
              <TableColumn className="text-foreground">SETUP</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"emptyContent"}>
              {(data as userData[]).map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>
                    <Badge
                      content={<UserBadgeIcon role={item.role} />}
                      variant="solid"
                      color="primary"
                      placement="top-left"
                    >
                      <User
                        name={item.username}
                        description={`
                          Email: ${item.email}`}
                        avatarProps={{
                          src: item.avatar,
                          alt: item.username,
                        }}
                      />
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {item.banned ? (
                      <Chip
                        className="px-2"
                        variant="flat"
                        color="danger"
                        startContent={<FaBan />}
                      >
                        Banned
                      </Chip>
                    ) : (
                      <Chip
                        className="px-2"
                        variant="flat"
                        color="success"
                        startContent={<FaUserCheck />}
                      >
                        Allowed
                      </Chip>
                    )}
                  </TableCell>
                  <TableCell>
                    <Dropdown
                      aria-label="red"
                      className="bg-background"
                      classNames={{
                        base: "!bg-background",
                        content: "!bg-background",
                      }}
                    >
                      <DropdownTrigger>
                        <Button
                          isIconOnly
                          startContent={<FaEdit />}
                          variant="flat"
                          color="primary"
                        ></Button>
                      </DropdownTrigger>
                      <DropdownMenu variant="faded">
                        <DropdownItem
                          variant="flat"
                          color={item.banned ? "success" : "danger"}
                          key="Aprove Post"
                          onClick={async () => {
                            const s = await banUser({
                              id: item.id,
                              action: item.banned ? false : true,
                            });

                            if (s.error) {
                              const err = s.error as {
                                status: number;
                                data: { message: string; statusCode: 403 };
                              };

                              toast.error(JSON.stringify(err.data.message), {
                                position: "bottom-left",
                                theme: "dark",
                              });
                              return;
                            }

                            toast.success(
                              !item.banned
                                ? item.username +
                                    " Banned By: " +
                                    currentUser.username
                                : item.username +
                                    " unBanned by: " +
                                    currentUser.username,
                              {
                                position: "bottom-left",
                                theme: "dark",
                              }
                            );
                          }}
                          closeOnSelect={true}
                          startContent={
                            item.banned ? (
                              <FaUserCheck className={"fill-success"} />
                            ) : (
                              <FaBan className={"fill-danger "} />
                            )
                          }
                          className={cn(
                            `${item.banned ? "text-success" : "text-danger "}`
                          )}
                          description="Ban this user mean the user cannot use this site anymore"
                          showDivider
                        >
                          {item.banned ? "Remove Ban" : "Ban User"}
                        </DropdownItem>
                        <DropdownItem
                          key="edit"
                          showDivider
                          description="You can give the user a new role like admin super VIP and more "
                          startContent={
                            <FaArchive className="fill-grayColor-500 " />
                          }
                          className={cn("text-grayColor")}
                          onClick={async () => {
                            // await aprovePosts({
                            //   id: post.id,
                            //   postStatus: "ARCHIVED",
                            // });
                            navigate("user_setting", {
                              state: { id: item.id },
                            });
                          }}
                          endContent={<FaExternalLinkAlt />}
                        >
                          Set A Role For This User
                        </DropdownItem>
                        <DropdownItem
                          key="delete"
                          className="text-danger"
                          color="danger"
                          startContent={<FaTrash />}
                          description="Permanently delete posts stored by this user"
                          onClick={async () => {
                            // await deletePost({
                            //   id: post.id,
                            // });
                          }}
                        >
                          Delete All Posts for this user
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </main>
      </div>
    );
  }
}

export default ManageUsers;
