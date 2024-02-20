import { colorScheme } from "@neo/theme/colorScheme";
import { CloseIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  CloseButton,
  GridItem,
  HStack,
  Image,
  keyframes,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { FileRejection } from "react-dropzone";
import {
  defaultMaxSize,
  IDropzoneComponentControlledProps,
  IPreview
} from "..";
import { decideFileIcon, returnType } from "../utils";

const progress = keyframes`
  from{
    width: 0%
  }
  to{
    width: 100%
  }
  `;

interface IMultipleUploadPlugin {
  rejectedFileList: FileRejection[];
  setRejectedFileList: Dispatch<SetStateAction<FileRejection[]>>;
  isMultiple?: boolean;
  previewColumnsNo?: IDropzoneComponentControlledProps["options"]["previewColumnsNo"];
  setAcceptedFileList: Dispatch<SetStateAction<Blob[]>>;
  preview: IPreview[];
  setPreview: Dispatch<SetStateAction<IPreview[]>>;
  maxSize?: number;
}

export const MultipleUploadPlugin = ({
  preview,
  setPreview,
  rejectedFileList,
  setRejectedFileList,
  isMultiple,
  previewColumnsNo,
  setAcceptedFileList,
  maxSize
}: IMultipleUploadPlugin) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <>
      {(preview.length > 1 || rejectedFileList.length > 1) && (
        <Button
          mt={4}
          leftIcon={<CloseIcon width={3} height={3} />}
          colorScheme={colorScheme.chakraScheme}
          variant="ghost"
          onClick={e => {
            e.stopPropagation();
            setPreview([]);
            setAcceptedFileList([]);
            setRejectedFileList([]);
          }}
        >
          Remove All
        </Button>
      )}
      {isMultiple && (
        <SimpleGrid
          columns={previewColumnsNo ?? { xl: 4, lg: 3, md: 2, sm: 1 }}
          spacing={2}
          mt={2}
        >
          {preview.map((item, index) => {
            const isImage = returnType(item) == "image";
            const isVideo = returnType(item) == "video";
            return (
              <GridItem
                key={index}
                colSpan={1}
                cursor={isImage ? "pointer" : "initial"}
              >
                <Popover
                  returnFocusOnClose={false}
                  isOpen={isOpen && imageIndex == index && isImage}
                  onClose={onClose}
                  placement="top"
                  closeOnBlur={false}
                >
                  <PopoverContent>
                    <PopoverBody>
                      <Box>
                        <Image
                          src={preview[index]?.link}
                          objectFit="cover"
                          margin={"0 !important"}
                        />
                      </Box>
                    </PopoverBody>
                  </PopoverContent>

                  <PopoverTrigger>
                    <HStack
                      bg={"gray.50"}
                      p={2}
                      borderRadius={4}
                      onClick={() =>
                        isImage && window.open(preview[index]?.link)
                      }
                      onMouseEnter={() => {
                        onOpen();
                        setImageIndex(index);
                      }}
                      onMouseLeave={() => {
                        onClose();
                        setImageIndex(0);
                      }}
                    >
                      {isImage ? (
                        <Image
                          src={preview[index]?.link}
                          objectFit="cover"
                          margin={"0 !important"}
                          height={22}
                          width={22}
                        />
                      ) : (
                        decideFileIcon(item)
                      )}
                      <Text flex={1} noOfLines={[1]}>
                        {item.fileName}
                      </Text>
                      <CloseButton
                        onClick={e => {
                          e.stopPropagation();
                          setPreview(prev => {
                            return prev.filter((each, i) => i !== index);
                          });
                          setAcceptedFileList(prev => {
                            return prev.filter((each, i) => i !== index);
                          });
                        }}
                      />
                    </HStack>
                  </PopoverTrigger>
                </Popover>

                <Box
                  css={{
                    width: "0%",
                    height: "2px",
                    background: isImage
                      ? colorScheme.chakraScheme
                      : isVideo
                        ? "blue"
                        : "red",
                    animation: `1.5s ${progress}`
                  }}
                />
              </GridItem>
            );
          })}
        </SimpleGrid>
      )}
      <SimpleGrid columns={1} spacing={2} mt={isMultiple ? 2 : 0}>
        {rejectedFileList.map((rejectedItem, index) => {
          return (
            <GridItem key={index}>
              <Alert status="error" flexWrap={"wrap"}>
                <AlertIcon />
                <Text as="b" mr={2}>
                  {rejectedItem.file.name}{" "}
                </Text>
                <Text mr={2}>File not uploaded</Text>
                <Text flex={1}>
                  {rejectedItem.errors[0].code == "file-too-large"
                    ? `File is large than ${
                        maxSize ? maxSize + " MB" : `${defaultMaxSize}MB`
                      }`
                    : rejectedItem.errors[0].message}
                </Text>
                <CloseButton
                  onClick={e => {
                    e.stopPropagation();
                    setRejectedFileList(prev => {
                      return prev.filter((each, i) => i !== index);
                    });
                  }}
                  justifySelf="flex-end"
                />
              </Alert>
            </GridItem>
          );
        })}
      </SimpleGrid>
    </>
  );
};
