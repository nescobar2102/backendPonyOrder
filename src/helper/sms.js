const axios = require("axios");
const btoa = require("btoa");


const sendSmslabsmobile = async (data) => {
    try {
      const res = await axios.post(
        process.env.SMS_API_ENTPOINT + "/send",
        data,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + btoa(`${process.env.SMS_USERNAME}:${process.env.SMS_PASSWORD}`),
                "Cache-Control": "no-cache"
              }
        }
      ); 
      console.log("----",res.status);
      return res.data;
     /* if (res.error) {
        return respError(res.error[0]);
      } else {
        if (!res.data) {
          return respError({ status: 500, message: "No response" });
        } else {
          return res.data.data;
        }
      }*/
    } catch (err) {
      return  err;
    }
  };


module.exports = {
    sendSmslabsmobile,
};
