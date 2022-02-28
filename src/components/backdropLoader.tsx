import "../styles/backdropLoader.css";

import { FC } from "react";

type BackdropLoaderProps = {
  time: number;
};

const BackdropLoader: FC<BackdropLoaderProps> = ({ time }) => {
  return (
    <div className="backdrop">
      <span className="backdrop-time">{time}</span>;
    </div>
  );
};

export default BackdropLoader;
