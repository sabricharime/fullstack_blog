import {
  Button,
  Card as Main,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import { Link } from "react-router-dom";

function Card({imageURL, title, description, id}:{imageURL:string, title:string, description:string, id:number|string}) {
  return (
    <Main className="w-full sm:max-w-[300px] p-4 ">
      <CardHeader className="pb-0 pt-5 px-4 flex-col items-start gap-2">
        <p className="text-tiny uppercase font-bold">
          {title}
        </p>
        <small className="text-default-500" dangerouslySetInnerHTML={{__html:description}}>
          {}
        </small>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={`${imageURL}`}
          width={280}
        />
      </CardBody>
      <CardFooter>
        <Button size="sm" color="primary">
          <Link to={"/posts/"+ id}>Read More</Link>
        </Button>
      </CardFooter>
    </Main>
  );
}

export default Card;
