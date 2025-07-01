import YbObRadioGroup from '@/components/YbObRadioGroup';
import PeriodCalendar from '@/pages/PostGeneration/components/PeriodCalendar';
import { usePostGeneration } from '@/pages/PostGeneration/hooks/queries';
import { formatDate } from '@/pages/PostGeneration/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Dialog,
  DialogContext,
  TextArea,
  TextField,
} from '@sopt-makers/ui';
import { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const postGenerationSchema = z.object({
  generationName: z.string().min(1).max(30, '기수명은 30자 이하여야 합니다.'),
  type: z.enum(['YB', 'OB']),
  generation: z.string().min(1),
  application: z.object({
    start: z.string().min(1),
    end: z.string().min(1),
  }),
  applicationResult: z.object({
    start: z.string().min(1),
    end: z.string().min(1),
  }),
  interview: z.object({
    start: z.string().min(1),
    end: z.string().min(1),
  }),
  finalResult: z.object({
    start: z.string().min(1),
    end: z.string().min(1),
  }),
});

type PostGenerationFormData = z.infer<typeof postGenerationSchema>;

const PostGenerationModal = () => {
  const { closeDialog } = useContext(DialogContext);

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<PostGenerationFormData>({
    resolver: zodResolver(postGenerationSchema),
    defaultValues: {
      generationName: '',
      type: 'YB',
      generation: '',
      application: { start: '', end: '' },
      applicationResult: { start: '', end: '' },
      interview: { start: '', end: '' },
      finalResult: { start: '', end: '' },
    },
  });

  const watchedValues = watch();

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
    closeDialog();
  };

  const isDisabled = !isValid;

  return (
    <div className="flex flex-col gap-[2.4rem] w-[58rem] h-[75vh]">
      <form
        className="flex flex-col w-[64rem] mt-[2.6rem] justify-between h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="!flex !flex-col !gap-[3.2rem]">
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
            {/* TODO: 기수명 에러 처리 */}
          </div>
          <div className="flex gap-[1.6rem]">
            <Controller
              name="generation"
              control={control}
              render={({ field }) => (
                <TextField
                  value={field.value}
                  onChange={field.onChange}
                  labelText="기수"
                  placeholder="기수를 입력하세요."
                  className="[&>div:nth-child(2)]:!mt-[0.8rem] [&>div:nth-child(2)]:!bg-gray700 [&>div:nth-child(2)]:!w-[18rem]"
                  required
                />
              )}
            />
            <div className="flex-1 flex items-end py-[1.1rem]">
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <YbObRadioGroup
                    group={field.value}
                    setGroup={field.onChange}
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
        <Dialog.Footer align="right">
          <Button theme="black" type="button" onClick={closeDialog}>
            취소하기
          </Button>
          <Button disabled={isDisabled} type="submit">
            등록하기
          </Button>
        </Dialog.Footer>
      </form>
    </div>
  );
};

export default PostGenerationModal;
