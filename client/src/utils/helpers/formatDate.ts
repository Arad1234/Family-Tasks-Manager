import { ITask } from "@Types/index";
import moment from "moment-timezone";

export const formatDate = (task: ITask) => {
  const utcStartTime = moment.utc(task.startTime).format("YYYY-MM-DD HH:mm");
  const utcEndTime = moment.utc(task.endTime).format("YYYY-MM-DD HH:mm");

  const timezone = "etc/gmt-1";

  const reformattedStartTime = moment.tz(utcStartTime, timezone).toISOString();

  const reformattedEndTime = moment.tz(utcEndTime, timezone).toISOString();
  return { reformattedStartTime, reformattedEndTime };
};
