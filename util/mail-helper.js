// const { Transporter } = require("../config/mail.config");
const CONFIG = require("../config/config");
const nodemailer = require("nodemailer");
const Transporter = nodemailer.createTransport({
  host: CONFIG.SMTP_CREDENTIAL.HOST,
  port: CONFIG.SMTP_CREDENTIAL.PORT,
  secure: true, // true for 465, false for other ports
  auth: {
    user: CONFIG.SMTP_CREDENTIAL.USERNAME,
    pass: CONFIG.SMTP_CREDENTIAL.PASSWORD,
  },
});
class MailHelper {
  constructor() {}

  /**
   *
   * @param {*} email
   * @param {*} subject
   * @param {*} body_html
   * @returns
   */
  sendEmail = async (email, subject, htmlData) => {
    return new Promise(async (resolve, reject) => {
      const mailOptions = {
        from: CONFIG.SMTP_CREDENTIAL.FROM,
        to: email,
        subject: subject,
        html: htmlData,
      };
      const info = await Transporter.sendMail(mailOptions).catch((e) => {
        console.log("step3...", new Date(), " ..", e);
        reject(e);
      });
      console.log("step2...", new Date(), " ..", info);
      if (!info) {
        return;
      }
      resolve(info);
      // resolve(htmlData);
    });
  };
}
module.exports.MailHelper = new MailHelper();
