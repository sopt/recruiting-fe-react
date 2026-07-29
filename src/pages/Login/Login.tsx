import { Logo } from '@/assets/svg';
import { IS_SOPT } from '@/constants';
import PasswordLogin from '@/pages/Login/components/PasswordLogin';
import SocialLogin from '@/pages/Login/components/SocialLogin';

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-[3.2rem]">
      <div className="flex flex-col items-center justify-center gap-[1.2rem]">
        <Logo width={172} />
        <h1 className="heading_5_20_b text-gray10">Recruit Admin</h1>
      </div>

      {/* SOPT 리크루팅 어드민 : 구글 소셜로그인 / 메이커스 리크루팅 어드민 : 비밀번호 로그인 */}
      {IS_SOPT ? <SocialLogin /> : <PasswordLogin />}
    </div>
  );
};
export default Login;
