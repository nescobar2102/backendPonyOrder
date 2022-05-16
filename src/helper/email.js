const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");


const templateLayout = (layout,data) => {
    const emailTemplateSource = fs.readFileSync(path.join(__dirname, "../templates/" + layout + ".hbs"), "utf8");
    let template = handlebars.compile(emailTemplateSource); 
    return template(data);
}
const sendEmail = async (msg) => {
    try {

        msg.html = templateLayout(msg.layout, msg.data);
        console.log(msg);
        msg.from = process.env.SENDGRID_FROM;
        sgMail
            .send(msg)
            .then(() => { }, error => {
                console.error(error);

                if (error.response) {
                    console.error(error.response.body)
                }
            });
    } catch (err) {
        throw new Error(err)
    }

}

module.exports = {
    sendEmail,
    templateLayout
}