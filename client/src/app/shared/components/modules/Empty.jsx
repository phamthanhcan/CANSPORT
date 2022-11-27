import EmptyImg from "../../../../assets/images/opps-error.png";

const Empty = () => {
  return (
    <div className="empty f-center-y f-center-x">
      <img className="empty-img" src={EmptyImg} alt="empty" />
      <p className="txt-demi txt-center">It's empty in here</p>
      <p className="txt-sm txt-center">
        Oops! Seems like there's nothing in this.
      </p>
    </div>
  );
};

export default Empty;
