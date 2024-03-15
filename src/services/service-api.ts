const internalService = `internal-service`;
export const api = {
  auth: {
    login: `${internalService}/api/auth/login`,
    refreshToken: `${internalService}/api/auth/refreshToken`,
    logout: `${internalService}/api/auth/logout`
  },

  masterData: {
    country: {
      getList: `${internalService}/country/list/app`,
      getAll: `${internalService}/country/list`,
      create: `${internalService}/country`,
      update: `${internalService}/country/{id}`,
      statusChange: `${internalService}/country/status/{id}`
    },
    state: {
      getAll: `${internalService}/state/list`,
      create: `${internalService}/state`,
      update: `${internalService}/state/{id}`
    },
    currency: {
      getAll: `${internalService}/currency-master/list`,
      create: `${internalService}/currency-master`,
      update: `${internalService}/currency-master/{id}`
    },
    document: {
      getAll: `${internalService}/doc`,
      create: `${internalService}/doc`,
      update: `${internalService}/doc/{id}`,
      extension: `${internalService}/doc/extension`
    },
    purpose_of_payment: {
      getAll: `${internalService}/payment-purpose/list`,
      create: `${internalService}/payment-purpose`,
      update: `${internalService}/payment-purpose/{id}`
    },
    payout_method: {
      getAll: `${internalService}/payout-method`,
      create: `${internalService}/payout-method`,
      update: `${internalService}/payout-method/{id}`
    },
    payout_partner: {
      getAll: `${internalService}/payout-partner/list`,
      create: `${internalService}/payout-partner`,
      update: `${internalService}/payout-partner/{id}`
    },
    relationship: {
      getAll: `${internalService}/relationship`,
      create: `${internalService}/relationship`,
      update: `${internalService}/relationship/{id}`,
      getById: `${internalService}/relationship/{id}`
    },
    role: {
      getAll: `${internalService}/roles/getAllRoles`,
      getSingle: `${internalService}/roles/get-role/{id}`,
      create: `${internalService}/roles/create-role`,
      update: `${internalService}/roles/update-role/{id}`,
      delete: `${internalService}/roles/delete-role/{id}`
    },
    source_of_fund: {
      getAll: `${internalService}/source-of-fund/list`,
      create: `${internalService}/source-of-fund`,
      update: `${internalService}/source-of-fund/{id}`
    }
  },

  init: "/init"
};

export interface NeoResponse<T = any> {
  data: T;
  responseStatus: string;
  message: string;
}
