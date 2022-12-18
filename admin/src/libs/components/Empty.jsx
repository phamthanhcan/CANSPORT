import EmptyImg from "../../assets/images/opps-error.png";

const Empty = () => {
  return (
    <div className="empty">
      <img className="empty-img" src={EmptyImg} alt="empty" />
      <p className="empty-title">It's empty in here</p>
      <p className="empty-description">
        Oops! Seems like there's nothing in this.
      </p>
    </div>
  );
};

export default Empty;
