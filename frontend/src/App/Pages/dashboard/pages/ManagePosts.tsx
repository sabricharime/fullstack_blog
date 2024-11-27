import {
  Button,
  Card,
  Chip,
  cn,
  Divider,
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
} from "@nextui-org/react";
import { FaArchive, FaCheck, FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import {
  useAprovePostsMutation,
  useLazyGetAllAdminPostsQuery,
  useDeletePostMutation,
} from "../../../../redux/api/API";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../redux/hooks/hooks";

type POST_TYPE = {
  author: {
    username: string;
    avatar: string;
    content: string;
  };
  content: string;
  id: number;
  title: string;
  imageURL: string;
  userID: number;
  postStatus: string;
};
function ManagePosts() {
  const [getPosts, { data, isLoading }] = useLazyGetAllAdminPostsQuery({});
  const [aprovePosts, { data: aproveData }] = useAprovePostsMutation();
  const [deletePost, { data: deleteData }] = useDeletePostMutation();
  const { currentUser } = useAppSelector((state) => state.config);
  const navigate = useNavigate();

  const [localData, setLocalData] = useState<POST_TYPE[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Local utils
  const setStatus = (
    status: string
  ): "success" | "warning" | "danger" | undefined =>
    status === "PENDING"
      ? "warning"
      : status === "PUBLISHED"
      ? "success"
      : "danger";

  useEffect(() => {
    getPosts({});
  }, [getPosts]);

  useEffect(() => {
    if (data) {
      setLocalData(data);
    }
  }, [data, isLoading]);

  useEffect(() => {
    console.log(localData);
    if (localData) {
      const filteredData = localData.filter((post) =>
        post.title.toLowerCase().trim().includes(searchQuery)
      );

      if (searchQuery.length > 0) {
        setLocalData(filteredData);
      } else {
        setLocalData(data);
      }
    }
  }, [searchQuery]);

  useEffect(() => {
    if (aproveData || deleteData) {
      getPosts({});
      setLocalData(data);
    }
  }, [aproveData, deleteData]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  if (!localData) {
    return (
      <div className="size-full grid place-items-center ">
        <Spinner
          content="Loading "
          size="lg"
          color="primary"
          label="Loading posts "
        />
      </div>
    );
  }

  if (!data) {
    return <Spinner color="danger" content="waiting " />;
  }

  return (
    <div className="grid grid-cols-1 gap-5 grid-rows-3 xxl:grid-rows-5 size-full h-screen py-5 px-4">
      <Card className=" p-4 row-span-1 flex flex-col items-start  gap-2 bg-background-200 rounded-lg">
        <div className="w-full flex-col  gap-2 items-start justify-start pl-5 ">
          <h4 className="py-4 ">
            <small>
              {" "}
              welcome <span className="text-primary">{currentUser.username}</span> to dashboard
            </small>
          </h4>
          <div className="flex flex-col gap-2 items-start justify-center">
            <p className="font-semibold">
              <small>
                By enter anything on the input bellow , you can search for any
                post
              </small>
            </p>
          </div>
        </div>
        <div className="w-full flex items-center  justify-between  px-5 gap-5">
          <Input
            onChange={handleSearch}
            name="search"
            placeholder="Search for posts"
            label={"Search For posts "}
            color="primary"
            classNames={{
              mainWrapper: "max-w-[200px]",
              input: "bg-background-200",
              base: "w-full",
            }}
          />

          <Divider orientation="vertical" />

          <div className="flex  items-center gap-3">
            Or{" "}
            <Button
              onClick={() => navigate("/posts/create")}
              variant="shadow"
              color="primary"
              startContent={<FaPlus />}
            >
              {" "}
              Create Post
            </Button>
          </div>
        </div>
      </Card>

      <Table
        aria-label="Example static collection table"
        className="p-0 row-span-3 w-full"
      >
        <TableHeader>
          <TableColumn className="text-foreground">POST </TableColumn>
          <TableColumn className="text-foreground">AUTHOR </TableColumn>
          <TableColumn className="text-foreground">STATUS </TableColumn>
          <TableColumn className="text-foreground">SETUP </TableColumn>
        </TableHeader>
        <TableBody isLoading={isLoading} loadingState="loading" items={data}>
          {localData.map((post, index) => (
            <TableRow key={index}>
              <TableCell className="text-foreground">
                <a href={"/posts/" + post.id} target="_blank">
                  <small>{post.title}</small>
                </a>
              </TableCell>
              <TableCell className="text-foreground">
                {post.author.username}
              </TableCell>
              <TableCell className="text-foreground">
                <Chip variant="dot" color={setStatus(post.postStatus)}>
                  {post.postStatus}
                </Chip>
              </TableCell>
              <TableCell className="text-foreground">
                <Dropdown
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
                      color="primary"
                      key="Aprove Post"
                      onClick={async () => {
                        console.log("clicket");
                        await aprovePosts({
                          id: post.id,
                          postStatus: "PUBLISHED",
                        });
                      }}
                      closeOnSelect={true}
                      startContent={<FaCheck className="fill-primary " />}
                      className={cn("text-primary")}
                      description="Accept the post from the user"
                      showDivider
                    >
                      Approve Post
                    </DropdownItem>
                    <DropdownItem
                      key="edit"
                      showDivider
                      description="Allows you to edit the file"
                      startContent={
                        <FaArchive className="fill-grayColor-500 " />
                      }
                      className={cn("text-primary")}
                      onClick={async () => {
                        await aprovePosts({
                          id: post.id,
                          postStatus: "ARCHIVED",
                        });
                      }}
                    >
                      Archive Post
                    </DropdownItem>
                    <DropdownItem
                      key="delete"
                      className="text-danger"
                      color="danger"
                      startContent={<FaTrash />}
                      description="Permanently delete the file"
                      onClick={async () => {
                        await deletePost({
                          id: post.id,
                        });
                      }}
                    >
                      Delete Post
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </TableCell>
            </TableRow>
          ))}
          {/* <TableRow>
            <TableCell className="max-w-[100px] ">
              <Spinner label="initialization" size="sm" color="danger" />
            </TableCell>
            <TableCell className="text-wrap">
              <Spinner />
            </TableCell>
            <TableCell>
              <Chip color="warning" variant="flat">
                <Spinner />
              </Chip>
            </TableCell>
            <TableCell>
              <Button
                isIconOnly={true}
                startContent={<Spinner />}
                variant="flat"
                color="primary"
              ></Button>
            </TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
    </div>
  );
}

export default ManagePosts;
