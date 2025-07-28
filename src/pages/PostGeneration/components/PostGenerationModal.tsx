import YbObRadioGroup from '@/components/YbObRadioGroup';
import PeriodCalendar from '@/pages/PostGeneration/components/PeriodCalendar';
import {
  useGetGeneration,
  usePostGeneration,
} from '@/pages/PostGeneration/hooks/queries';
import {
  type PostGenerationFormData,
  postGenerationSchema,
} from '@/pages/PostGeneration/types';
import { formatDate } from '@/pages/PostGeneration/utils';
import { scrollToBottom } from '@/utils/scroll';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Dialog,
  DialogContext,
  TextArea,
  TextField,
} from '@sopt-makers/ui';
import { type RefObject, useContext, useMemo, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';

const DEFAULT_FORM_VALUES: PostGenerationFormData = {
  generationName: '',
  type: 'YB',
  generation: '',
  application: { start: '', end: '' },
  applicationResult: { start: '', end: '' },
  interview: { start: '', end: '' },
  finalResult: { start: '', end: '' },
};

const PostGenerationModal = () => {
  const dialogRef = useRef<HTMLFormElement | null>(null);
  const { closeDialog } = useContext(DialogContext);

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<PostGenerationFormData>({
    resolver: zodResolver(postGenerationSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const watchedValues = watch();

  const { data: generationData } = useGetGeneration(watchedValues.type);

  const { mutate: postGeneration } = usePostGeneration({
    season: Number(watchedValues.generation),
    type: watchedValues.type,
    name: watchedValues.generationName,
    applicationStart: formatDate(watchedValues.application.start),
    applicationEnd: formatDate(watchedValues.application.end),
    interviewStart: formatDate(watchedValues.interview.start),
    interviewEnd: formatDate(watchedValues.interview.end),
    applicationResultStart: formatDate(watchedValues.applicationResult.start),
    applicationResultEnd: formatDate(watchedValues.applicationResult.end),
    finalResultStart: formatDate(watchedValues.finalResult.start),
    finalResultEnd: formatDate(watchedValues.finalResult.end),
  });

  const onSubmit = () => {
    postGeneration();
    handleSubmit(onSubmit);
    closeDialog();
  };

  const handleGenerationBlur = () => {
    if (watchedValues.generation && watchedValues.generationName) {
      requestAnimationFrame(() => {
        scrollToBottom(dialogRef as RefObject<HTMLElement>);
      });
    }
  };

  const isDuplicate = useMemo(() => {
    const inputSeason = Number(watchedValues.generation);
    const inputType = watchedValues.type;

    return generationData.seasons.some(
      (season) => season.season === inputSeason && season.group === inputType,
    );
  }, [watchedValues.generation, watchedValues.type, generationData?.seasons]);

  const isDisabled = !isValid || isDuplicate;

  return (
    <div className="flex flex-col gap-[2.4rem] w-[58rem] !overflow-hidden">
      <form
        ref={dialogRef}
        className="flex flex-col w-[64rem] justify-between !max-h-[52.7rem] !overflow-y-scroll !p-[0.2rem] !pt-[2.6rem] !pb-[10rem]"
      >
        <div className="flex flex-col !gap-[3.2rem]">
          <div className="!flex !flex-col !gap-[0.8rem]">
            <Controller
              name="generationName"
              control={control}
              render={({ field }) => (
                <TextArea
                  topAddon={{
                    labelText: '기수명',
                  }}
                  value={field.value}
                  onChange={field.onChange}
                  maxLength={30}
                  placeholder="기수명을 입력하세요."
                  className="[&>div:nth-child(2)]:!bg-gray700 [&>label]:!mb-[0.8rem]"
                  required
                />
              )}
            />
          </div>
          <div className="flex gap-[1.6rem]">
            <Controller
              name="generation"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-[0.8rem]">
                  <TextField
                    value={field.value}
                    onChange={field.onChange}
                    isError={isDuplicate}
                    labelText="기수"
                    placeholder="기수를 입력하세요."
                    errorMessage="이미 추가된 기수입니다."
                    className="[&>div:nth-child(2)]:!mt-[0.8rem] [&>div:nth-child(2)]:!bg-gray700 [&>div:nth-child(2)]:!w-[18rem]"
                    required
                    onBlur={handleGenerationBlur}
                  />
                </div>
              )}
            />
            <div
              className={`flex-1 flex items-end ${isDuplicate ? 'py-[3.5rem]' : 'py-[1.1rem]'}`}
            >
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <YbObRadioGroup
                    group={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>

          <Controller
            name="application"
            control={control}
            render={({ field }) => (
              <PeriodCalendar
                label="서류 접수 기간"
                required
                selectedDateRange={[field.value.start, field.value.end]}
                onSelectDateRange={(dateRange) => {
                  field.onChange({ start: dateRange[0], end: dateRange[1] });
                }}
              />
            )}
          />

          <Controller
            name="applicationResult"
            control={control}
            render={({ field }) => (
              <PeriodCalendar
                label="서류 결과 확인 기간"
                required
                selectedDateRange={[field.value.start, field.value.end]}
                onSelectDateRange={(dateRange) => {
                  field.onChange({ start: dateRange[0], end: dateRange[1] });
                }}
              />
            )}
          />

          <Controller
            name="interview"
            control={control}
            render={({ field }) => (
              <PeriodCalendar
                label="면접 기간"
                required
                selectedDateRange={[field.value.start, field.value.end]}
                onSelectDateRange={(dateRange) => {
                  field.onChange({ start: dateRange[0], end: dateRange[1] });
                }}
              />
            )}
          />

          <Controller
            name="finalResult"
            control={control}
            render={({ field }) => (
              <PeriodCalendar
                label="최종 결과 확인 기간"
                required
                selectedDateRange={[field.value.start, field.value.end]}
                onSelectDateRange={(dateRange) => {
                  field.onChange({ start: dateRange[0], end: dateRange[1] });
                }}
              />
            )}
          />
        </div>
      </form>
      <div className="absolute bottom-[2rem] right-[2.2rem] flex items-center justify-end w-[59rem] h-[8rem] pt-[2.2rem] bg-gray800 z-10">
        <Dialog.Footer align="right">
          <Button theme="black" type="button" onClick={closeDialog}>
            취소하기
          </Button>
          <Button
            disabled={isDisabled}
            type="button"
            onClick={handleSubmit(onSubmit)}
          >
            등록하기
          </Button>
        </Dialog.Footer>
      </div>
    </div>
  );
};

export default PostGenerationModal;
