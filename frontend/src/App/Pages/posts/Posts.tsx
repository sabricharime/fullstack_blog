import { Spinner } from "@nextui-org/react";
import { useGetAllPostsQuery } from "../../../redux/api/API";
import PostCard from "./PostCard";

type Data = {
  id: number;
  title: string;
  imageURL: string;
  content: string;
  userID: number;
  author: {
    username: string;
    avatar: string;
    id: number;
  };
};

function Posts() {
  const { data, isLoading, error } = useGetAllPostsQuery({});
  const post = data as Data[];
  return (
    <div className="grid grid-cols-1 gap-y-4  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-20 md:gap-4">
      {/* <PostCard /> */}

      {isLoading && <Spinner />}
      {error && <div>Error: cant loading content </div>}
      {post && post.length === 0 && <div>No posts found</div>}
      {post &&
        post.map((item, key) => (
          <PostCard
            key={key}
            title={item.title}
            discription={item.content}
            author={{ ...item.author, id: item.userID }}
            id={item.id}
            image={item.imageURL}
          />
        ))}
    </div>
  );
}

export default Posts;
