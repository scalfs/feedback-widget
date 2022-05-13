import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "df2b6ed83b99ef",
    pass: "537183e2b2f049",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Feedget Team <hi@feedget.com>",
      to: "Vitor Escalfoni <vitor@vitor.com>",
      subject,
      html: body,
    });
  }
}
