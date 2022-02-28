import "../styles/genius.css";

import { useCallback, useEffect, useState } from "react";

import QuarterCircle from "./quarterCircle";
import BackdropLoader from "./backdropLoader";

type OrderElements = "red" | "blue" | "green" | "yellow";

const initialActiveOrder = {
  red: false,
  blue: false,
  yellow: false,
  green: false,
};

const Genius = () => {
  const [order, setOrder] = useState<OrderElements[]>([]);
  const [clickedOrder, setClickedOrder] = useState<OrderElements[]>([]);
  const [activeOrder, setActiveOrder] = useState(initialActiveOrder);
  const [score, setScore] = useState(4);
  const [startSeconds, setStartSeconds] = useState(3);
  const [clickNumber, setClickNumber] = useState(0);

  const handleShuffleOrder = useCallback(() => {
    setOrder((prevOrder) => {
      const colorOrder = Math.floor(Math.random() * 4);

      switch (colorOrder) {
        case 0:
          return [...prevOrder, "red"];
        case 1:
          return [...prevOrder, "blue"];
        case 2:
          return [...prevOrder, "yellow"];
        case 3:
          return [...prevOrder, "green"];
        default:
          return [...prevOrder];
      }
    });
  }, [score]);

  const lightColorOrder = useCallback(() => {
    let time = 1000;

    for (const color of order) {
      setTimeout(() => {
        setActiveOrder({
          ...initialActiveOrder,
          [color]: true,
        });
      }, time);

      setTimeout(() => {
        setActiveOrder(initialActiveOrder);
      }, time + 1000);

      time += 2000;
    }
  }, [order]);

  const handleClickOrder = useCallback(
    (element: OrderElements) => {
      if (clickNumber >= score) {
        return;
      }

      setClickedOrder((prevOrder) => [...prevOrder, element]);
      setClickNumber((prevClick) => prevClick + 1);
    },
    [clickNumber, score]
  );

  const checkGameOver = useCallback(() => {
    let lose = false;
    for (const color in order) {
      if (order[color] !== clickedOrder[color]) {
        lose = true;
        break;
      }
    }

    if (lose) {
      if (confirm("Você Perdeu! Deseja jogar novamente?")) {
        location.reload();
      }
    } else {
      if (confirm("Você Ganhou!")) {
        setScore((prevScore) => prevScore + 1);
      }
    }
  }, [order, clickedOrder, setScore, score]);

  useEffect(() => {
    if (order.length !== 0) {
      return;
    }
    setClickNumber(0);
    setClickedOrder([]);
    setOrder([]);

    for (let i = 0; i < score - 1; i++) {
      handleShuffleOrder();
    }
  }, []);

  useEffect(() => {
    setClickNumber(0);
    setClickedOrder([]);
    handleShuffleOrder();
  }, [score]);

  useEffect(() => {
    setTimeout(() => {
      lightColorOrder();
    }, 1000 * startSeconds);
  }, [order]);

  useEffect(() => {
    const timer = setInterval(() => {
      setStartSeconds((prevTime) => prevTime - 1);
    }, 1000);

    if (startSeconds <= 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [startSeconds]);

  useEffect(() => {
    if (clickNumber === score) {
      checkGameOver();
    }
  }, [clickNumber]);

  return (
    <div className="genius">
      <QuarterCircle
        color="green"
        quarter="1/4"
        onClick={handleClickOrder}
        active={activeOrder.green}
      />
      <QuarterCircle
        color="red"
        quarter="2/4"
        onClick={handleClickOrder}
        active={activeOrder.red}
      />
      <QuarterCircle
        color="yellow"
        quarter="3/4"
        onClick={handleClickOrder}
        active={activeOrder.yellow}
      />
      <QuarterCircle
        color="blue"
        quarter="4/4"
        onClick={handleClickOrder}
        active={activeOrder.blue}
      />
      <div className="genius-middle-circle" />
      {startSeconds !== 0 && <BackdropLoader time={startSeconds} />}
    </div>
  );
};

export default Genius;
