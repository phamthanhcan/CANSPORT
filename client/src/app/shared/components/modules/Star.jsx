export const generateStar = (star) => {
  let arr = [];
  let temp = star;
  for (let i = 0; i < 5; i++) {
    if (temp >= 1) {
      arr.push(<ion-icon key={i} name="star"></ion-icon>);
    } else if (temp > 0 && temp < 1) {
      arr.push(<ion-icon key={i} name="star-half"></ion-icon>);
    } else {
      arr.push(<ion-icon key={i} name="star-outline"></ion-icon>);
    }
    temp = +temp - 1;
  }
  return arr;
};

const Star = ({ numberStar }) => {
  return <span>{generateStar(numberStar)}</span>;
};

export default Star;
