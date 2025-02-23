import { ApiError, AUTH_ERROR_CODES, USER_ERROR_CODES } from '@/types/auth';
import { MEDIA_ERROR_CODES } from '@/types/blog';
import { POST_ERROR_CODES } from '@/types/blog';

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

// 게시글 관련 에러 처리
export const getPostErrorMessage = (error: ApiError): string => {
  switch (error.code) {
    case POST_ERROR_CODES.INVALID_THUMBNAIL:
      return '유효하지 않은 썸네일입니다.';

    case POST_ERROR_CODES.UNAUTHORIZED:
      return '로그인이 필요합니다.';

    case POST_ERROR_CODES.INSUFFICIENT_PERMISSION:
      return '게시글 작성 권한이 없습니다.';

    case POST_ERROR_CODES.INVALID_TITLE:
      return '제목은 1글자 이상 100글자 이하여야 합니다.';

    case POST_ERROR_CODES.INVALID_CONTENT:
      return '내용을 입력해주세요.';

    case POST_ERROR_CODES.INVALID_SUMMARY:
      return '요약글은 200자 미만이어야 합니다.';

    case POST_ERROR_CODES.INVALID_STATUS:
      return '잘못된 게시글 상태입니다.';

    default:
      return error.message || '게시글 작성에 실패했습니다.';
  }
};

// 사용자 관련 에러 처리
export const getUserErrorMessage = (error: ApiError): string => {
  switch (error.code) {
    case USER_ERROR_CODES.FETCH_FAILED:
      return '사용자 정보를 가져오는데 실패했습니다.';
    case USER_ERROR_CODES.INVALID_ROLE:
      return '잘못된 역할입니다.';
    default:
      return error.message;
  }
};
