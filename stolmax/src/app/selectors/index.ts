import { createSelector } from '@ngrx/store';
import { StolmaxAppState } from '../reducers';

export const selectAppState = (state: { appState: StolmaxAppState }) => state.appState;

export const selectScrollPosition = createSelector(
    selectAppState,
    (state: StolmaxAppState) => state.scrollPosition
);

export const selectMoreInfoBtnClick = createSelector(
    selectAppState,
    (state: StolmaxAppState) => state.moreInfoClick
);