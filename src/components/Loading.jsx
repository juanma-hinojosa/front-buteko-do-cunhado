import imageButeko from "/images/logo.png";
import "../css/components/Loading.css"; // Animación CSS

const Loading = () => {
  return (
    <div className="loading-container">
      <img src={imageButeko} alt="Logo do Boteko" className="logo-pulse" />
    </div>
  );
};

export default Loading;
