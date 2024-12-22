'use client';

import { ChevronLeft } from 'lucide-react';
import { PasswordInput } from '@/components/ui/Input/PasswordInput';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function SetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    password: '',
    confirm: '',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //TODO: 비밀번호 검증로직 구현

    // 비밀번호 형식 검사 (영문, 숫자, 특수문자)
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      setErrors((prev) => ({
        ...prev,
        password: '사용하실 수 없는 비밀번호입니다.',
      }));
      return;
    }

    // 비밀번호 확인 입력 여부 검사
    if (!confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirm: '비밀번호가 입력되지 않습니다.',
      }));
      return;
    }

    // 비밀번호 일치 여부 검사
    if (password !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirm: '비밀번호가 일치하지 않습니다.',
      }));
      return;
    }

    // 모든 검증 통과시
    localStorage.setItem('userPassword', password);
    router.push('/signup/profile');
  };

  // 입력값 변경 시 해당 필드의 에러 메시지만 초기화
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'password' | 'confirm',
  ) => {
    const { value } = e.target;
    if (type === 'password') {
      setPassword(value);
      setErrors((prev) => ({ ...prev, password: '' }));
    } else {
      setConfirmPassword(value);
      setErrors((prev) => ({ ...prev, confirm: '' }));
    }
  };

  return (
    <div className="relative w-full">
      <button
        onClick={() => router.back()}
        className="absolute -top-12 -left-12"
        aria-label="뒤로 가기"
      >
        <ChevronLeft className="h-6 w-6 text-[#666666] hover:text-[#4D4D4D]" />
      </button>

      <div className="w-full max-w-[360px] mx-auto">
        <div className="space-y-[20px] mb-[60px]">
          <h1 className="text-[30px] font-bold text-left">환영합니다!</h1>
          <p className="text-[16px] text-[#666666] text-left">
            비밀번호를 설정해주세요
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-[16px] text-black">비밀번호</label>
                {errors.password && (
                  <p className="text-[14px] text-[#FF3D5E]">
                    {errors.password}
                  </p>
                )}
              </div>
              <PasswordInput
                value={password}
                onChange={(e) => handleChange(e, 'password')}
                placeholder="비밀번호를 입력하세요"
                required
                className={`w-full ${errors.password ? 'border-[#FF3D5E] border' : ''}`}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-[16px] text-black">비밀번호 확인</label>
                {errors.confirm && (
                  <p className="text-[14px] text-[#FF3D5E]">{errors.confirm}</p>
                )}
              </div>
              <PasswordInput
                value={confirmPassword}
                onChange={(e) => handleChange(e, 'confirm')}
                placeholder="비밀번호를 다시 입력하세요"
                required
                className={`w-full ${errors.confirm ? 'border-[#FF3D5E] border' : ''}`}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-[48px] bg-[#0A0A0A] text-white rounded-lg hover:opacity-90 mt-[60px]"
          >
            다음
          </button>
        </form>
      </div>
    </div>
  );
}
