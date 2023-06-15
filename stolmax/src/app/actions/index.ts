import { createAction, props } from '@ngrx/store';

export const setScrollPosition = createAction('[scrollPosition] Set scroll position value', props<{ payload: number }>());
export const clickMoreInfoBtn = createAction('[moreInfoClick] Click more info btn')
