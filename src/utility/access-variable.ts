import { useStoreInitData } from "@neo/store/initData";

export interface IAccessVariables {
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  canCreate: boolean;
  canDownload: boolean;
}

export const useGetAccessVariables = (moduleName: string) => {
  const { initData } = useStoreInitData();
  const currentModuleScope = initData?.moduleList?.filter(
    item => item.moduleCode === moduleName
  )[0]?.scopes;

  const privileges = fetchAccessVariables(currentModuleScope ?? "");
  return privileges as IAccessVariables;
};

export const getModuleList = () => {
  const { initData } = useStoreInitData();
  const moduleList =
    initData?.moduleList
      ?.filter(item => item.scopes.includes("READ"))
      .map(item => {
        return item.moduleCode;
      }) ?? [];
  return moduleList;
};

const fetchAccessVariables = (currentScope: string) => {
  const { initData } = useStoreInitData();

  let accessVariables = {};

  if (initData?.role == "ROLE_ADMIN") {
    accessVariables = {
      canRead: true,
      canUpdate: true,
      canDelete: true,
      canCreate: true,
      canDownload: true
    };
  } else {
    accessVariables = {
      canRead: currentScope?.includes("READ"),
      canUpdate: currentScope?.includes("UPDATE"),
      canDelete: currentScope?.includes("DELETE"),
      canCreate: currentScope?.includes("CREATE"),
      canDownload: currentScope?.includes("DOWNLOAD")
    };
  }
  return accessVariables;
};
