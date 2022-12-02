import { useAppDispatch, useAppSelector } from '~/shared/hooks/react-redux';

import { ActionCreators } from 'redux-undo';
import {
  selectBoardFutureState,
  selectBoardPastState,
} from '~/features/board/slice/selectors';

export const UndoRedo = () => {
  const dispatch = useAppDispatch();

  const pastState = useAppSelector(selectBoardPastState);
  const futureState = useAppSelector(selectBoardFutureState);

  return (
    <div className="flex gap-2 text-white">
      <button
        className="hover:bg-neutral-500 active:bg-neutral-600 rounded-lg p-1 disabled:text-neutral-400"
        disabled={!pastState.length}
        onClick={() => dispatch(ActionCreators.undo())}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
          />
        </svg>
      </button>
      <button
        className="hover:bg-neutral-500 active:bg-neutral-600 rounded-lg p-1 disabled:text-neutral-400"
        disabled={!futureState.length}
        onClick={() => dispatch(ActionCreators.redo())}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3"
          />
        </svg>
      </button>
    </div>
  );
};
