const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

const validator = require("validator");
const jwt = require("jsonwebtoken");

let userStatusEnum = {
    values: [
      "create",
      "slink",
      "forgot",
      "active",
      "cancelled",
      "blocked", 
    ],
    message: "{VALUE} is not a valid status",
  };
  
  let userRolesEnum = {
    values: ["regular", "admin"],
    message: "{VALUE} is not a valid role",
  };
  
  let verificationStatusEnum = {
    values: [
      "unverified",
      "verified",
      "started_account", //cargo solo datos basicos
      "upload_doc",//cargo los doc
      "check_kyc",
      "rejected", // documento rechazado
      "blocked", // AML / CIP rechazado
    ],
    message: "{VALUE} is not a valid status",
  };
   
  
  let addressSchema = new Schema({
    street: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    state: {
      type: String,
      default: null,
    },
    country: {
      type: String,
      default: null,
    },
    postal_code: {
      type: String,
      default: null,
    },
  });
  
let documentSchema = new Schema({
  filename: String,
  type_doc: {
    type: String,
    default: false,
    enum: [
      // id prove
      "drivers_license",
      "government_id",
      "other",
      "passport",
      "residence_permit",

      // address prove
      "utility_bill",
      "bank_statement",
      "address_prove",
      "rental_lease_agreement",
      "vehicle_registration",
      "real_state_title",

      // id prove company
      "tax_id",
      // other companies documents
      "formation_document",
      "operating_agreement",
      "association_articles",
      "bylaws",
      "representative_document",
      "relationship_prove",
    ],
  },
  side: {
    type: String,
    enum: ["front", "back"],
  },
  identity: {
    type: Boolean,
    default: false,
  },
  identity_photo: {
    type: Boolean,
    default: false,
  },
  identity_address: {
    type: Boolean,
    default: false,
  },
  url: String,
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "approved", "rejected"],
  },
  date: Date,
});


const userSchema = new Schema(
    {
      email: {
        type: String,
        required: [true, "Please fill your email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, " Please provide a valid email"],
      },
      password: {
        type: String,
        required: [true, "Please fill your password"],
        minLength: 8,
        select: false,
        match: /(?=.*[a-zA-Z])(?=.*[0-9]+).*/,
      },     
        name: {
        type: String,
        default: null,
        required: [true, "Please fill your name"],
        },
        lastName: {
        type: String,
        default: null,
        required: [true, "Please fill your LastName"],
        },
      secret_2fa: {
        type: String,
        default: null,
      },
      code_psw: {
        type: Number,
        default: null,
      },
      status: {
        type: String,
        default: "create",
        enum: userStatusEnum,
      },
      role: {
        type: String,
        default: "regular",
        enum: userRolesEnum,
      },
      avatar: {
        type: String,
        default: null,
      },
      personal_details: {
        terms: {
          type: Boolean,
          default: false,
        },
        verification_status: {
          type: String,
          default: "unverified",
          enum: verificationStatusEnum,
        },      
        id_number: {
          type: String,
          default: null,
        },
        tax_country: { //pais de residencia
          type: String,
          default: null,
        },
        // for companies is date of incorporation
        birth_date: {
          type: String,
          default: null,
        },
        phone_number: {
          type: String,
          default: null,
        },
        // only company
        name_company: {
          type: String,
          default: null,
        },
        // only companies
        description_of_services: {
          type: String,
          default: null,
        },
        // only companies
        jurisdiction_of_business_activity: {
          type: String,
          default: null,
        },
        // only companies
        authorized_signature: {
          type: String,
          default: null,
        },
        address: addressSchema,
      },
      
      documents: [documentSchema],
      tokens: [
        {
          token: {
            type: String,
            required: true,
          },
        },
      ],
      providers: [ //en caso se tengan proveedores
        {
          _id: false,
          provider_id: {
            type: String,
          },
          account_id: {
            type: String,
          },
          contact_id: {
            type: String,
          },
        },
      ],
      attempts: {
        type: Number,
        default: 0,
      },
    },
    { timestamps: true }
  );
  
  userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
    }  
    next();
  });
  

  userSchema.methods.public = function () {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.secret;
    userObject.tfa = this.secret != null ? true : false;
    return userObject;
  };
  
userSchema.statics.findByToken = async function (token) {
    let user = this;
    let decoded;
    try {
      if (!token) {
        throw new Error("Missing token header");
      }
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error(error);
    }
    return await user.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
  };
  userSchema.methods.generateTokenLogin = async function () {
    let user = this;
    const token = jwt.sign(
      { _id: user._id.toString(), email: user.email.toString() },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    user.attempts = 0;
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
  };

  userSchema.methods.generateTokenUrl = async function () {
    let user = this;
    const token = jwt.sign(
      { _id: user._id.toString(), email: user.email.toString() },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_EMAIL_IN }
    );
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
  };
  
  userSchema.statics.findByEmail = async (email, language) => {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error(UserMessages.userMessages.login.non_exists[language]);
    }
    const token = await user.generateTokenUrl();
    if (!token) {
      throw new Error(" Wrong token!");
    }
    return token;
  };
  userSchema.statics.findByCredentials = async (email, password) => {
    const user = await UserModel.findOne({ email }).select("+password attempts");  
    if (!user) {
      throw new Error("The email could not found");
    }
  
    const isMatch = await bcrypt.compare(password, user.password);  
    if (!isMatch) {
      await UserModel.findOneAndUpdate(
        { email: email },
        { attempts: user.attempts + 1 }
      );
      return false;
    } else {
      return true;
    }
  
   // return user;
  };
  
  userSchema.statics.generateLinkAccount = async (email) => {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("Email is not registered");
    }
    const token = await user.generateTokenUrl();
    if (!token) {
      throw new Error(" Wrong token!");
    }  
    return token;
  };
 
  userSchema.statics.deleteTokenAccount = async (token, email) => {
    const filter = { email: email };
    const update = { status: "active" };
  
    let user = await UserModel.findOneAndUpdate(filter, update, {
      new: true,
      upsert: false,
    });
  
    if (user) {
      await UserModel.updateOne(
        { "tokens.token": token },
        { $pull: { tokens: { token: token } } }
      );
    }
  
    return user;
  };

  userSchema.statics.newPassword = async (
    token, 
    password, 
  ) => {
    let decoded;
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;
  
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("No se encontro el email");
    }
    
    const isMatch_n = await bcrypt.compare(password, user.password);
    if (isMatch_n) {      
      return { message:"No puede usar la misma contraseña.", error:true}
    }else {

      return await UserModel.updateOne(
        { email: email },
        { $set: { password: await bcrypt.hash(password, 8), status: "active" } },
        { new: true }
      );
    }
   
  };
  
const UserModel = mongoose.model("platform_users", userSchema);

module.exports = UserModel;