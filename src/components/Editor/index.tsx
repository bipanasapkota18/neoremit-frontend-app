import { InfoIcon } from "@chakra-ui/icons";
import {
  Box,
  CircularProgress,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  ListItem,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  UnorderedList,
  useDisclosure
} from "@chakra-ui/react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { convert } from "html-to-text";
import { debounce } from "lodash";
import { useCallback, useMemo, useState } from "react";
import { Control, Controller } from "react-hook-form";
import sanitizeHtml from "sanitize-html";
import { colorScheme } from "../../theme/colorScheme";

interface IEditor {
  onChange?: (data: string) => void;
  onBlur?: (data: string | undefined) => void;
  onInit?: (editor: ClassicEditor) => void;
  name: string;
  control: Control<any>;
  isRequired?: boolean;
  label?: string;
  hasWordCount?: boolean;
  hasSmsCount?: boolean;
}

export const parseBoxStyle = {
  h1: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginTop: "1.5rem",
    marginBottom: "1rem"
  },
  h2: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginTop: "1.5rem",
    marginBottom: "1rem"
  },
  h3: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    marginTop: "1.5rem",
    marginBottom: "1rem"
  },
  h4: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    marginTop: "1.5rem",
    marginBottom: "1rem"
  },
  h5: {
    fontSize: "1rem",
    fontWeight: "bold",
    marginTop: "1.5rem",
    marginBottom: "1rem"
  },
  h6: {
    fontSize: "0.9rem",
    fontWeight: "bold",
    marginTop: "1.5rem",
    marginBottom: "1rem"
  },
  ul: {
    paddingLeft: "1.5rem",
    marginTop: "0.5rem",
    marginBottom: "0.5rem"
  },
  ol: {
    paddingLeft: "1.5rem",
    marginTop: "0.5rem",
    marginBottom: "0.5rem"
  },
  li: {
    marginTop: "0.25rem",
    marginBottom: "0.25rem"
  },
  "em, i": {
    fontStyle: "italic"
  },
  u: {
    textDecoration: "underline"
  },
  "strong, b": {
    fontWeight: "bold"
  }
};

