import { PART } from '@/constants';
import ApplicationTable from '@/pages/Application/components/ApplicationTable';
import Filter from '@/pages/Application/components/Filter';
import { Tab } from '@sopt-makers/ui';
import { useState } from 'react';

const Application = () => {
  const [isCompleteHidden, setIsCompleteHidden] = useState(false);
  const [isDoNotRead, setIsDoNotRead] = useState(false);
  const [isPassedOnly, setIsPassedOnly] = useState(false);

  return (
    <div className="flex flex-col gap-[4.4rem]">
      <Filter
        isCompleteHidden={isCompleteHidden}
        isDoNotRead={isDoNotRead}
        isPassedOnly={isPassedOnly}
        setIsCompleteHidden={setIsCompleteHidden}
        setIsDoNotRead={setIsDoNotRead}
        setIsPassedOnly={setIsPassedOnly}
      />
      <Tab style="primary" size="md" tabItems={PART} onChange={() => {}} />
      <hr className="border-gray800 mt-[-4.7rem] w-[98rem]" />
      <ApplicationTable data={[]} />
    </div>
  );
};

export default Application;
