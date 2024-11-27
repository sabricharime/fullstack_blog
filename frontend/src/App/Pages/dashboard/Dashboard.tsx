import { Button, Card, CardBody, CardFooter } from "@nextui-org/react";
import React from "react";
import {
  AiFillSetting,
  AiOutlineArrowRight,
  AiOutlineTeam,
} from "react-icons/ai";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks/hooks";

const Dashboard = () => {
  const { currentUser } = useAppSelector((state) => state.config);
  const navigate = useNavigate();
  const handleNavigate = (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetToURLString = (str: string) =>
      String(str).toLowerCase().trim().replace(/ /g, "_");
    const target = e.currentTarget.children[1].children[0]
      .textContent as string;
    console.log(target);
    navigate(targetToURLString(target));
  };

  return (
    <div className="  grid grid-cols-1 md:grid-cols-3 min-h-screen bg-background-400 mb-10">
      {/* Header */}
      <div className="col-span-1 hidden  sm:flex flex-col  gap-5  ">
        <div className="w-full grid place-items-center pt-5">
          <Card className=" max-w-[300px] w-full ">
            <CardBody className="grid place-items-center">
              <img
                src={currentUser.avatar}
                alt="Avatar"
                width={120}
                height={120}
                className="rounded-full"
              />
            </CardBody>
            <CardFooter>
              <h5 className="text-foreground w-full text-center ">
                <small>{currentUser.username}</small>
              </h5>
            </CardFooter>
          </Card>
        </div>
        <div className="w-full grid place-items-center">
          <Card className=" max-w-[300px] w-full ">
            <CardBody className="grid grid-cols-1 gap-4 ">
              <Button
                className="justify-between"
                startContent={<AiFillSetting size={20} />}
                variant="flat"
                color="primary"
                endContent={<AiOutlineArrowRight size={20} />}
                onClick={handleNavigate}
              >
                <h6>
                  <small>Manage Posts</small>
                </h6>
              </Button>
              <Button
                className="justify-between"
                startContent={<AiOutlineTeam size={20} />}
                variant="flat"
                color="primary"
                endContent={<AiOutlineArrowRight size={20} />}
                onClick={handleNavigate}
              >
                <h6>
                  <small>Manage Users </small>
                </h6>
              </Button>{" "}
              <Button
                className="justify-between"
                startContent={<AiFillSetting size={20} />}
                variant="flat"
                color="primary"
                endContent={<AiOutlineArrowRight size={20} />}
                onClick={handleNavigate}
              >
                <h6>
                  <small>Manage Messages</small>
                </h6>
              </Button>
              <Button
                className="justify-between"
                startContent={<AiFillSetting size={20} />}
                variant="flat"
                color="primary"
                endContent={<AiOutlineArrowRight size={20} />}
                onClick={handleNavigate}
              >
                <h6>
                  <small>Other</small>
                </h6>
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="sideBar col-span-2 bg-background-500 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
