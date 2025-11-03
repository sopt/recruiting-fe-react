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
import { formatDateWithBar, formatTime } from '@/pages/PostGeneration/utils';
import { scrollToBottom } from '@/utils/scroll';

const DEFAULT_FORM_VALUES: PostGenerationFormData = {
  generationName: '',
  type: 'YB',
  generation: '',
  application: { start: '', end: '' },
  applicationResult: { start: '', end: '' },
  interview: { start: '', end: '' },
  finalResult: { start: '', end: '' },
  applicationStartTime: '',
  applicationEndTime: '',
  applicationResultStartTime: '',
  applicationResultEndTime: '',
  interviewStartTime: '',
  interviewEndTime: '',
  finalResultStartTime: '',
  finalResultEndTime: '',
};

const PostGenerationModal = () => {
  const dialogRef = useRef<HTMLFormElement | null>(null);
  const { closeDialog } = useContext(DialogContext);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PostGenerationFormData>({
    resolver: zodResolver(postGenerationSchema),
    defaultValues: DEFAULT_FORM_VALUES,
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
  });

  const watchedValues = watch();

  const { data: generationData } = useGetGeneration(watchedValues.type);

  const { mutate: postGeneration } = usePostGeneration({
    season: Number(watchedValues.generation),
    type: watchedValues.type,
    name: watchedValues.generationName,
    applicationStart: `${formatDateWithBar(
      watchedValues.application.start
    )} ${formatTime(watchedValues.applicationStartTime)}`,
    applicationEnd: `${formatDateWithBar(
      watchedValues.application.end
    )} ${formatTime(watchedValues.applicationEndTime)}`,
    interviewStart: `${formatDateWithBar(
      watchedValues.interview.start
    )} ${formatTime(watchedValues.interviewStartTime)}`,
    interviewEnd: `${formatDateWithBar(
      watchedValues.interview.end
    )} ${formatTime(watchedValues.interviewEndTime)}`,
    applicationResultStart: `${formatDateWithBar(
      watchedValues.applicationResult.start
    )} ${formatTime(watchedValues.applicationResultStartTime)}`,
    applicationResultEnd: `${formatDateWithBar(
      watchedValues.applicationResult.end
    )} ${formatTime(watchedValues.applicationResultEndTime)}`,
    finalResultStart: `${formatDateWithBar(
      watchedValues.finalResult.start
    )} ${formatTime(watchedValues.finalResultStartTime)}`,
    finalResultEnd: `${formatDateWithBar(
      watchedValues.finalResult.end
    )} ${formatTime(watchedValues.finalResultEndTime)}`,
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

    return generationData?.seasons?.some(
      (season) => season.season === inputSeason && season.group === inputType
    );
  }, [watchedValues.generation, generationData?.seasons]);

  const schemaResult = postGenerationSchema.safeParse(watchedValues);
  const isDisabled = !schemaResult.success || isDuplicate;

  return (
    <>
      <Dialog.Title>
        <div className="flex justify-between items-center pb-[2.2rem] pl-[0.2rem]">
          <h1 className="font-bold text-[2.8rem] font-weight-[700]">
            신규 기수 등록
          </h1>
          <Button
            disabled={isDisabled}
            type="button"
            onClick={handleSubmit(onSubmit)}
          >
            등록하기
          </Button>
        </div>
      </Dialog.Title>
      <Dialog.Description>
        <div className="flex flex-col gap-[2.4rem] w-[62rem] !overflow-hidden">
          <form
            ref={dialogRef}
            className="flex flex-col w-[64rem] justify-between !max-h-[52.7rem] !overflow-y-scroll !p-[0.2rem] !pt-[2.6rem] !pb-[10rem] scrollbar-hide"
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
                  className={`flex-1 flex items-end ${
                    isDuplicate ? 'py-[3.5rem]' : 'py-[1.1rem]'
                  }`}
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
                render={() => (
                  <PeriodCalendar
                    label="서류 접수 기간"
                    required
                    dateRange="application"
                    startTime="applicationStartTime"
                    endTime="applicationEndTime"
                    startTimeError={errors.applicationStartTime}
                    endTimeError={errors.applicationEndTime}
                    control={control}
                  />
                )}
              />

              <Controller
                name="applicationResult"
                control={control}
                render={() => (
                  <PeriodCalendar
                    label="서류 결과 확인 기간"
                    required
                    dateRange="applicationResult"
                    startTime="applicationResultStartTime"
                    endTime="applicationResultEndTime"
                    startTimeError={errors.applicationResultStartTime}
                    endTimeError={errors.applicationResultEndTime}
                    control={control}
                  />
                )}
              />

              <Controller
                name="interview"
                control={control}
                render={() => (
                  <PeriodCalendar
                    label="면접 기간"
                    required
                    dateRange="interview"
                    startTime="interviewStartTime"
                    endTime="interviewEndTime"
                    startTimeError={errors.interviewStartTime}
                    endTimeError={errors.interviewEndTime}
                    control={control}
                  />
                )}
              />

              <Controller
                name="finalResult"
                control={control}
                render={() => (
                  <PeriodCalendar
                    label="최종 결과 확인 기간"
                    required
                    dateRange="finalResult"
                    startTime="finalResultStartTime"
                    endTime="finalResultEndTime"
                    startTimeError={errors.finalResultStartTime}
                    endTimeError={errors.finalResultEndTime}
                    control={control}
                  />
                )}
              />
            </div>
          </form>
        </div>
      </Dialog.Description>
    </>
  );
};

export default PostGenerationModal;
