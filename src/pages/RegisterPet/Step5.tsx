import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityLevelType, PetSexType } from '@/@type/pet';
import { FormInput, FormButton } from '@/components/Form';
import { concatClasses } from '@/utils/libs/concatClasses';
import { ReactComponent as MaleIcon } from '@/assets/icon/male_icon.svg';
import { ReactComponent as FemaleIcon } from '@/assets/icon/female_icon.svg';
import {
  PageContainer,
  QuestionText,
  Form,
  PetNameHighlight,
  ButtonWrapper,
  QuestionWrapper,
} from './index.style';
import { StepPageProps } from './type';

interface Step4Form {
  activityLevel: number;
  sex: PetSexType;
  isSpayed: boolean;
  isPregnant: boolean;
  bodyWeight: number;
}

export default function Step5({ goNextStep, enrollPetData, setEnrollData }: StepPageProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Step4Form>();

  const [selectedActivityLevel, setSelectedActivityLevel] = useState(
    enrollPetData?.activityLevel ?? 3,
  );
  const activityLevelString = () => {
    let description;
    // eslint-disable-next-line
    switch (selectedActivityLevel) {
      case 1:
        description = '활동이 적은 편이에요';
        break;
      case 2:
        description = '다른 아이들보다 차분한 편이에요';
        break;
      case 3:
        description = '잘 움직이는 편이에요';
        break;
      case 4:
        description = '활발해요!';
        break;
      case 5:
        description = '엄청 기운이 넘쳐요!';
        break;
    }
    return description;
  };

  const isButtonDisabled = !watch(['bodyWeight', 'sex']).every((value) => value);

  const saveFormInputs = (formInputs: any) => {
    const { bodyWeight, sex, isSpayed, isPregnant } = formInputs;

    setEnrollData('bodyWeight', bodyWeight);
    setEnrollData('activityLevel', selectedActivityLevel);
    setEnrollData('sex', sex);
    setEnrollData('isSpayed', isSpayed);
    setEnrollData('isPregnant', isPregnant);
    goNextStep();
  };

  useEffect(() => {
    if (enrollPetData) {
      setValue('sex', enrollPetData.sex);
      setValue('isSpayed', enrollPetData.isSpayed);
      setValue('isPregnant', enrollPetData.isPregnant);
      setValue('bodyWeight', enrollPetData.bodyWeight);
    }
  }, [enrollPetData]);

  const handleSelectActivityLevel = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    const level = parseInt(value, 10);
    if (Number.isNaN(level) || level < 1 || level > 5) {
      return;
    }
    setSelectedActivityLevel(level as ActivityLevelType);
  };

  return (
    <PageContainer>
      <div className="mb-4">
        <QuestionText>
          <PetNameHighlight>{enrollPetData.name}</PetNameHighlight>에 대해서 더 알려주시겠어요?
        </QuestionText>
      </div>
      <Form onSubmit={handleSubmit(saveFormInputs)}>
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex gap-1 items-center mb-2">
              <div className="flex-1 text-center w-1/2">
                <input
                  type="radio"
                  className="hidden"
                  value="MALE"
                  id="pet-sex-man"
                  {...register('sex', { required: '성별을 선택해주세요' })}
                />
                <label
                  htmlFor="pet-sex-man"
                  className={concatClasses(
                    'cursor-pointer gap-2 border border-primary-main rounded-md w-full flex items-center justify-center',
                    watch('sex') === 'MALE' ? 'bg-primary-light text-primary-main' : '',
                  )}
                >
                  <MaleIcon
                    width={14}
                    height={14}
                    fill={watch('sex') === 'MALE' ? '#1f80ee' : '#222'}
                  />
                  <span>남자</span>
                </label>
              </div>
              <div className="flex-1 text-center w-1/2">
                <input
                  type="radio"
                  className="hidden"
                  value="FEMALE"
                  id="pet-sex-woman"
                  {...register('sex', { required: '성별을 선택해주세요' })}
                />
                <label
                  htmlFor="pet-sex-woman"
                  className={concatClasses(
                    'cursor-pointer gap-2 border border-primary-main rounded-md w-full flex items-center justify-center',
                    watch('sex') === 'FEMALE' ? 'bg-primary-light text-primary-main' : '',
                  )}
                >
                  <FemaleIcon
                    width={14}
                    height={14}
                    fill={watch('sex') === 'FEMALE' ? '#1f80ee' : '#222'}
                  />
                  <span>여자</span>
                </label>
              </div>
            </div>
            <p className="text-primary-main text-sm">{errors.sex?.message}</p>
          </div>
          <FormInput
            label="몸무게"
            name="bodyWeight"
            unit="KG"
            placeholder="몸무게를 입력해주세요"
            rules={register('bodyWeight', {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
                message: '숫자를 입력해주세요',
              },
            })}
            type="text"
          />
          <div className="flex flex-col gap-2">
            <p className="font-medium text-[14px]">활동수준</p>
            <div className="flex flex-col gap-3">
              <div>
                <input
                  type="range"
                  name="activity-level"
                  id="activity-level"
                  list="tickmarks"
                  className="w-full h-1.5 rounded-lg bg-gray-200 appearance-none cursor-pointer dark:gray-600"
                  min="1"
                  max="5"
                  value={selectedActivityLevel}
                  onChange={handleSelectActivityLevel}
                />
              </div>
              <div>
                <p className="text-primary-bright text-sm">{activityLevelString()}</p>
              </div>
            </div>
          </div>

          <div>
            <QuestionWrapper>
              <input type="checkbox" id="spayed" {...register('isSpayed')} />
              <label htmlFor="spayed">중성화를 했나요?</label>
            </QuestionWrapper>
            <QuestionWrapper>
              <input type="checkbox" id="pregnant" {...register('isPregnant')} />
              <label htmlFor="pregnant">임신/수유 중인가요?</label>
            </QuestionWrapper>
          </div>
        </div>
        <ButtonWrapper>
          <FormButton name="등록완료" disabled={isButtonDisabled} />
        </ButtonWrapper>
      </Form>
    </PageContainer>
  );
}
