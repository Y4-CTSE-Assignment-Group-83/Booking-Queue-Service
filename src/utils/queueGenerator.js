import Counter from "../models/counterModel.js";

export const getDateKey = (date) => {
  const bookingDate = new Date(date);
  const year = bookingDate.getFullYear();
  const month = String(bookingDate.getMonth() + 1).padStart(2, "0");
  const day = String(bookingDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const generateQueueNumber = async (appointmentDate) => {
  const queueDate = getDateKey(appointmentDate);

  const counter = await Counter.findOneAndUpdate(
    { queueDate },
    { $inc: { sequenceValue: 1 } },
    { new: true, upsert: true },
  );

  return {
    queueDate,
    queueNumber: counter.sequenceValue,
  };
};