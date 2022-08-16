import AppleSignin from 'react-apple-signin-auth';
import styled from 'styled-components';

const ButtonWrap = styled.div`
  width: 100%;
  button {
    width: 100%;
    border: none;
    border-radius: 10px;
    border: none;
    box-shadow: 2px 2px 10px rgb(0 0 0 / 15%);
    line-height: 29px;
    font-size: 20px;
    text-align: center;
    width: 100%;
  }
`;
const AppleLoginButton = () => (
  <ButtonWrap>
    <AppleSignin
      authOptions={{
        clientId: 'us.petalog.services',
        scope: 'email name',
        redirectURI: 'https://petalog.us/auth/apple/callback',
        usePopup: true,
      }}
      uiType="dark"
      className="apple-auth-btn"
      noDefaultStyle={false}
      buttonExtraChildren="Apple로 로그인"
      onSuccess={(response: any) => {
        console.log('after popup', response);
      }}
    />
  </ButtonWrap>
);
export default AppleLoginButton;
