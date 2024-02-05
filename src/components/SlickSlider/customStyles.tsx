import { Box, BoxProps, ThemingProps, useStyleConfig } from "@chakra-ui/react";

export interface SliderDotProps extends BoxProps {
  children?: React.ReactNode;
  variants?: ThemingProps;
}

function SliderWrapper(props: SliderDotProps) {
  const { variants, children, ...rest } = props;
  const styles = useStyleConfig("SliderWrapperTheme", variants);

  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}

export default SliderWrapper;
