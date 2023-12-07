import {useState} from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { decrement, increment, selectCount,incrementAsync } from "./counterSlice";
import { Button } from "@mui/material";
// import styles from "./Counter.module.css";

export function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2")
  const incrementValue = Number(incrementAmount) || 0
  return (
    <div>
      <div >
        <Button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </Button>
        <span >{count}</span>
        <Button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </Button>

      </div>
      <input
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
      <Button
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </Button>
    </div>
  );
}
