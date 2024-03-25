const service = `internal-service`;
export const api = {
  auth: {
    login: `${service}/api/auth/login`,
    refreshToken: `${service}/api/auth/refreshToken`,
    logout: `${service}/api/auth/logout`
  },

  masterData: {
    country: {
      getList: `${service}/country/list/app`,
      getAll: `${service}/country/list`,
      create: `${service}/country`,
      update: `${service}/country/{id}`,
      statusChange: `${service}/country/status/{id}`
    },
    state: {
      getAll: `${service}/state/list`,
      create: `${service}/state`,
      update: `${service}/state/{id}`
    },
    currency: {
      getAll: `${service}/currency-master/list`,
      create: `${service}/currency-master`,
      update: `${service}/currency-master/{id}`
    },
    document: {
      getAll: `${service}/doc`,
      create: `${service}/doc`,
      update: `${service}/doc/{id}`,
      extension: `${service}/doc/extension`
    },
    purpose_of_payment: {
      getAll: `${service}/payment-purpose/list`,
      create: `${service}/payment-purpose`,
      update: `${service}/payment-purpose/{id}`
    },
    payout_method: {
      getAll: `${service}/payout-method`,
      create: `${service}/payout-method`,
      update: `${service}/payout-method/{id}`,
      statusChange: `${service}/payout-method/status/{id}`
    },
    payout_partner: {
      getAll: `${service}/payout-partner/list`,
      create: `${service}/payout-partner`,
      update: `${service}/payout-partner/{id}`,
      statusChange: `${service}/payout-partner/status/{id}`
    },
    relationship: {
      getAll: `${service}/relationship`,
      create: `${service}/relationship`,
      update: `${service}/relationship/{id}`,
      getById: `${service}/relationship/{id}`
    },
    role: {
      getAll: `${service}/roles/getAllRoles`,
      getSingle: `${service}/roles/get-role/{id}`,
      create: `${service}/roles/create-role`,
      update: `${service}/roles/update-role/{id}`,
      delete: `${service}/roles/delete-role/{id}`
    },
    source_of_fund: {
      getAll: `${service}/source-of-fund/list`,
      create: `${service}/source-of-fund`,
      update: `${service}/source-of-fund/{id}`
    }
  },
  fee_and_charges: {
    getAll: `${internalService}/api/feeAndCharges/getAll`,
    create: `${internalService}/api/feeAndCharges/create`,
    update: `${internalService}/api/feeAndCharges/update/{id}`,
    delete: `${internalService}/api/feeAndCharges/delete/{id}`,
    getSingle: `${internalService}/api/feeAndCharges/getFeeAndCharges/{id}`
  },
  fee_and_charges_details: {
    getAll: `${internalService}/api/feeAndChargesDetails/getAll`,
    create: `${internalService}/api/feeAndChargesDetails/add/{feeAndChargeId}`,
    update: `${internalService}/api/feeAndChargesDetails/update/{id}`,
    delete: `${internalService}/api/feeAndChargesDetails/delete/{id}`
  },

  init: "/init"
};

export interface NeoResponse<T = any> {
  data: T;
  responseStatus: string;
  message: string;
}