const Editor = ({
  onInit,
  onBlur,
  name,
  control,
  isRequired,
  label,
  hasWordCount,
  hasSmsCount
}: IEditor) => {
  const {
    isOpen: isSmsCountInfoOpen,
    onOpen: onOpenSmsCountInfo,
    onClose: onCloseSmsCountInfo
  } = useDisclosure();
  const [wordCount, setWordCount] = useState<number | null>(
    null as number | null
  );

  const [currentRule, setCurrentRule] = useState("");

  const [value, setValue] = useState("");
  const [isDebouncing, setIsDebouncing] = useState(false);

  const debouncedSearchFunction = useCallback((value: string) => {
    setValue(value);
    setIsDebouncing(false);
  }, []);

  const debouncedOnSearch = useMemo(() => {
    return debounce(debouncedSearchFunction, 1000);
  }, [setValue]);

  const handleChange = (value: string) => {
    setIsDebouncing(true);
    // setValue(value);
    debouncedOnSearch(value);
  };

  const smsCount: number = useMemo(() => {
    let smsCharacterLength = wordCount ?? 0;
    let smsCount = 0;
    if (value == "") {
      setCurrentRule("");
      return 0;
    } else {
      const cleanValue = sanitizeHtml(value ?? "", {
        allowedTags: [],
        exclusiveFilter: (frame: any) => frame.text.trim() !== ""
      });
      const unicodeRegex = new RegExp(/[\u0900-\u097F]+/);
      if (unicodeRegex.test(cleanValue)) {
        if (smsCharacterLength <= 70) {
          setCurrentRule("uni_1");
          smsCount = 1;
        } else if (smsCharacterLength > 70 && smsCharacterLength <= 133) {
          setCurrentRule("uni_2");
          smsCount = 2;
        } else {
          setCurrentRule("uni_3");
          smsCharacterLength -= 133;
          smsCount = Math.ceil(smsCharacterLength / 67) + 2;
        }
      } else {
        if (smsCharacterLength <= 160) {
          setCurrentRule("nor_1");
          smsCount = 1;
        } else if (smsCharacterLength > 160 && smsCharacterLength <= 306) {
          setCurrentRule("nor_2");
          smsCount = 2;
        } else {
          setCurrentRule("nor_3");
          smsCharacterLength -= 306;
          smsCount = Math.ceil(smsCharacterLength / 153) + 2;
        }
      }
    }
    return smsCount;
  }, [value]);

  const SmsListItem = ({
    character,
    value,
    active
  }: {
    character: string;
    value: string;
    active: boolean;
  }) => {
    return (
      <ListItem>
        {character} characters:{" "}
        <Text
          fontSize="sm"
          fontWeight="bold"
          mb={2}
          display={"inline"}
          color={active ? "orange" : "inherit"}
        >
          {value}
        </Text>
      </ListItem>
    );
  };
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <>
            <FormControl
              isRequired={!!isRequired}
              isInvalid={!!error}
              id={name}
              sx={parseBoxStyle}
            >
              <Box pos="relative" mt={3}>
                <FormLabel
                  sx={{
                    position: "absolute",
                    zIndex: 1,
                    top: -4,
                    marginLeft: 1,
                    mb: 0,
                    color: "gray.500",
                    fontSize: "small",
                    background: "white",
                    borderRadius: 6,
                    px: 2
                  }}
                >
                  {label}
                </FormLabel>
                <CKEditor
                  editor={ClassicEditor}
                  data={value}
                  config={{
                    removePlugins: ["EasyImage", "ImageUpload", "MediaEmbed"]
                    // editorConfig: {
                    //   extraAllowedContent: "ul li ol",
                    //   contentsCss: [editorCss]
                    // }
                  }}
                  onReady={(editor: any) => {
                    editor?.editing.view.change((writer: any) => {
                      writer.setStyle(
                        "height",
                        "200px",
                        editor.editing.view.document.getRoot()
                      );
                    });
                    editor?.editing.view.change((writer: any) => {
                      writer.setStyle(
                        "padding-left",
                        "24px",
                        editor.editing.view.document.getRoot()
                      );
                    });
                    onInit && onInit(editor);
                  }}
                  onChange={(event: any, editor: any) => {
                    const data = editor.getData();
                    handleChange(data);
                    setWordCount(
                      convert(data, {
                        wordwrap: 130
                      }).length
                    );
                    onChange && onChange(data);
                  }}
                  onBlur={() => {
                    onBlur && onBlur(value);
                  }}
                />
              </Box>
              <HStack
                justifyContent={
                  hasSmsCount && hasWordCount ? "space-between" : "flex-end"
                }
              >
                {hasSmsCount && (
                  <Popover
                    returnFocusOnClose={false}
                    isOpen={isSmsCountInfoOpen}
                    onClose={onCloseSmsCountInfo}
                    placement="top"
                    closeOnBlur={false}
                  >
                    <PopoverContent minW={"400px"}>
                      <PopoverBody>
                        <Box>
                          <Text fontSize="lg" fontWeight="bold" mb={2}>
                            SMS Counting Rules:
                          </Text>

                          <Text
                            fontSize="sm"
                            fontWeight="bold"
                            mb={2}
                            color={
                              currentRule.includes("uni") ? "orange" : "inherit"
                            }
                          >
                            Unicode Text:
                          </Text>
                          <UnorderedList fontSize="sm" pl={4}>
                            <SmsListItem
                              character="1 - 70"
                              value="1 SMS"
                              active={currentRule.includes("uni_1")}
                            />
                            <SmsListItem
                              character="71 - 133"
                              value="2 SMS"
                              active={currentRule.includes("uni_2")}
                            />
                            <SmsListItem
                              character="> 133"
                              value="RoundUp(((characters - 133) / 67) + 2)"
                              active={currentRule.includes("uni_3")}
                            />
                          </UnorderedList>

                          <Text
                            fontSize="sm"
                            fontWeight="bold"
                            mt={4}
                            mb={2}
                            color={
                              currentRule.includes("nor") ? "orange" : "inherit"
                            }
                          >
                            Normal Text (Non-Unicode):
                          </Text>
                          <UnorderedList fontSize="sm" pl={4}>
                            <SmsListItem
                              character="1 - 160"
                              value="1 SMS"
                              active={currentRule.includes("nor_1")}
                            />
                            <SmsListItem
                              character="161 - 306"
                              value="2 SMS"
                              active={currentRule.includes("nor_2")}
                            />
                            <SmsListItem
                              character="> 306"
                              value="RoundUp(((characters - 306) / 153) + 2)"
                              active={currentRule.includes("nor_3")}
                            />
                          </UnorderedList>
                        </Box>
                      </PopoverBody>
                    </PopoverContent>

                    <PopoverTrigger>
                      <HStack color={colorScheme.gray_500}>
                        <InfoIcon
                          onMouseEnter={onOpenSmsCountInfo}
                          onMouseLeave={onCloseSmsCountInfo}
                        />
                        <Text>SMS Count : </Text>
                        {isDebouncing ? (
                          <CircularProgress
                            isIndeterminate
                            size={3}
                            color="purple"
                          />
                        ) : (
                          <Text>{smsCount ?? 0}</Text>
                        )}
                      </HStack>
                    </PopoverTrigger>
                  </Popover>
                )}
                {hasWordCount && (
                  <Text color={colorScheme.gray_500}>
                    Word Count: {wordCount ?? 0}
                  </Text>
                )}
              </HStack>
              <FormErrorMessage>{error ? error?.message : ""}</FormErrorMessage>
            </FormControl>
          </>
        );
      }}
    />
  );
};

export default Editor;
