'use client';

import ErrorPage from '@/components/error/ErrorPage';

export default function Error() {
  return (
    <ErrorPage
      code="500"
      title="Server error"
      message="서버에 오류가 발생하였습니다."
    />
  );
}
