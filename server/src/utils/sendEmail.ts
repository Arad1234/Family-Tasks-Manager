import nodemailer, { TransportOptions } from "nodemailer";
import { config } from "../config/config";
import { google } from "googleapis";
import { mailAuthConfig } from "./constants";
import { IMailOptions } from "../types/common";

const sendEmail = async (options: IMailOptions) => {
  const oAuth2Client = new google.auth.OAuth2(
    config.email.clientId,
    config.email.clientSecret,
    config.email.redirectURI
  );

  oAuth2Client.setCredentials({ refresh_token: config.email.refreshToken });

  const accessToken = await oAuth2Client.getAccessToken();

  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      ...mailAuthConfig,
      accessToken: accessToken,
    },
  } as TransportOptions);

  // 2) Define the email options
  const mailOptions = {
    from: config.email.fromEmail,
    to: options.email,
    subject: options.subject,
    text: options.text,
  };

  // 3) Actually send the eamil
  const result = await transporter.sendMail(mailOptions);

  return result;
};

export default sendEmail;
