const accountLiquidityModel = require("../models/account_liquidity");
const UserModel = require("../models/userModel");
const mongoose = require("mongoose");

 
const getLiquidityBalance = async (email, amount, cripto) => {
    let flag = false;
    const liquidity_balance = await accountLiquidityModel.findOne({ userPlataform: email});
  
    if (liquidity_balance) {
      if (
        liquidity_balance.settlement_crypto &&
        liquidity_balance.settlement_crypto.length > 0
      ) {
        liquidity_balance.settlement_crypto.forEach((value, index) => {
          if (value.crypto_name == cripto) {
            balance = Number(value.amount);
            if (balance >= amount) {
              flag = true;
            }
          }
        });
      }
    }
    return flag;
  };

  module.exports = {
    getLiquidityBalance, 
  };
  