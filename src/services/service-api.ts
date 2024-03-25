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
      getAll: `${service}/payout-method/list`,
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
    getAll: `${service}/master/fee-Charges/getAll`,
    create: `${service}/master/fee-Charges/create`,
    update: `${service}/master/fee-Charges/update/{id}`,
    delete: `${service}/master/fee-Charges/delete/{id}`,
    getSingle: `${service}/master/fee-Charges/getFeeAndCharges/{id}`,
    toggleStatus: `${service}/master/fee-Charges/toggle/status/{id}`
  },
  fee_and_charges_details: {
    getAll: `${service}/api/feeAndChargesDetails/getAll`,
    create: `${service}/master/fee-charges-details/add/{feeAndChargeId}`,
    update: `${service}/master/fee-charges-details/update/{id}`,
    delete: `${service}/master/fee-charges-details/delete/{id}`
  },
  users: {
    email: `${service}/users/forgot-password`,
    otp: `${service}/users/verify/otp`,
    resendOtp: `${service}/users/otp/resend`,
    changePassword: `${service}/users/otp/change-password`
  },

  init: "/init"
};

export interface NeoResponse<T = any> {
  data: T;
  responseStatus: string;
  message: string;
}
