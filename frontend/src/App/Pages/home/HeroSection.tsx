import { Button, Spinner } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { useRandomImageQuery } from "../../../redux/api/API";
import { useEffect } from "react";

function HeroSection() {
  const textColor = "text-grayColor-800";
  const navigate = useNavigate();
  const { data, isLoading } = useRandomImageQuery({});

  useEffect(() => {
    console.log('image ',data);
  }, [data]);
  return (
    <div className="bg-background px-5 sm:px-20 py-10  mt-5 rounded-xl   grid md:grid-cols-2 gap-4 gap-y-10">
      <div className="flex items-start justify-center flex-col gap-4 text-center md:text-start ">
        <h1 className={textColor}>Welcome to Your Daily Blog </h1>
        <p>
          Your source for the latest updates, insights, and stories from around
          the world.
        </p>
        <Button
          variant="solid"
          color="primary"
          fullWidth
          onClick={() => navigate("/posts")}
        >
          <Link to="/posts">View Posts</Link>
        </Button>
      </div>
      <div className="items">
        {isLoading && <Spinner />}
        {data && (
          <img
            src={`${data}`}
            alt="hero-image"
            width={300}
            height={300}
            className="rounded-xl"
          />
        )}
      </div>
    </div>
  );
}

export default HeroSection;
