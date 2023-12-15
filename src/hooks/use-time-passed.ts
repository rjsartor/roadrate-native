import { toAbbreviatedMonth } from '../utils/time.util';

interface TimePassedReturn {
  timePassed: number;
  dateString: string;
}

export const useTimePassed = (createdAt: string | Date): TimePassedReturn => {
  const currentDate = new Date();
  const date = new Date(createdAt);

  const year = date.getFullYear();
  const month = toAbbreviatedMonth(date.getMonth() + 1);
  const day = date.getDate();
  let minutes = date.getMinutes();
  const hour = date.getHours();

  if (minutes < 10) {
    minutes = parseInt('0' + minutes);
  }

  const hourString = hour > 12 ? `${hour - 12}:${minutes} PM` : `${hour}:${minutes} AM`;
  const fullDate = `${hourString} - ${day} ${month} ${year}`;

  const timeDiffMs = currentDate.getTime() - date.getTime();
  const timeDiffMins = timeDiffMs / 60000;
  const timeDiffHours = timeDiffMins / 60;
  const timeDiffDays = timeDiffHours / 24;

  let elapsedTime: string;

  if (timeDiffMins < 60) {
    elapsedTime = `${Math.round(timeDiffMins)}m ago`;
  } else if (timeDiffHours < 24) {
    elapsedTime = `${Math.round(timeDiffHours)}h ago`;
  } else if (timeDiffDays < 30) {
    elapsedTime = `${Math.round(timeDiffDays)}d ago`;
  } else if (timeDiffDays < 365) {
    elapsedTime = `${Math.round(timeDiffDays / 30)}mo ago`;
  } else {
    elapsedTime = `${Math.round(timeDiffDays / 365)}y ago`;
  }

  return {
    timePassed: timeDiffMs,
    dateString: elapsedTime || fullDate
  };
};
