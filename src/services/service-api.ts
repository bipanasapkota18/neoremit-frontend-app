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
    base_rate: {
      baseRateSetup: `${service}/master/base-rate-config/baseRateSetup/{id}`,
      getBaseRate: `${service}/master/base-rate-config/getBaseRateSetup/sender/{senderId}/receiver/{receiverId}`,
      baseRateConfig: `${service}/master/base-rate-config/baseRateConfig`
    },
    state: {
      getAll: `${service}/state/list`,
      create: `${service}/state`,
      update: `${service}/state/{id}`
    },
    kyc: {
      getAll: `${service}/country/kyc-form/fields`,
      countryField: `${service}/country/kyc-form/{countryId}`,
      updateRequired: `${service}/country/kyc-form/fields/update/required/{id}`,
      displayRequired: `${service}/country/kyc-form/fields/update/display/{id}`,
      allowupdateRequired: `${service}/country/kyc-form/fields/update/update/{id}`,
      kycFormField: `${service}/country/kyc-form/fields/create/{id}`
    },
    currency: {
      getAll: `${service}/currency-master/list`,
      create: `${service}/currency-master`,
      update: `${service}/currency-master/{id}`,
      toggleStatus: `${service}/currency-master/status/{id}`,
      getCurrencyList: `${service}/currency-master/list`
    },
    document: {
      getAll: `${service}/doc`,
      create: `${service}/doc`,
      update: `${service}/doc/{id}`,
      extension: `${service}/doc/extension`,
      statusChange: `${service}/doc/status/{id}`
    },
    purpose_of_payment: {
      getAll: `${service}/payment-purpose/list`,
      create: `${service}/payment-purpose`,
      update: `${service}/payment-purpose/{id}`,
      statusChange: `${service}/payment-purpose/status/{id}`
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
      getById: `${service}/relationship/{id}`,
      statusChange: `${service}/relationship/status/{id}`
    },
    role: {
      getAll: `${service}/api/role-module`,
      create: `${service}/api/role-module`,
      allModules: `${service}/api/role-module/modules`,
      toggleStatus: `${service}/api/role-module/toggle-status/{roleId}`,
      activeRoles: `${service}/api/role-module/roles`,
      updateRole: `${service}/api/role-module`
    },

    source_of_fund: {
      getAll: `${service}/source-of-fund/list`,
      create: `${service}/source-of-fund`,
      update: `${service}/source-of-fund/{id}`,
      statusChange: `${service}/source-of-fund/status/{id}`
    },
    occupation: {
      getAll: `${service}/occupation/list`,
      create: `${service}/occupation`,
      update: `${service}/occupation/{id}`,
      statusChange: `${service}/occupation/status/{id}`
    },
    marital_status: {
      getAll: `${service}/marital-status/list`,
      create: `${service}/marital-status`,
      update: `${service}/marital-status/{id}`,
      statusChange: `${service}/marital-status/status/{id}`
    },
    promo_code: {
      getAll: `${service}/promo-code/list`,
      create: `${service}/promo-code`,
      update: `${service}/promo-code/{id}`,
      statusChange: `${service}/promo-code/status/{id}`
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
    changePassword: `${service}/users/otp/change-password`,
    setPasssword: `${service}/users/internal/set-password`
  },

  automatic_discount: {
    getAll: `${service}/master/automatic-discount/getAll`,
    create: `${service}/master/automatic-discount/create`,
    update: `${service}/master/automatic-discount/update/{id}`,
    delete: `${service}/master/automatic-discount/delete/{id}`,
    statusChange: `${service}/master/automatic-discount/toggle/status/{id}`,
    getById: `${service}/master/automatic-discount/get/{id}`
  },
  partner_setup: {
    timezone: `${service}/util/timezones`,
    getAll: `${service}/master/partnerSetup/getAllPartnerSetup`,
    create: `${service}/master/partnerSetup/createPartnerSetup`,
    update: `${service}/master/partnerSetup/updatePartnerSetup/{partnerId}`,
    delete: `${service}/master/partnerSetup/deletePartnerSetup/{partnerId}`,
    statusChange: `${service}/master/partnerSetup/toggle/status/{id}`,
    getById: `${service}/master/partnerSetup/getPartnerSetup/{partnerId}`
  },
  ledger_setup: {
    getAll: `${service}/master/ledger/list`,
    create: `${service}/master/ledger`,
    update: `${service}/master/ledger/{id}`
  },

  internalUser: {
    getAll: `${service}/users/getAllInternalUsers`,
    create: `${service}/users/create-user`,
    toggleStatus: `${service}/users/blockUnblockUser/{UserId}`
  },

  role: {
    getAll: `${service}/api/role-module`,
    create: `${service}/api/role-module`,
    allModules: `${service}/api/role-module/modules`,
    toggleStatus: `${service}/api/role-module/toggle-status/{roleId}`,
    activeRoles: `${service}/api/role-module/roles`,
    getById: `${service}/api/role-module/{roleId}`
  },

  init: `${service}/users/init-admin`
};

export interface NeoResponse<T = any> {
  data: T;
  responseStatus: string;
  message: string;
}
