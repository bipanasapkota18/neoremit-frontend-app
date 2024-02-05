import {
  Flex,
  FlexProps,
  ThemingProps,
  useStyleConfig
} from "@chakra-ui/react";

export interface AppBarProps extends FlexProps {
  // Extend with FlexProps
  children?: React.ReactNode;
  variants?: ThemingProps;
}

const AppBar = (props: AppBarProps) => {
  const { children, variants, ...rest } = props;
  const styles = useStyleConfig("AppBar", variants);

  return (
    <Flex __css={styles} {...rest}>
      {children}
    </Flex>
  );
};

export default AppBar;
