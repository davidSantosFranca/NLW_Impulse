import { SubmitFeedbackUseCase } from "../submit_feedback_use_case";

//spies are a way to know if a given method was called.
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy},
  { sendMail: sendMailSpy}
);

describe('submit feedback',  () => {
  it("should be able to submit feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "Test comment",
        screenshot: "data:image/png;base64,dffasdfadsf ",
      })
    ).resolves.not.toThrow();


    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "Test comment",
        screenshot: "data:image/png;base64,dffasdfadsf ",
      })
    ).rejects.toThrow();

    expect(createFeedbackSpy).not.toHaveBeenCalled();
    expect(sendMailSpy).not.toHaveBeenCalled();
  });

  it("should not be able to submit feedback without comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "TEST",
        comment: "",
        screenshot: "data:image/png;base64,dffasdfadsf ",
      })
    ).rejects.toThrow();

    expect(createFeedbackSpy).not.toHaveBeenCalled();
    expect(sendMailSpy).not.toHaveBeenCalled();

  });
  
  it("should not be able to submit feedback with any other image format", async () => {
    await expect(
      submitFeedback.execute({
        type: "TEST",
        comment: "Test comment",
        screenshot: "data:image/png;base32,dffasdfadsf ",
      })
    ).rejects.toThrow();

    expect(createFeedbackSpy).not.toHaveBeenCalled();
    expect(sendMailSpy).not.toHaveBeenCalled();

  });
  
});