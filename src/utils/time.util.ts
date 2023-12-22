import { format, formatDistanceToNow, isToday, isThisYear } from 'date-fns';

const getTimestampDisplay = (createdAt: string | number | Date): string => {
  const reviewDate = new Date(createdAt);

  if (isToday(reviewDate)) {
    console.log("today")
    return formatDistanceToNow(reviewDate, { addSuffix: true });
  } else if (isThisYear(reviewDate)) {
    return format(reviewDate, 'd MMM - p');
  } else {
    return format(reviewDate, 'd MMM yyyy');
  }
};

export default getTimestampDisplay;

// export const toAbbreviatedMonth = (number: number): string | null => {
//   let month;
//   switch (number) {
//     case 1:
//       month = 'Jan';
//       break;
//     case 2:
//       month = 'Feb';
//       break;
//     case 3:
//       month = 'Mar';
//       break;
//     case 4:
//       month = 'Apr';
//       break;
//     case 5:
//       month = 'May';
//       break;
//     case 6:
//       month = 'Jun';
//       break;
//     case 7:
//       month = 'Jul';
//       break;
//     case 8:
//       month = 'Aug';
//       break;
//     case 9:
//       month = 'Sep';
//       break;
//     case 10:
//       month = 'Oct';
//       break;
//     case 11:
//       month = 'Nov';
//       break;
//     case 12:
//       month = 'Dec';
//       break;
//     default:
//       month = null;
//   }

//   return month;
// };