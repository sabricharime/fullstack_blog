import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks/hooks";
import { ReactNode } from "react";

function AdminRoute({ children }: { children: ReactNode }) {
  const { isAdmin } = useAppSelector((state) => state.config);

  if (isAdmin) {
    return children;
  }

  return <Navigate to="/auth" replace={true} />;
}

export default AdminRoute;
