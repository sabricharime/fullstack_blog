import { Button, Input } from "@nextui-org/react";
import { FormEvent, useEffect, useState } from "react";
import Quill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import useImagePreview from "../../../hooks/useImagePreview";
import { useAppSelector } from "../../../redux/hooks/hooks";
import { AiOutlineUpload } from "react-icons/ai";
import { useCreatePostMutation } from "../../../redux/api/API";
import useImageUpload from "../../../hooks/useImageUpload";
import { toast } from "react-toastify";

function AddPost() {
  const [previewFile] = useImagePreview();
  const { showImageLogin: show, fileImageLogin: image } = useAppSelector(
    (state) => state.config
  );
  const [uploadImage] = useImageUpload();
  const [createPost, {isLoading}] = useCreatePostMutation();
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      ["link", "image"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "link",
    "image",
    "list",
    "bullet",
    "indent",
    "align",
    "color",
    "background",
  ];

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      formData.append("content", value);

      const data = Object.fromEntries(formData);
      const file = data.cover as File;

      const res = await uploadImage({
        file,
        fileName: file.name,
        fileType: file.type,
      });


      const post = await createPost({
        content: JSON.stringify(data.content),
        imageURL: res,
        title: data.title,
      });

      if (post.data) {
        toast.success("Post created successfully", {
          position: "bottom-left",
          theme: "dark",
        });
        navigate(`/posts/${post.data?.id}`);
      }

      console.log(post);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div className="flex flex-col-reverse gap-x-6 min-h-80 px-6">
      <div className="flex flex-col justify-start">
        <Button
          startContent={<FaArrowLeft />}
          variant="bordered"
          color="danger"
          onClick={() => navigate("/dashboard")}
        >
          {" "}
          <small>CANCEL AND BACK To DASHBOARD </small>
        </Button>
        <div
          className="p-4 md:p-20"
          dangerouslySetInnerHTML={{ __html: value }}
        ></div>
      </div>
      <form className="flex flex-col gap-3" onSubmit={submitHandler}>
        <div className="row flex gap-2 items-center justify-between">
          <Input
            name="title"
            label={"Post title "}
            variant="underlined"
            color="primary"
            placeholder="Your post title here "
          />
        </div>
        <div className="form-group flex items-center justify-center gap-4">
          <label
            htmlFor="doc"
            className="flex flex-col items-center gap-2 bg-primary-50 py-2 px-4 rounded-md cursor-pointer w-[400px] h-[200px]"
          >
            <AiOutlineUpload size={26} className="fill-primary" />
            <div className="space-y-2 w-full">
              <h4 className="text-center font-semibold text-foreground-300">
                Upload Image cover
              </h4>
              <h6 className="text-sm text-gray-500 text-center">
                <small>
                  <span>Max 2 MO</span>
                </small>
              </h6>
            </div>
            <div className="preview">
              <img
                src={image}
                alt="po"
                width={80}
                className={`rounded-full ${show ? "inline-block" : "hidden"}`}
              />
            </div>
            <input
              type="file"
              id="doc"
              name="cover"
              className="hidden"
              onChange={previewFile}
            />
          </label>
        </div>
        <Quill
          className="mb-32 max-h-[60vh] overflow-y-scroll min-h-[80vh]"
          value={value}
          onChange={setValue}
          modules={modules}
          formats={formats}
          theme="snow"
        />

        <Button variant="solid" color="primary" type="submit" className="mb-5" isLoading={isLoading} isDisabled={isLoading}>
          {isLoading? "Adding Post please wait moment ..." :"Create"}
        </Button>
      </form>
    </div>
  );
}

export default AddPost;
