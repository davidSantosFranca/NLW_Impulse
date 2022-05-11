export interface SendMailData {
  subject: string;
  body: string;
}

export interface MailApdater{
  sendMail:(data:SendMailData)=>Promise<void>; 
}