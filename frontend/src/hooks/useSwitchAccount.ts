import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { setHasAccount } from "../redux/slices/config.slice";

function useSwitchAccount() {
  const dispatch = useAppDispatch();
  const { hasAccount } = useAppSelector((state) => state.config);

  const switchAccount = () => dispatch(setHasAccount(!hasAccount));

  return [switchAccount];
}

export default useSwitchAccount;
