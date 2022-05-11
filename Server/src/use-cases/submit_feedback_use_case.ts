import { MailApdater } from '../adapters/mail_adapter';
import { FeedbacksRepository } from '../repositories/feedbacks_repository'

interface SubmitFeedbackUseCaseRequest{
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase{
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailApdater: MailApdater,
    ){}

  async execute(req: SubmitFeedbackUseCaseRequest){
    const { type, comment, screenshot } = req;

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Invalid screenshot format! Expected PNG bas64 format.");
    }

    if (!type) {
      throw new Error("Type is required!");
    }
    if (!comment) {
      throw new Error("Type is required!");
    }

    await this.feedbacksRepository.create({
      type: type,
      comment: comment,
      screenshot: screenshot
    })
    await this.mailApdater.sendMail({
      subject: "Novo Feedback",
      body: [
        `<div style="font-family: sans-serif; font-size:16px; color:#111">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentario: ${comment}</p>`,
        `<img src='${screenshot}' alt='screenshot'/>`,
        `</div>`,
      ].join("\n"),
    });
    
  }
}