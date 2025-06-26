import { Logo } from '@/assets/svg';
import { Button, TextField } from '@sopt-makers/ui';

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-[1.2rem]">
      <div className="flex flex-col items-center justify-center gap-[1.2rem]">
        <Logo width={172} />
        <h1 className="heading_5_20_b text-gray10">Recruit Admin</h1>
      </div>
      <form className="flex flex-col gap-[1.6rem] w-[40rem]">
        <TextField
          labelText="이메일"
          placeholder="이메일 주소를 입력해주세요."
        />
        <TextField
          labelText="비밀번호"
          placeholder="비밀번호를 입력해주세요."
        />
        <Button type="submit" className="mt-[3.2rem]">
          로그인
        </Button>
      </form>
    </div>
  );
};
export default Login;
