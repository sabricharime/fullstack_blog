import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spinner,
  User,
} from "@nextui-org/react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSinglePostQuery } from "../../../redux/api/API";
import { FaArrowAltCircleLeft, FaInfo } from "react-icons/fa";

function SinglePost() {
  const { id } = useParams();
  const { data, isLoading, error } = useSinglePostQuery({ id });

  useEffect(() => {
    window.scrollTo(0, 0);

    console.log(data);
  }, [data]);

  if (data && data.post === null) {
    return (
      <>
        <h1>No ContentFound</h1>
      </>
    );
  }

  if (data && !("post" in data))
    return (
      <div className="size-full h-screen p-5 grid place-items-center bg-grayColor-100">
        <Card className="max-w-[500px] w-full min-h-[300px]">
          <CardHeader>
            <Button
              variant="flat"
              color="primary"
              startContent={<FaArrowAltCircleLeft />}
            >
              <Link to="/posts">Back to Posts</Link>
            </Button>
          </CardHeader>
          <CardBody>
            <h5 className="text-grayColor-800">
              <small>{data.title}</small>
            </h5>
            <br />
            <p className="text-grayColor-600">{data.message}</p>
          </CardBody>
          <CardFooter>
            <Button
              variant="flat"
              color="primary"
              startContent={<FaInfo />}
              fullWidth
            >
              <Link to="/posts">Understod</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );

  return (
    <>
      {isLoading && <Spinner />}

      {data && (
        <div className="flex flex-col gap-3">
          <div className="header relative h-[300px] w-full bg-red-300">
            <img
              src={data.post.imageURL}
              alt="title"
              className="absolute top-0 left-0 w-full h-full object-cover backdrop-blur-md brightness-50"
            />

            <div className="text-3xl font-bold  absolute bottom-0 px-5 text-foreground-100 flex flex-col gap-1 bg-background/80 w-full ">
              <h1 className="text-5xl font-bold ">
                <Link to={"/posts" + data.post.id}>
                  <small>{data.post.title} </small>
                </Link>
              </h1>

              <User
                classNames={{
                  wrapper: "m-0  py-2 text-foreground-200 rounded-t-md ",
                  base: "justify-start",
                }}
                name={<h4>{data.post.author.username}</h4>}
                description={
                  <Link
                    className="text-blue-800"
                    to={"/profiles/" + data.post.userID}
                  >
                    @{data.post.author.username}
                  </Link>
                }
                avatarProps={{
                  src: data.post.author.avatar,
                  isBordered: true,
                  color: "success",
                }}
              />
            </div>
          </div>

          <div className="content py-10 flex flex-col">
            <h1 className="text-foreground-100">{data.post.title}</h1>
            <p
              className="text-foreground-200 text-justify"
              dangerouslySetInnerHTML={{
                __html: data.post.content.replace('"', " "),
              }}
            ></p>
          </div>
        </div>
      )}
      {error && <div className="text-red-500">Error to fetch this content</div>}
    </>
  );
}

export default SinglePost;
