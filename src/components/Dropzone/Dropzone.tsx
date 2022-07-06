import { useDropzone, type DropzoneProps } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { Paper } from "components";
import cn from "classnames";

type Props = DropzoneProps & {};

const Dropzone = ({ onDrop }: Props) => {
  const { t } = useTranslation();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png"],
    },
  });

  return (
    <Paper
      {...getRootProps()}
      className={cn(
        "border-dashed px-20 py-40 flex justify-center align-center"
      )}
    >
      <input
        {...getInputProps()}
        multiple={false}
        accept="image/*"
        type="file"
        className={cn("w-0 h-0")}
      />
      {isDragActive ? (
        <div className="bg-white py-2 px-8 font-bold rounded cursor-pointer">
          {t("Drop the file here...")}
        </div>
      ) : (
        <div
          className={cn(
            "bg-black py-2 px-8 text-white font-bold rounded cursor-pointer"
          )}
        >
          {t("Click or drag here to upload")}
        </div>
      )}
    </Paper>
  );
};

export default Dropzone;
