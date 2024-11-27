interface uploadParams {
  fileBuffer: ArrayBuffer;
  fileName: string;
  fileType: string;
  upload: (params: {
    imageData: number[];
    imageName: string;
    imageType: string;
  }) => Promise<{ data: { url: string } }>;
}

const imageuploader = async ({
  fileBuffer,
  fileName,
  fileType,
  upload,
}: uploadParams): Promise<string | null> => {
  try {
    const uint8 = new Uint8Array(fileBuffer);
    const imageData = Array.from(uint8);
    const {
      data: { url },
    } = await upload({
      imageData: imageData,
      imageName: fileName,
      imageType: fileType,
    });

    if (url) return url;
  } catch (error) {
    if (error) throw new TypeError("Error Upload File ");
  }

  return null;
};

export default imageuploader;
