import { Card } from "@nextui-org/react";

function DashboardHome() {
  return (
    <div className="size-full  py-5 px-10 flex flex-col gap-4">
      <div className="title">
        <h3>
          <small>Dashboard home</small>{" "}
        </h3>
      </div>

      <div className="info grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-10 bg-success ">
          <h3>
            <small>Total Users : 100</small>
          </h3>
        </Card>
        <Card className="p-10 bg-danger ">
          <h3>
            <small>Total Posts : 100</small>
          </h3>
        </Card>
        <Card className="p-10 bg-secondary ">
          <h3>
            <small>Total Views : 100</small>
          </h3>
        </Card>
        <Card className="p-10 bg-secondary ">
          <h3>
            <small>Total Posts Click : 100</small>
          </h3>
        </Card>
      </div>
    </div>
  );
}

export default DashboardHome;
