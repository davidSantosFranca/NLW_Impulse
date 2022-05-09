import { prisma } from "../../prisma";
import { FeedbacksDataCreation, FeedbacksRepository } from "../feedbacks_repository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create(data: FeedbacksDataCreation) {
    const {comment, type, screenshot} = data;
    await prisma.feedback.create({
      data: {
        comment: comment,
        type: type,
        screenshot: screenshot,
      },
    });
  }
}