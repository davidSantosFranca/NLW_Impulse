import express from 'express';
import { SubmitFeedbackUseCase } from './use-cases/submit_feedback_use_case';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma_feedbacks_repository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer_mail_adapter';

export const routes = express.Router();

routes.post("/feedbacks", async (req, res) => {
  const {comment, type, screenshot} = req.body;
  const feedbackRepository = new PrismaFeedbacksRepository();
  const mailApdater = new NodemailerMailAdapter();
  const submtiFeedbackUseCase = 
    new SubmitFeedbackUseCase(feedbackRepository, mailApdater);

  await submtiFeedbackUseCase.execute({
    comment: comment,
    type: type,
    screenshot: screenshot,
  })

  return res.status(201);
});
