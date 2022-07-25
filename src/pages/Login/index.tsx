import Button from '@/components/Button';
import useBottomSheet from '@/utils/hooks/useBottomSheet';

import JoinLink from './components/JoinLink';
import SocialLoginForm from './components/SocialLoginForm';
import { PageContainer, LogoContainer, FormContainer, MockLogo } from './index.style';
import EmailLoginSheet from './EmailLoginSheet';
import SignUpSheet from './SignUpSheet';

export default function LoginPage() {
  const { isBottomSheetOpen: isEmailBottomSheetOpen, openBottomSheet: openEmailLoginSheet } =
    useBottomSheet('emailLogin');
  const { isBottomSheetOpen: isSignUpBottomSheetOpen } = useBottomSheet('signUp');

  return (
    <>
      <PageContainer>
        <LogoContainer>
          <MockLogo>로고</MockLogo>
        </LogoContainer>
        <FormContainer>
          <SocialLoginForm />
          <Button
            className="border-[1.5px] border-white"
            label="이메일로 로그인"
            backgroundColor="transparent"
            size="full"
            primary="first"
            onClick={openEmailLoginSheet}
          />
          <JoinLink color="white" />
        </FormContainer>
      </PageContainer>
      <EmailLoginSheet isOpen={isEmailBottomSheetOpen} />
      <SignUpSheet isOpen={isSignUpBottomSheetOpen} />
    </>
  );
}
