import type { Group, PartName } from '@/pages/PostQuestion/types';

// 타입 정의
type State = {
  part: PartName;
  group: Group;
  season: number;
};

type Action =
  | { type: 'SET_PART'; payload: PartName }
  | { type: 'SET_GROUP'; payload: Group }
  | { type: 'SET_SEASON'; payload: number };

// 리듀서 함수
const useFilterReducer = (state: State, action: Action): State => {
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

export default useFilterReducer;
