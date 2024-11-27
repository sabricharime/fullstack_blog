import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks/hooks";
import { ReactNode } from "react";

const Protected = ({ children }: { children: ReactNode }) => {
  const isAuth = useAppSelector((state) => state.config.isAuth);

  return isAuth ? children : <Navigate to="/auth" />;
};

export default Protected;
