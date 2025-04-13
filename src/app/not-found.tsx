import ErrorPage from '@/components/error/ErrorPage';

export default function NotFound() {
  return (
    <ErrorPage
      code="404"
      title="Page not found"
      message="페이지를 불러올 수 없습니다."
    />
  );
}
