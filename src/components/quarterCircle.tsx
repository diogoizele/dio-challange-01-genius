import "../styles/quarterCircle.css";

import { CSSProperties, FC, useMemo } from "react";

type Colors = "red" | "blue" | "green" | "yellow";

type QuarterCircleProps = {
  quarter: "1/4" | "2/4" | "3/4" | "4/4";
  color: Colors;
  active?: boolean;
  onClick: (element: Colors) => void;
};

const QuarterCircle: FC<QuarterCircleProps> = ({
  color,
  quarter,
  active,
  onClick,
}) => {
  const classQuarter = useMemo(() => {
    switch (quarter) {
      case "1/4":
        return "one-quarter";
      case "2/4":
        return "two-quarter";
      case "3/4":
        return "three-quarter";
      case "4/4":
        return "four-quarter";
      default:
        return null;
    }
  }, [quarter]);

  const isActive = useMemo((): CSSProperties | null => {
    if (active) {
      return {
        opacity: 1,
        filter: "brightness(2)",
        boxShadow: `0 0 8px 1px ${color}`,
      };
    }

    return null;
  }, [active, color]);

  return (
    <div
      onClick={() => onClick(color)}
      className={`quarter-circle ${classQuarter}`}
      style={{ backgroundColor: color, ...isActive }}
    ></div>
  );
};

export default QuarterCircle;
