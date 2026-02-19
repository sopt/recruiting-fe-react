import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';
import type { Group } from '@/pages/PostQuestion/types';

interface SeasonGroupContextValue {
  season: number;
  group: Group;
  setSeason: (season: number) => void;
  setGroup: (group: Group) => void;
}

const SeasonGroupContext = createContext<SeasonGroupContextValue | null>(null);

interface SeasonGroupProviderProps {
  children: ReactNode;
}

export const SeasonGroupProvider = ({
  children,
}: SeasonGroupProviderProps) => {
  const [season, setSeason] = useState(0);
  const [group, setGroup] = useState<Group>('YB');

  const value = {
    season,
    group,
    setSeason,
    setGroup,
  };

  return (
    <SeasonGroupContext.Provider value={value}>
      {children}
    </SeasonGroupContext.Provider>
  );
};

export const useSeasonGroup = () => {
  const context = useContext(SeasonGroupContext);

  if (!context)
    throw new Error(
      'useSeasonGroup 훅은 SeasonGroupProvider 내에서만 사용할 수 있습니다.'
    );

  return context;
};
