import React from "react";

export const FontTest = () => {
  return (
    <div className="space-y-12">
      {/* Pretendard 폰트 섹션 */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg">Pretendard 폰트</h3>
        <div className="space-y-2">
          <p className="font-pretendard text-[30pt] font-bold">
            모하지 스튜디오 1234567890 (Bold)
          </p>
          <p className="font-pretendard text-[16pt] font-medium">
            모하지 스튜디오 1234567890 (Medium)
          </p>
          <p className="font-pretendard text-[16pt]">
            가나다라마바사아자차카타파하 (Regular)
          </p>
          <p className="font-pretendard text-[16pt]">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ (Regular)
          </p>
        </div>
      </div>

      {/* 시스템 기본 폰트 섹션 */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg">시스템 기본 폰트</h3>
        <div className="space-y-2">
          <p className="font-sans text-[30pt] font-bold">
            모하지 스튜디오 1234567890 (Bold)
          </p>
          <p className="font-sans text-[16pt] font-medium">
            모하지 스튜디오 1234567890 (Medium)
          </p>
          <p className="font-sans text-[16pt]">
            가나다라마바사아자차카타파하 (Regular)
          </p>
          <p className="font-sans text-[16pt]">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ (Regular)
          </p>
        </div>
      </div>

      {/* 특별한 차이점을 보여주는 문자들 */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg">주요 차이점 비교</h3>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="font-pretendard text-2xl">
              Pretendard: 1|lI 0Oo 2Z (글자 구분)
            </p>
            <p className="font-pretendard text-2xl">
              Pretendard: 영문자와 한글이 자연스럽게 어울립니다.
            </p>
          </div>
          <div>
            <p className="font-sans text-2xl">
              System: 1|lI 0Oo 2Z (글자 구분)
            </p>
            <p className="font-sans text-2xl">
              System: 영문자와 한글이 자연스럽게 어울립니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
