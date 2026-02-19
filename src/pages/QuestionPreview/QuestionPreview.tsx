import { useCallback, useEffect, useRef, useState } from 'react';
import { useSeasonGroup } from '@/contexts/SeasonGroupContext';
import { useGetQuestionList } from '@/pages/PostQuestion/hooks/queries';
import ApplyCategory from '@/pages/QuestionPreview/components/ApplyCategory';
import ApplyHeader from '@/pages/QuestionPreview/components/ApplyHeader';
import ApplyInfo from '@/pages/QuestionPreview/components/ApplyInfo';
import BottomSection from '@/pages/QuestionPreview/components/BottomSection';
import CommonSection from '@/pages/QuestionPreview/components/CommonSection';
import DefaultSection from '@/pages/QuestionPreview/components/DefaultSection';
import PartSection from '@/pages/QuestionPreview/components/PartSection';

const QuestionPreview = () => {
  const [isInView, setIsInView] = useState([true, false, false]);
  const [selectedPart, setSelectedPart] = useState<string>('');
  const [sectionsUpdated, setSectionsUpdated] = useState(false);

  const { season, group } = useSeasonGroup();
  const { data: questionData } = useGetQuestionList(season, group);

  const minIndex = isInView.findIndex((value) => value === true);

  const sectionsRef = useRef<HTMLElement[]>([]);

  const refCallback = useCallback((element: HTMLElement) => {
    if (element && !sectionsRef.current.includes(element)) {
      sectionsRef.current.push(element);
      if (sectionsRef.current.length === 3) {
        setSectionsUpdated(true);
      }
    }
  }, []);

  const commonQuestions = questionData?.commonQuestions.map(
    (question, index) => ({
      id: question.id || index + 1,
      question: question.content,
      charLimit: question.charLimit || 0,
      placeholder: question.placeholder || '내용을 입력해주세요',
      urls: question.link ? [question.link] : undefined,
      isFile: question.isFile,
      optional: !question.required,
      isDescription: question.isDescription,
    })
  );

  const partOptions = questionData?.partQuestions.map((partQuestion) => ({
    value: partQuestion.part,
    label: partQuestion.part,
  }));

  const filteredPartQuestions = questionData?.partQuestions
    .find((partQuestion) => partQuestion.part === selectedPart)
    ?.questions.map((question, index) => ({
      id: question.id || index + 1,
      question: question.content || '',
      charLimit: question.charLimit || undefined,
      placeholder: question.placeholder || undefined,
      urls: question.link ? [question.link] : undefined,
      isFile: question.isFile,
      optional: !question.required,
      isDescription: question.isDescription,
    }));

  useEffect(() => {
    if (!sectionsUpdated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.getAttribute('id');
          const sectionIndex = ['default', 'common', 'partial'].indexOf(
            sectionId!
          );

          if (sectionIndex !== -1) {
            setIsInView((prev) => {
              const updatedState = [...prev];
              updatedState[sectionIndex] = entry.isIntersecting;
              return updatedState;
            });
          }
        });
      },
      { root: null, rootMargin: '-220px' }
    );

    sectionsRef.current.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => observer.unobserve(section));
    };
  }, [sectionsUpdated]);

  return (
    <div className="w-full p-8 flex flex-col bg-white min-h-screen items-center overflow-x-hidden">
      <ApplyHeader />
      <div className="flex flex-col gap-[7rem]">
        <ApplyInfo />
        <ApplyCategory minIndex={minIndex} />
        <DefaultSection refCallback={refCallback} />
        <CommonSection questions={commonQuestions} refCallback={refCallback} />
        <PartSection
          refCallback={refCallback}
          part={selectedPart}
          partOptions={partOptions}
          filteredQuestions={filteredPartQuestions}
          onPartChange={setSelectedPart}
        />
        <BottomSection />
      </div>
    </div>
  );
};

export default QuestionPreview;
