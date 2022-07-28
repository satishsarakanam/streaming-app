import image from "../images/default.png";
import "../styles/Card.css";

export default function Card(props) {
  const { src = image, title } = props.item;

  const replaceImage = (e) => {
    e.target.src = image;
  };

  return (
    <div
      className="card"
      onClick={() => (props.showDetails ? props.showDetails(title) : "")}
    >
      <img src={src} alt="" onError={replaceImage} />
      <span className="card_title">{title}</span>
    </div>
  );
}
