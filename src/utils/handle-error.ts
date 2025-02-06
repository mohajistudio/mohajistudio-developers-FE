import { ApiError, AUTH_ERROR_CODES } from '@/types/auth';
import { MEDIA_ERROR_CODES } from '@/types/blog';

// auth 관련
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

    case AUTH_ERROR_CODES.UNKNOWN_USER:
      return '등록되지 않은 사용자입니다.';

    case AUTH_ERROR_CODES.PASSWORD_ALREADY_SET:
      return '이미 비밀번호가 설정되어 있습니다.';

    case AUTH_ERROR_CODES.UNKNOWN_USER:
      return '등록되지 않은 사용자입니다.';

    case AUTH_ERROR_CODES.NICKNAME_ALREADY_SET:
      return '이미 닉네임이 설정되어 있습니다.';

    case AUTH_ERROR_CODES.PASSWORD_NOT_SET:
      return '비밀번호 설정이 필요합니다.';

    case AUTH_ERROR_CODES.NICKNAME_NOT_SET:
      return '닉네임 설정이 필요합니다.';

    case AUTH_ERROR_CODES.INVALID_TOKEN:
      return '유효하지 않은 토큰입니다.';

    case AUTH_ERROR_CODES.MISSING_PARAMETER:
      return '필수 정보가 누락되었습니다.';

    case AUTH_ERROR_CODES.PASSWORD_NOT_SET:
      return '설정되지 않은 비밀번호입니다.';

    case AUTH_ERROR_CODES.NICKNAME_NOT_SET:
      return '설정되지 않은 닉네임입니다.';

    default:
      return error.message;
  }
};

// 파일 업로드
export const getMediaErrorMessage = (error: ApiError): string => {
  switch (error.code) {
    case MEDIA_ERROR_CODES.FILE_NOT_FOUND:
      return '파일을 찾을 수 없습니다.';

    case MEDIA_ERROR_CODES.STORAGE_UPLOAD_FAILED:
      return '파일 업로드에 실패했습니다. 잠시 후 다시 시도해주세요.';

    case MEDIA_ERROR_CODES.INVALID_FILE_FORMAT:
      return '지원하지 않는 파일 형식입니다. 이미지 또는 동영상 파일만 업로드 가능합니다.';

    case MEDIA_ERROR_CODES.UNKNOWN_USER:
      return '등록되지 않은 사용자입니다.';

    default:
      return error.message;
  }
};
