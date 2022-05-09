import { MailApdater, SendMailData } from "../mail_adapter";
import nodemailer from 'nodemailer';

export class NodemailerMailAdapter implements MailApdater{
  async sendMail({subject, body}: SendMailData){
    const transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "9fdb109546c42f",
        pass: "ca5573769d659b",
      },
    });
    
    await transport.sendMail({
      from: "Equipe Feedget<oi@feedget.com>",
      to: "Feedget Team <feedgetsupport@feedget.com>",
      subject: subject,
      html: body,
    });
  }
}