import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import { authState } from '@/store/auth';
import { createPortal } from 'react-dom';

export default function DeleteAccount() {
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const setAuth = useSetRecoilState(authState);
  const router = useRouter();

  // 컴포넌트가 마운트되었는지 확인
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // 모달이 열릴 때 body에 overflow: hidden 추가하여 스크롤 방지
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  // 회원탈퇴 처리 함수
  const handleDeleteAccount = async () => {
    try {
      // TODO: 회원탈퇴 API 연결
      // await deleteAccount();

      // 로그아웃 처리
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('profileImage');

      // 인증 상태 초기화
      setAuth({
        isLoggedIn: false,
        userInfo: null,
      });

      // 홈으로 리다이렉트
      router.push('/');

      // 회원탈퇴 완료 메시지 표시
      alert('회원탈퇴가 완료되었습니다.');
    } catch (error) {
      console.error('회원탈퇴 실패:', error);
      alert('회원탈퇴 처리 중 오류가 발생했습니다.');
    }
  };

  // 모달 외부 클릭 시 모달 닫기
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  // 모달 컴포넌트
  const Modal = () => {
    return (
      <>
        {/* 전체 페이지 오버레이 */}
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999]"></div>

        {/* 모달 컨테이너 */}
        <div
          className="fixed inset-0 flex justify-center items-center z-[10000]"
          onClick={handleBackdropClick}
        >
          <div className="w-[456px] bg-[#FCFCFC] rounded-[16px] p-6 shadow-[0px_0px_16px_0px_rgba(0,0,0,0.06)]">
            <h3 className="text-[24px] font-bold text-black mb-4">회원탈퇴</h3>
            <p className="text-[#666666] text-[16px] mb-8">
              회원탈퇴 시 모든 데이터는 삭제됩니다.
            </p>

            {/* 버튼 영역 */}
            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={handleDeleteAccount}
                className="h-8 px-6 py-2 bg-[#fcfcfc] rounded-lg border border-[#f44336] flex justify-center items-center gap-2.5 text-[#f44336] text-sm font-medium leading-none hover:bg-[#F7F8FA] transition-colors"
              >
                회원탈퇴
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="h-8 px-6 py-2 bg-[#4caf50] rounded-lg flex justify-center items-center gap-2.5 text-white text-sm font-medium leading-none hover:bg-[#47A34B] transition-colors"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="rounded-lg overflow-hidden">
      <button
        onClick={() => setShowModal(true)}
        className="w-full h-8 px-6 py-2 bg-[#fcfcfc] rounded-lg border border-[#f44336] flex justify-center items-center gap-2.5 text-[#f44336] text-sm font-medium leading-none hover:bg-[#F7F8FA] transition-colors"
      >
        회원탈퇴
      </button>

      {/* Portal을 사용하여 모달을 body에 직접 렌더링 */}
      {mounted && showModal && createPortal(<Modal />, document.body)}
    </div>
  );
}
