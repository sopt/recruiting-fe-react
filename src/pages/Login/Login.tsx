import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { Button } from '@sopt-makers/ui';
import { useState } from 'react';
import { Google, Logo } from '@/assets/svg';
import { GOOGLE_LOGIN_ERROR } from '@/pages/Login/constants';
import { usePostGoogleLogin } from '@/pages/Login/hooks/queries';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const Login = () => {
  const [error, setError] = useState('');

  const { mutate: postGoogleLogin } = usePostGoogleLogin();

  const handleGoogleError = () => {
    setError(GOOGLE_LOGIN_ERROR);
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="flex flex-col items-center justify-center w-full h-screen gap-[3.2rem]">
        <div className="flex flex-col items-center justify-center gap-[1.2rem]">
          <Logo width={172} />
          <h1 className="heading_5_20_b text-gray10">Recruit Admin</h1>
        </div>

        {/* GoogleLogin(iframe)은 CSS 커스텀 불가하기 때문에 opacity를 주고 위에 Button을 겹쳐 클릭만 통과시킴 */}
        <div className="flex flex-col items-center gap-[1.2rem]">
          <div className="relative w-[40rem] h-[4.2rem]">
            <div className="absolute inset-0 opacity-0">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  setError('');
                  if (!credentialResponse.credential) {
                    handleGoogleError();
                    return;
                  }
                  postGoogleLogin(
                    { idToken: credentialResponse.credential },
                    { onError: handleGoogleError },
                  );
                }}
                onError={handleGoogleError}
                size="large"
                width="400"
              />
            </div>
            <Button
              theme="white"
              size="lg"
              className="pointer-events-none absolute inset-0 w-full !h-[4.2rem]"
            >
              <span className="inline-flex items-center gap-[0.8rem]">
                <Google width={20} height={20} />
                Google 계정으로 로그인
              </span>
            </Button>
          </div>
          {error && <p className="text-error text-[1.4rem]">{error}</p>}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};
export default Login;
