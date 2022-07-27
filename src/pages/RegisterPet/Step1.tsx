import { useForm } from 'react-hook-form';
import FormInput from '@/components/Form/FormInput';
import FormButton from '@/components/Form/FormButton';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/config';
import { selectRegisterInfo, setRegisterInfo } from '@/store/slices/registerPetSlice';
import { ButtonWrapper, Form, PageContainer, QuestionText, SubQuestionText } from './index.style';

interface Step1Form {
  name: string;
}
export default function Step1({ goNextStep }: any) {
  const dispatch = useAppDispatch();
  const registerInfo = useAppSelector(selectRegisterInfo);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Step1Form>();

  const isButtonDisabled = !watch('name');
  const onSubmitForm = ({ name }: Step1Form) => {
    dispatch(setRegisterInfo({ name }));
    goNextStep();
  };

  useEffect(() => {
    if (!registerInfo) return;
    setValue('name', registerInfo.name);
  }, []);

  return (
    <PageContainer>
      <div className="flex flex-col gap-5 h-full">
        <div>
          <QuestionText>이름이 어떻게 되나요?</QuestionText>
          <SubQuestionText>되도록 10자 이내였으면 좋겠어요!</SubQuestionText>
        </div>
        <Form onSubmit={handleSubmit(onSubmitForm)}>
          <FormInput
            label=""
            name="pet-name"
            placeholder="반려동물의 이름을 입력해주세요"
            rules={register('name', {
              required: '이름을 입력해주세요',
              maxLength: 20,
            })}
            type="text"
            isError={!!errors.name?.message}
            errorMessage={errors.name?.message}
          />
          <ButtonWrapper>
            <FormButton name="다음으로" disabled={isButtonDisabled} />
          </ButtonWrapper>
        </Form>
      </div>
    </PageContainer>
  );
}