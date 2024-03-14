export const api = {
  auth: {
    login: "internal-service/api/auth/login",
    refreshToken: "internal-service/api/auth/refreshToken",
    logout: "internal-service/api/auth/logout"
  },

  masterData: {
    country: {
      getAll: "internal-service/country/list",
      create: "internal-service/country",
      update: "internal-service/country/{id}"
    },
    state: {
      getAll: "internal-service/state/list",
      create: "internal-service/state",
      update: "internal-service/state/{id}"
    },
    currency: {
      getAll: "internal-service/currency-master/list",
      create: "internal-service/currency-master",
      update: "internal-service/currency-master/{id}"
    },
    document: {
      getAll: "internal-service/doc",
      create: "internal-service/doc",
      update: "internal-service/doc/{id}",
      extension: "internal-service/doc/extension"
    },
    purpose_of_payment: {
      getAll: "internal-service/payment-purpose/list",
      create: "internal-service/payment-purpose",
      update: "internal-service/payment-purpose/{id}"
    },
    payout_method: {
      getAll: "internal-service/payout-method/list",
      create: "internal-service/payout-method",
      update: "internal-service/payout-method/{id}"
    },
    relationship: {
      getAll: "internal-service/relationship",
      create: "internal-service/relationship",
      update: "internal-service/relationship/{id}",
      getById: "internal-service/relationship/{id}"
    },
    role: {
      getAll: "internal-service/roles/getAllRoles",
      getSingle: "internal-service/roles/get-role/{id}",
      create: "internal-service/roles/create-role",
      update: "internal-service/roles/update-role/{id}",
      delete: "internal-service/roles/delete-role/{id}"
    },
    source_of_fund: {
      getAll: "internal-service/source-of-fund/list",
      create: "internal-service/source-of-fund",
      update: "internal-service/source-of-fund/{id}"
    }
  },
  users: {
    email: "internal-service/users/forgot-password",
    otp: "internal-service/users/verify/otp",
    resendOtp: "internal-service/users/otp/resend",
    changePassword: "internal-service/users/otp/change-password"
  },

  init: "/init"
};

export interface NeoResponse<T = any> {
  data: T;
  responseStatus: string;
  message: string;
}
