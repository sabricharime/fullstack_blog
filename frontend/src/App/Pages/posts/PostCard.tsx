import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Image,
  User,
} from "@nextui-org/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const PostCard: React.FC<{
  title: string;
  image: string;
  discription: string;
  author: { username: string; avatar: string; id: number };
  id: number;
}> = ({ title, image, discription, author, id }) => {
  const navigate = useNavigate();

  return (
    <div className=" max-w-[500px]  ">
      <Card
        className="min-h-[500px] max-h-[500px] flex "
        // classNames={{
        //   footer: "bg-green-500  ",
        //   body: "max-h-[300px]",
        //   base: "flex flex-col justify-start bg-red-500  ",

        // }}
      >
        <CardHeader>
          <div className="flex justify-between ">
            <User
              name={
                <h5>
                  <small>{author.username}</small>
                </h5>
              }
              description={
                <Link className="text-primary" to={"/profiles/" + author.id}>
                  @{author.username}
                </Link>
              }
              avatarProps={{
                src: author.avatar,
              }}
            />
          </div>
        </CardHeader>

        <Image alt="der" src={image} width={300} height={200} />

        <CardFooter className=" flex-grow w-full min-w-full *:w-full *:h-full">
          <div className="flex flex-col justify-between gap-4">
            <div className="text flex flex-col gap-3">
              <h6>
                <small>{title}</small>{" "}
              </h6>
              <p>
                <small
                  dangerouslySetInnerHTML={{
                    __html: discription
                      .replace(/<[^>]*>/g, " ")
                      .trim()
                      .slice(0, 50),
                  }}
                ></small>
              </p>
            </div>
            <div className="read">
              <Button
                variant="solid"
                color="primary"
                onClick={() => {
                  navigate("/posts/" + id);
                }}
                fullWidth
              >
                Read
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PostCard;
