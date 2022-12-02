import { RootState } from '~/store';

export const selectBoardState = (state: RootState) => state.board.present;
export const selectBoardPastState = (state: RootState) => state.board.past;
export const selectBoardFutureState = (state: RootState) => state.board.future;
