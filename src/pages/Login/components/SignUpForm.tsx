/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import FormButton from '@/components/Form/FormButton';
import FormInput from '@/components/Form/FormInput';
import { useSignUpMutation } from '@/store/api/userApi';
import { setBottomSheetAction } from '@/store/slices/bottomSheetSlice';
import { checkEmailDuplicated } from '../api';
import {
  CheckEmailButton,
  EmailCheckButtonWrapper,
  EmailChecked,
  EmailInputStyle,
  EmailInputWrapper,
  FormContainer,
} from './SignUpForm.style';
import { ISignUpForm } from '../types';

export default function SignUpForm({ isOpen }: { isOpen: boolean }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset: formReset,
    getValues,
    setError,
    watch,
  } = useForm<ISignUpForm>();

  const [signUp, { error, reset: mutationReset }] = useSignUpMutation();

  const [emailChecked, setEmailChecked] = useState<string>('');

  const password = watch('password');
  const passwordConfirm = watch('passwordConfirm');

  const openEmailLoginSheet = () => dispatch(setBottomSheetAction('emailLogin'));

  const onClickSignUp = async (data: ISignUpForm) => {
    if (!emailChecked || data.email !== emailChecked) {
      alert('이메일 중복체크가 필요합니다.');
      return;
    }
    await signUp(data);

    openEmailLoginSheet();
  };

  const checkEmail = async () => {
    const emailValue = getValues('email');
    if (!emailValue) return;
    const result = await trigger('email');
    if (!result) return;

    const fetchResult = await checkEmailDuplicated(emailValue);
    if (!fetchResult) {
      alert('에러가 발생하였습니다.');
      return;
    }

    if (!fetchResult.isAvailable) {
      setError('email', { message: fetchResult.message }, { shouldFocus: true });
      setEmailChecked('');
      return;
    }
    setEmailChecked(emailValue);
  };

  useEffect(() => {
    if (isOpen) return;

    formReset();
    setEmailChecked('');
  }, [isOpen]);

  return (
    <FormContainer onSubmit={handleSubmit(onClickSignUp)}>
      <FormInput
        label="이름"
        name="signup-username"
        type="text"
        placeholder="이름을 입력하세요"
        register={register('username', { required: true })}
        isError={!!errors.username}
        errorMessage={errors.username?.message}
      />

      <EmailInputWrapper>
        <EmailInputStyle>
          <FormInput
            label="이메일"
            name="signup-email"
            type="text"
            placeholder="이메일을 입력하세요"
            onChange={() => setEmailChecked('')}
            register={register('email', {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '이메일 형식이 올바르지 않습니다.',
              },
            })}
            isError={!!errors.email}
            errorMessage={errors.email?.message}
          />
        </EmailInputStyle>
        <EmailCheckButtonWrapper>
          {emailChecked ? (
            <EmailChecked>V</EmailChecked>
          ) : (
            <CheckEmailButton type="button" onClick={checkEmail}>
              확인
            </CheckEmailButton>
          )}
        </EmailCheckButtonWrapper>
      </EmailInputWrapper>
      <FormInput
        label="비밀번호"
        name="signup-password"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        register={register('password', {
          required: true,
          pattern: {
            value: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
            message: '영어 대소문자, 숫자, 특수문자를 포함해야합니다.',
          },
        })}
        isError={!!errors.password}
        errorMessage={errors.password?.message}
      />

      <FormInput
        label="비밀번호 확인"
        name="signup-passwordConfirm"
        type="password"
        placeholder="비밀번호를 확인해주세요"
        register={register('passwordConfirm', {
          required: true,
          validate: (value) => {
            if (value !== password) {
              setError('passwordConfirm', {
                message: '비밀번호가 일치하지 않습니다.',
              });
              return '비밀번호가 일치하지 않습니다.';
            }
            return undefined;
          },
          pattern: {
            value: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
            message: '영어 대소문자, 숫자, 특수문자를 포함해야합니다.',
          },
        })}
        isError={password !== passwordConfirm || !!errors.passwordConfirm}
        errorMessage={errors.passwordConfirm?.message}
      />

      <FormButton name="회원가입" disabled={false} />
    </FormContainer>
  );
}
