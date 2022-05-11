export interface FeedbacksDataCreation{
  type: string,
  comment: string,
  screenshot?: string,
}

export interface FeedbacksRepository {
  create:(data: FeedbacksDataCreation)=>Promise<void>;
}