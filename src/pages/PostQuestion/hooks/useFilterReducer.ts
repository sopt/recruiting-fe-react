import { useReducer } from 'react';
import type { PartType, SoptPartType } from '@/pages/Application/\btypes';
import { COMMON_QUESTION } from '@/pages/Application/constants';
import type { Group } from '@/pages/PostQuestion/types';

export type FilterState = {
  part: PartType | SoptPartType;
  group: Group;
  season: number;
};

export type FilterAction =
  | { type: 'SET_PART'; payload: PartType | SoptPartType }
  | { type: 'SET_GROUP'; payload: Group }
  | { type: 'SET_SEASON'; payload: number };

const reducer = (state: FilterState, action: FilterAction): FilterState => {
  switch (action.type) {
    case 'SET_PART':
      return { ...state, part: action.payload };
    case 'SET_GROUP':
      return { ...state, group: action.payload };
    case 'SET_SEASON':
      return { ...state, season: action.payload };
    default:
      return state;
  }
};

export const useFilterReducer = () => {
  const initialState: FilterState = {
    part: COMMON_QUESTION,
    group: 'YB',
    season: 0,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleFilterChange = (
    type: FilterAction['type'],
    value: PartType | SoptPartType | Group | number,
  ) => {
    dispatch({ type, payload: value } as FilterAction);
  };

  const setPart = (value: PartType | SoptPartType) =>
    handleFilterChange('SET_PART', value);
  const setGroup = (value: Group) => handleFilterChange('SET_GROUP', value);
  const setSeason = (value: number) => handleFilterChange('SET_SEASON', value);

  return {
    state,
    handleFilterChange,
    setPart,
    setGroup,
    setSeason,
  };
};
