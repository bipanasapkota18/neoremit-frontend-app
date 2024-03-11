import { Flex, Spinner } from "@chakra-ui/react";
import { initLogout, useAuthentication } from "@neo/services/service-auth";
import TokenService from "@neo/services/service-token";
import { Suspense, lazy, useEffect } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import ForgotPassword from "../NoAuth/ForgotPassword";
import { appRoutes } from "./appRoutes";
import { NAVIGATION_ROUTES } from "./navigationRoutes";
const Login = lazy(() => import("@neo/pages/NoAuth/Login"));

export default function App() {
  // Check if app is authenticated
  const { data: isAuthenticated } = useAuthentication();

  // const { mutateAsync: logoutUser } = useLogoutMutation(true);

  //  Fetching Initial data in app
  // const { isLoading: isInitDataLoading, isError: isInitDataError } =
  //   useFetchInitData(!!isAuthenticated);

  useEffect(() => {
    if (typeof isAuthenticated === "boolean" && !isAuthenticated) {
      localStorage.getItem("token")
        ? (initLogout(), TokenService.clearToken())
        : null;
    }
  }, [isAuthenticated]);

  // useEffect(() => {
  //   logoutAllTabs();
  // }, []);

  // if ((isInitDataLoading || isAuthLoading) && !isInitDataError) {
  //   return (
  //     <Flex justifyContent={"center"} alignItems="center" height={"100vh"}>
  //       <Spinner />
  //     </Flex>
  //   );
  // }

  return (
    <Suspense
      fallback={
        <Flex justifyContent={"center"} alignItems="center" height={"100vh"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="red.500"
            size="xl"
          />
        </Flex>
      }
    >
      <>
        <Routes>
          {isAuthenticated ? (
            <>
              {appRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element}>
                  {route.children &&
                    route.children.map((childRoute, childIndex) => (
                      <Route
                        key={childIndex}
                        path={childRoute.path}
                        element={childRoute.element}
                        {...(childRoute.index && { index: childRoute.index })}
                      />
                    ))}
                </Route>
              ))}
            </>
          ) : (
            <>
              <Route path="/" element={<Outlet />}>
                <Route index element={<Login />} />
                <Route path={NAVIGATION_ROUTES.LOGIN2} element={<Login />} />

                <Route
                  path={NAVIGATION_ROUTES.FORGOT_PASSWORD}
                  element={<ForgotPassword />}
                />
              </Route>
              <Route
                path="*"
                element={<Navigate to={NAVIGATION_ROUTES.LOGIN} replace />}
              />
            </>
          )}
        </Routes>
      </>
    </Suspense>
  );
}
