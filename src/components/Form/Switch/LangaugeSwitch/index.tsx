import { imageAssets } from "@/assets/images";
import { Switch } from "@chakra-ui/react";
import { useState } from "react";

const LanguageSwitch = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Switch
      isChecked={isChecked}
      onChange={handleChange}
      size="lg"
      sx={{
        "& > *": { transition: "all 0.3s ease" },
        "& .chakra-switch__track": {
          outline: "2px solid rgba(32, 73, 160,0.3)",
          px: 1,
          backgroundColor: "#1a3266",
          width: "55px",
          borderRadius: "full",
          color: "white",
          "&:after": {
            position: "absolute",
            width: "80%",
            height: "90%",
            content: "'ने'",
            display: "flex",
            lineHeight: "normal",
            color: "white",
            p: 0,
            pr: 1.5,
            justifyContent: "flex-end",
            alignItems: "center",
            opacity: 1
          },
          "&:before": {
            position: "absolute",
            width: "100%",
            height: "90%",
            content: "'|'",
            display: "flex",
            color: "white",
            pr: 1.5,
            alignItems: "center",
            justifyContent: "center",
            opacity: 1
          },
          _checked: {
            backgroundColor: "#1a3266",
            "&:after": {
              content: "'|'",
              pl: 1.5,
              justifyContent: "center"
            },
            "&:before": {
              position: "absolute",
              width: "100%",
              height: "90%",
              content: "'En'",
              display: "flex",
              color: "white",
              p: 0,
              pl: 1,
              alignItems: "center",
              justifyContent: "start",
              opacity: 1
            }
          }
        },
        "& > span": {
          width: "100%",
          justifyContent: "space-between"
        },
        "& .chakra-switch__thumb": {
          zIndex: 100,
          transition: "transform 0.3s ease",
          bg: "white",
          overflow: "hidden",
          width: "25px",
          _checked: {
            transform: "translateX(120%)"
          },
          "&:after": {
            content: "''",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "block",
            width: "100%",
            height: "100%",
            backgroundImage: isChecked
              ? `url(${imageAssets.NepalFlag})`
              : `url(${imageAssets.UkFlag})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: "1"
          }
        }
      }}
    ></Switch>
  );
};

export default LanguageSwitch;
