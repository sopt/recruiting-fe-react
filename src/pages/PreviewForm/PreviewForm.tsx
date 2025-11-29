import { useCallback, useEffect, useRef, useState } from 'react';
import { useGetQuestionList } from '@/pages/PostQuestion/hooks/queries';
import ApplyCategory from '@/pages/PreviewForm/components/ApplyCategory';
import ApplyHeader from '@/pages/PreviewForm/components/ApplyHeader';
import ApplyInfo from '@/pages/PreviewForm/components/ApplyInfo';
import CommonSection from '@/pages/PreviewForm/components/CommonSection';
import DefaultSection from '@/pages/PreviewForm/components/DefaultSection';

const PreviewForm = () => {
  const [isInView, setIsInView] = useState([true, false]);

  const minIndex = isInView.findIndex((value) => value === true);

  const sectionsRef = useRef<HTMLElement[]>([]);
  const [sectionsUpdated, setSectionsUpdated] = useState(false);

  const refCallback = useCallback((element: HTMLElement) => {
    if (element && !sectionsRef.current.includes(element)) {
      sectionsRef.current.push(element);
      if (sectionsRef.current.length === 2) {
        setSectionsUpdated(true);
      }
    }
  }, []);

  // TODO: season과 group을 전역 상태에서 받아오도록
  const { data: questionData } = useGetQuestionList(38, 'YB');

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

  useEffect(() => {
    if (!sectionsUpdated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.getAttribute('id');
          // TODO: partial 추가
          const sectionIndex = ['default', 'common'].indexOf(sectionId!);

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
    <div className="w-full p-8 flex flex-col bg-white min-h-screen items-center">
      <ApplyHeader />
      <div className="flex flex-col gap-[7rem]">
        <ApplyInfo />
        <ApplyCategory minIndex={minIndex} />
        <DefaultSection refCallback={refCallback} />
        <CommonSection questions={commonQuestions} refCallback={refCallback} />
      </div>
    </div>
  );
};

export default PreviewForm;
