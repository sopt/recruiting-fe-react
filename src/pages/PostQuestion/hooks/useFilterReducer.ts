import type { Group, PartName } from '@/pages/PostQuestion/types';
import { useReducer } from 'react';

export type FilterState = {
  part: PartName;
  group: Group;
  season: number;
};

export type FilterAction =
  | { type: 'SET_PART'; payload: PartName }
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
    part: '공통',
    group: 'YB',
    season: 0,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleFilterChange = (
    type: FilterAction['type'],
    value: PartName | Group | number,
  ) => {
    dispatch({ type, payload: value } as FilterAction);
  };

  const setPart = (value: PartName) => handleFilterChange('SET_PART', value);
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
