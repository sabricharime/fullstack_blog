import { ChangeEvent } from "react";
import { useAppDispatch } from "../redux/hooks/hooks";
import {
  setFileImageLogin,
  showImagelogin,
} from "../redux/slices/config.slice";

function useImagePreview() {

  const dispatch = useAppDispatch();
  const previewFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];


    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.result) {
        console.log(fileReader.result);
        dispatch(setFileImageLogin(fileReader.result as string));
        dispatch(showImagelogin(true));
      }
    };
    fileReader.readAsDataURL(file);
  };

  return [previewFile];
}

export default useImagePreview;
