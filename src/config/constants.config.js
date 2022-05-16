

const STATUS_TRANSFERS = {
    PENDIND: "pending",
    COMPLETED: "completed",
    SETTLED: "settled",
    APPROVED: "approved",
    REVERSED: "reversed",
    CANCELLED: "cancelled"
};

const TYPE_TRANSFERS = { 
    BUY: 'buy',
    SELL: 'sell'
}
 
const TYPE_MOV_TRANSFERS = {
    ACCREDIT: 'accredit',
    DEDUCT: 'deduct'
}

const STATUS_USERS = {
    CREATE: "create",
    SLINK: "slink",
    FORGOT: "forgot",
    CONFIRMED: "confirmed",
    ACTIVE: "active",
    CANCELLED: "cancelled",
    BLOCKED: "blocked",
    EXPIRED: "expired",
}


const VERIFICATION_STATUS_USERS = {
    UNVERIFIED: "unverified",
    VERIFIED: "verified",
    STARTED_ACCOUNT: "started_account",
    UPLOAD_DOC: "upload_doc",
    CHECK_KYC: "check_kyc",
}

const DECIMAL_LENGTH = {
    CRYPTO: 8,
    FIAT: 2
}

module.exports = {
    STATUS_TRANSFERS,
    TYPE_TRANSFERS,
    TYPE_MOV_TRANSFERS, 
    STATUS_USERS,
    VERIFICATION_STATUS_USERS,
    DECIMAL_LENGTH
};
  