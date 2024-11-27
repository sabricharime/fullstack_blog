import { ReactNode, useEffect } from "react";
import { useAppSelector } from "../../redux/hooks/hooks";
import { useNavigate } from "react-router-dom";

function Banned({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.config);

  useEffect(() => {
    if (currentUser?.banned) {
      console.log(currentUser);
      navigate("/bannedPage", { replace: true });
    }
  }, [currentUser, navigate]);

  if (currentUser && currentUser.banned) {
    return null; // Prevent rendering children if user is banned
  }
  return children;
}

export default Banned;
