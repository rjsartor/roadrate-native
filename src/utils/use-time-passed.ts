import { format, formatDistanceToNow, isToday, isThisYear } from 'date-fns';

const getTimestampDisplay = (createdAt: string | number | Date): string => {
  const reviewDate = new Date(createdAt);

  if (isToday(reviewDate)) {
    return formatDistanceToNow(reviewDate, { addSuffix: true });
  } else if (isThisYear(reviewDate)) {
    return format(reviewDate, 'd MMM - p');
  } else {
    return format(reviewDate, 'd MMM yyyy');
  }
};

export default getTimestampDisplay;
