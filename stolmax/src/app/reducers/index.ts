import { createReducer, on } from "@ngrx/store";
import { clickMoreInfoBtn, setScrollPosition } from "../actions";

export interface StolmaxAppState {
  scrollPosition: number;
  moreInfoClick: number;
}

export const initialState: StolmaxAppState = {
  scrollPosition: 0,
  moreInfoClick: 0
};

const _appReducer = createReducer(initialState,
  on(setScrollPosition, (state, { payload }) => ({ ...state, scrollPosition: payload })),
  on(clickMoreInfoBtn, (state) => ({ ...state, moreInfoClick: state.moreInfoClick + 1 }))
);

export function appReducer(state: any, action: any) {
  return _appReducer(state, action);
}