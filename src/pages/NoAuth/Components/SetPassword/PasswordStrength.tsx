import { Box } from "@chakra-ui/react";
import React, { useState } from "react";

interface PasswordStrengthProps {
  password: string;
}
const PasswordStrength = ({ password }: PasswordStrengthProps) => {
  const [strength, setStrength] = useState(0);

  // Function to calculate password strength
  const calculateStrength = (password: string) => {
    // Your custom logic to calculate password strength
    let score = 0;
    if (password.match(/[a-z]+/) && password.match(/[A-Z]+/)) {
      score += 1;
    }

    if (password.match(/[0-9]+/)) {
      score += 1;
    }
    if (password.match(/[$@#&!]+/)) {
      score += 1;
    }
    setStrength(score);
  };

  // Calculate strength on password change
  React.useEffect(() => {
    calculateStrength(password);
  }, [password]);
  const renderStrengthColor = () => {
    if (strength === 0 || strength === 1) {
      return "red";
    } else if (strength === 2) {
      return "yellow";
    } else {
      return "green";
    }
  };

  return (
    <Box>
      {password.length > 0 && (
        <Box
          style={{ display: "flex", justifyContent: "flex-start", gap: "12px" }}
        >
          <Box
            style={{
              width: "74px",
              height: "4px",
              borderRadius: "20px",
              backgroundColor: renderStrengthColor()
            }}
          ></Box>
          <Box
            style={{
              width: "74px",
              height: "4px",
              borderRadius: "20px",
              backgroundColor:
                strength >= 2 ? renderStrengthColor() : "transparent"
            }}
          ></Box>
          <Box
            style={{
              width: "74px",
              height: "4px",
              borderRadius: "20px",
              backgroundColor:
                strength === 3 ? renderStrengthColor() : "transparent"
            }}
          ></Box>
        </Box>
      )}
    </Box>
  );
};

export default PasswordStrength;
