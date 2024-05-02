import { Box } from "@chakra-ui/layout";
import { Flex, Heading } from "@chakra-ui/react";
import { svgAssets } from "@neo/assets/images/svgs";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { useLocation } from "react-router-dom";
import BaseRate from "../BaseRate";
import State from "../State";
import KycSetup from "../kycSetup";
import AddCountry from "./AddCountry";

export const CounrtyDetails = () => {
  const { nextStep, prevStep, activeStep, setStep } = useSteps({
    initialStep: 0
  });
  const location = useLocation();

  const steps = [
    {
      label: "Country Details",
      icon: svgAssets.CountryDetails,
      component: <AddCountry stepProps={{ nextStep, prevStep }} />
    },
    {
      label: "State Setup",
      icon: svgAssets.StateSetup,
      component: <State stepProps={{ nextStep, prevStep }} />
    },
    {
      label: "Base Rate Setup",
      icon: svgAssets.BaseRate,
      component: <BaseRate stepProps={{ nextStep, prevStep }} />
    },
    {
      label: "KYC Setup",
      icon: svgAssets.KycSetup,
      component: <KycSetup stepProps={{ nextStep, prevStep }} />
    }
  ];
  // const isLastStep = activeStep === steps.length - 1;
  const hasCompletedAllSteps = activeStep === steps.length;
  const bg = "white";

  return (
    <Flex flexDir="column" width="100%" userSelect={"none"}>
      <Steps
        onClickStep={i => {
          location?.state?.countryId
            ? setStep(i)
            : activeStep > i
              ? setStep(i)
              : null;
        }}
        variant={"circles-alt"}
        colorScheme="purple"
        style={{
          padding: 4,
          boxShadow: "md"
        }}
        activeStep={activeStep}
      >
        {steps.map(({ label, icon, component }) => (
          <Step label={label} key={label} icon={icon}>
            <Box sx={{ bg, my: 8, rounded: "md" }}>{component}</Box>
          </Step>
        ))}
      </Steps>
      {hasCompletedAllSteps && (
        <Box sx={{ bg, my: 8, p: 8, rounded: "md" }}>
          <Heading fontSize="xl" textAlign={"center"}>
            Woohoo! All steps completed! 🎉
          </Heading>
        </Box>
      )}
      {/* <Flex width="100%" justify="flex-end" gap={4}>
        {hasCompletedAllSteps ? (
          <Button size="sm" onClick={reset}>
            Reset
          </Button>
        ) : (
          <>
            <Button
              isDisabled={activeStep === 0}
              onClick={prevStep}
              size="sm"
              variant="ghost"
            >
              Prev
            </Button>
            <Button size="lg" onClick={nextStep}>
              {isLastStep ? "Finish" : "Next"}
            </Button>
          </>
        )}
      </Flex> */}
    </Flex>
  );
};
