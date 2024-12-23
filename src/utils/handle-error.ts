import { ApiError, AUTH_ERROR_CODES } from '@/types/auth';

export const getAuthErrorMessage = (error: ApiError): string => {
  switch (error.code) {
    case AUTH_ERROR_CODES.EXISTING_USER:
      return '이미 가입된 이메일입니다.';

    case AUTH_ERROR_CODES.VERIFICATION_LIMIT_EXCEEDED:
      return '인증 메일 발송 횟수를 초과했습니다. (24시간 후 다시 시도해주세요)';

    case AUTH_ERROR_CODES.EMAIL_SEND_FAILED:
      return '인증 메일 발송에 실패했습니다. 잠시 후 다시 시도해주세요.';

    case AUTH_ERROR_CODES.INVALID_EMAIL:
      return '인증 코드가 만료되었거나 유효하지 않습니다.';

    case AUTH_ERROR_CODES.VERIFICATION_ATTEMPT_EXCEEDED:
      return '인증 시도 횟수를 초과했습니다.';

    default:
      return '알 수 없는 에러가 발생했습니다.';
  }
};
