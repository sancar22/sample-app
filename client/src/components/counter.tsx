import { RootState } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, incrementByAmount } from '../redux/slices/counter/counter';

export function Counter (): JSX.Element {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(incrementByAmount(3))}
        >
          Increment by 3
        </button>
      </div>
    </div>
  );
}