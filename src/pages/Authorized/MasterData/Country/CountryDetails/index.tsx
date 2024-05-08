import { Box } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { svgAssets } from "@neo/assets/images/svgs";
import BreadCrumb from "@neo/components/BreadCrumb";
import breadcrumbTitle from "@neo/components/SideBar/breadcrumb";
import { NAVIGATION_ROUTES } from "@neo/pages/App/navigationRoutes";
import { useGetCountryById } from "@neo/services/MasterData/service-country";
import { colorScheme } from "@neo/theme/colorScheme";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import BaseRate from "../BaseRate";
import State from "../State";
import KycSetup from "../kycSetup";
import AddCountry from "./AddCountry";

export const CounrtyDetails = () => {
  const { nextStep, prevStep, activeStep, setStep } = useSteps({
    initialStep: 0
  });
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const isNewCountry = searchParams?.get("isNewCountry") ?? false;

  const { data: countryById } = useGetCountryById(
    Number(searchParams.get("countryId"))
  );

  const steps = [
    {
      label: "Country Details",
      icon: svgAssets.CountryDetails,
      component: <AddCountry stepProps={{ nextStep, prevStep }} />
    },
    ...(searchParams?.get("hasState") === "true" || countryById?.hasState
      ? [
          {
            label: "State Setup",
            icon: svgAssets.StateSetup,
            component: <State stepProps={{ nextStep, prevStep }} />
          }
        ]
      : []),
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

  const hasCompletedAllSteps = activeStep === steps.length;

  if (hasCompletedAllSteps) {
    navigate(NAVIGATION_ROUTES.COUNTRY_SETUP);
  }
  const bg = "white";

  const { pathname } = useLocation();
  const activePath = breadcrumbTitle(pathname);

  return (
    <Flex flexDir="column" gap={"16px"} width="100%" userSelect={"none"}>
      <BreadCrumb currentPage="Country Setup" options={activePath} />

      <Steps
        onClickStep={i => {
          !isNewCountry ? setStep(i) : activeStep > i ? setStep(i) : null;
        }}
        variant={"circles-alt"}
        colorScheme="none"
        sx={{
          backgroundColor: "#FFF",
          padding: "24px",
          borderRadius: "32px",
          border: "1px solid  #E2E8F0",
          boxShadow: "md",

          "& .cui-steps__horizontal-step-container": {
            display: "flex",
            width: "100%",
            justifyContent: "flex-start",
            columnGap: 3,
            position: "relative"
          },
          "& .cui-steps__horizontal-step": {
            "&::after": {
              backgroundColor: "#CBD5E0 !important",
              borderRadius: "4px !important"
            },
            display: "flex",
            justifyContent: "space-between",
            padding: "0 1%",
            minWidth: "230px",
            "& .cui-steps__step-icon-container": {
              backgroundColor: `${colorScheme.primary_100}`,
              _activeStep: {
                backgroundColor: `${colorScheme.primary_500}`,
                svg: {
                  path: {
                    fill: "#EFEAF4"
                  }
                }
              }
            },
            _active: {
              span: {
                color: "#2D3748"
              }
            }
          }
        }}
        activeStep={activeStep}
      >
        {steps.map(({ label, icon, component }) => (
          <Step checkIcon={icon} label={label} key={label} icon={icon}>
            <Box sx={{ bg, my: 8, rounded: "md" }}>{component}</Box>
          </Step>
        ))}
      </Steps>
    </Flex>
  );
};
