import {
  BsFilePdf,
  BsFiletypeCsv,
  BsFiletypeJson,
  BsImage
} from "react-icons/bs";
import { CiFileOn } from "react-icons/ci";
import { FaVideo } from "react-icons/fa";
import { SiMicrosoftexcel } from "react-icons/si";
interface IFile {
  fileName?: string;
  fileType?: string;
}

export const returnType = (item: IFile) => {
  if (item?.fileType?.substring(0, 5) == "image") return "image";
  else if (item?.fileType?.substring(0, 5) == "video") return "video";
  else return "document";
};

export const decideFileIcon = (item: IFile, size?: number) => {
  const extensionList = [
    {
      extension: "json",
      color: "gray",
      icon: <BsFiletypeJson size={size ?? 22} />
    },
    {
      extension: "pdf",
      color: "red",
      icon: <BsFilePdf width={size ?? 22} height={size ?? 22} />
    },
    {
      extension: "xlsx",
      color: "green",
      icon: <SiMicrosoftexcel color="green" size={size ?? 22} />
    },
    {
      extension: "csv",
      color: "green",
      icon: <BsFiletypeCsv color="green" size={size ?? 22} />
    }
    // Add more extensions as needed
  ];

  const fileTypeList = [
    {
      fileType: "image",
      icon: <BsImage width={size ?? 22} height={size ?? 22} />
    },
    {
      fileType: "video",
      icon: <FaVideo width={size ?? 22} height={size ?? 22} />
    }
    // Add more file types as needed
  ];

  const fileExtension = item?.fileName?.split(".").pop();

  if (fileExtension) {
    const extensionObj = extensionList.find(
      ext => ext.extension === fileExtension
    );
    if (extensionObj) {
      return extensionObj.icon;
    }
  }

  const fileType = item?.fileType;

  if (fileType) {
    const fileTypeObj = fileTypeList.find(type =>
      fileType.startsWith(type.fileType)
    );
    if (fileTypeObj) {
      return fileTypeObj.icon;
    }
  }

  return <CiFileOn />;
};
