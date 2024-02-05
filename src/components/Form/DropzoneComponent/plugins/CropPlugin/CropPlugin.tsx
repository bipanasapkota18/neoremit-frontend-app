import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure
} from "@chakra-ui/react";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useImperativeHandle,
  useState
} from "react";
import Cropper from "react-easy-crop";
import { FiRotateCcw, FiRotateCw } from "react-icons/fi";
import { CropPluginRef, IPreview } from "../..";
import getCroppedImg, { IPixelCrop } from "./cropFunction";

export interface ICropPlugin {
  imageList: Blob[];
  setAcceptedFileList: Dispatch<SetStateAction<Blob[]>>;
  setImageList: Dispatch<SetStateAction<Blob[]>>;
  preview: IPreview[];
  setPreview: Dispatch<SetStateAction<IPreview[]>>;
  cropPluginRef: RefObject<CropPluginRef>;
}

export default function CropPlugin({
  imageList,
  setAcceptedFileList,
  setImageList,
  preview,
  setPreview,
  cropPluginRef
}: ICropPlugin) {
  const {
    isOpen: isEditOpem,
    onOpen: onEditOpen,
    onClose: onEditClose
  } = useDisclosure();
  const [rotation, setRotation] = useState(0);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedImage, setCroppedImage] = useState<{
    blob: Blob;
    blobPath: string;
  } | null>(null);

  const showCroppedImage = async (croppedPixel: IPixelCrop) => {
    try {
      const croppedImages = await getCroppedImg(
        URL.createObjectURL(imageList[0]),
        croppedPixel,
        rotation
      );
      setCroppedImage(croppedImages);
    } catch (e) {
      console.error(e);
    }
  };

  const onCropComplete = (_: IPixelCrop, croppedAreaPixels: IPixelCrop) => {
    showCroppedImage(croppedAreaPixels);
  };

  const saveCroppedImage = () => {
    onEditClose();

    croppedImage && setAcceptedFileList([croppedImage?.blob]);
    croppedImage && setImageList([croppedImage?.blob]);
    setPreview([
      { link: croppedImage ? URL.createObjectURL(croppedImage?.blob) : "" }
    ]);
  };

  useImperativeHandle(cropPluginRef, () => ({
    clearCropImages() {
      setCroppedImage(null);
    }
  }));

  return (
    <>
      <Tooltip label="Edit" placement="top">
        <IconButton
          variant="outline"
          aria-label="Edit"
          onClick={e => {
            e.stopPropagation();
            setRotation(0);
            onEditOpen();
          }}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Modal size="2xl" isOpen={isEditOpem} onClose={onEditClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalCloseButton />
            <ModalHeader pb={0}>
              <Text>Edit Image</Text>
            </ModalHeader>
            <ModalBody>
              <Cropper
                style={{
                  containerStyle: {
                    border: "1px solid #69696965",
                    position: "relative",
                    overflow: "hidden"
                  }
                }}
                aspect={3 / 2}
                cropShape="rect"
                crop={crop}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                showGrid={false}
                image={preview[0]?.link}
                rotation={rotation}
                onRotationChange={setRotation}
                objectFit="horizontal-cover"
              />
            </ModalBody>
            <ModalFooter>
              <HStack justifyContent={"flex-start"} mb={2}>
                <Tooltip label="Rotate left" placement="top">
                  <IconButton
                    variant="outline"
                    aria-label="Edit"
                    onClick={() => {
                      setRotation(rotation - 90);
                    }}
                  >
                    <FiRotateCcw />
                  </IconButton>
                </Tooltip>
                <Tooltip label="Rotate right" placement="top">
                  <IconButton
                    variant="outline"
                    aria-label="Edit"
                    onClick={() => {
                      setRotation(rotation + 90);
                    }}
                  >
                    <FiRotateCw />
                  </IconButton>
                </Tooltip>
                <Button onClick={saveCroppedImage}>Save</Button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
}
