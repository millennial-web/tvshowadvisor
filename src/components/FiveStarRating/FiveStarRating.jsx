import { StarFill, StarHalf, Star as StarEmpty } from 'react-bootstrap-icons';

export const FiveStarRating = ({ rating }) => {
  // Declare star icon array
  const starList = [];
  // Store number of filled stars
  const starFilledCount = Math.floor(rating);
  // Store if there is a half star
  const hasHalfStar = rating - parseInt(rating) >= 0.5;
  // Store the number of empty stars
  const emptyStarCount = 5 - starFilledCount - (hasHalfStar ? 1 : 0);
  // Push the filled star icons
  for (let i = 0; i < starFilledCount; i++) {
    starList.push(<StarFill key={`fill_${i}`} />);
  }
  // Push the half star if exist
  if (hasHalfStar) {
    starList.push(<StarHalf key={`half_1`} />);
  }
  // Push empty star icons
  for (let i = 0; i < emptyStarCount; i++) {
    starList.push(<StarEmpty key={`empty_${i}`} />);
  }
  // Render star icon array
  return <div>{starList}</div>;
};
