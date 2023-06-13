import { createReducer, on } from "@ngrx/store";
import { setScrollPosition } from "../actions";

export const initialState = {
  scrollPosition: 0
};

const _appReducer = createReducer(initialState,
  on(setScrollPosition, state => state),
);

export function appReducer(state: any, action: any) {
  return _appReducer(state, action);
}