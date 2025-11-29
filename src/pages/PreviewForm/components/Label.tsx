import { Fragment, type HTMLAttributes } from 'react';

interface LabelProps extends HTMLAttributes<HTMLHeadingElement> {
  children: string;
  maxCount: number;
  required: boolean;
  label: string;
}

const Label = ({
  children,
  maxCount,
  required,
  label,
  ...props
}: LabelProps) => {
  const questionArray = children.split('\n');
  const firstEmptyIndex = questionArray.indexOf('');

  const renderQuestions = (questions: string[], limit: number) =>
    questions.slice(0, limit).map((item, idx) => (
      <Fragment key={`${item}-${idx}`}>
        {item}
        {idx !== limit - 1 && '\n'}
      </Fragment>
    ));

  const renderRestQuestions = (questions: string[]) =>
    questions.slice(firstEmptyIndex).map((item, idx) => (
      <Fragment key={`${item}-${idx}`}>
        {item}
        {'\n'}
      </Fragment>
    ));

  return (
    <h4
      className="w-[72rem] title_5_18_sb whitespace-pre-line break-words"
      {...props}
    >
      <label htmlFor={label} className="cursor-pointer text-gray-950">
        <span>
          {firstEmptyIndex === -1
            ? children
            : renderQuestions(questionArray, firstEmptyIndex)}
          <span className="relative">
            {' '}
            {maxCount > 0 && `(${maxCount}자)`}
            {required && (
              <i className="absolute bottom-[5px] inline-block rounded-full w-[8px] h-[8px] bg-gray-950 translate-x-[5px] translate-y-[-2px]" />
            )}
          </span>
        </span>
        {firstEmptyIndex !== -1 && (
          <>
            <br />
            <span>{renderRestQuestions(questionArray)}</span>
          </>
        )}
      </label>
    </h4>
  );
};

export default Label;
