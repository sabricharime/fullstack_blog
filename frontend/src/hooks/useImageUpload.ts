import { useUploadMutation } from "../redux/api/API";

function useImageUpload() {
  const [upload] = useUploadMutation();

  const imageUpload = async ({
    file,
    fileName,
    fileType,
  }: {
    file: File;
    fileName: string;
    fileType: string;
  }) => {

    try {
      const fileBuffer = await file.arrayBuffer();
      const uint8 = new Uint8Array(fileBuffer);
      const imgData = Array.from(uint8);
      const { data } = await upload({
        imageData: imgData,
        imageName: fileName,
        imageType: fileType,
      });

      console.log(data)
      return data?.url as string;
    } catch (error) {
      console.log(error);
    }
  };

  return [imageUpload] as const;
}

export default useImageUpload;
