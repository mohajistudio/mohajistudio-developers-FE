export interface EmailVerificationRequest {
  email: string;
}

export interface EmailVerificationResponse {
  accessToken: string;
  refreshToken: string;
}

export interface EmailVerifyRequest {
  email: string;
  code: string;
}

export interface ApiError {
  code: string;
  message: string;
}

export interface SetPasswordRequest {
  password: string;
}

export interface SetNickNameRequest {
  nickname: string;
}

{
  /* 에러 코드 상수 */
}
export const AUTH_ERROR_CODES = {
  // 이미 회원가입을 마친 유저인 경우: 400
  EXISTING_USER: 'R0001',

  // 이미 비밀번호가 설정돼있을 경우: 400
  PASSWORD_ALREADY_SET: 'R0002',

  // 이미 설정된 닉네임일 경우 : 400
  NICKNAME_ALREADY_SET: 'R0003',

  // 인증 메일 요청에 실패했을 경우 : 500
  EMAIL_SEND_FAILED: 'EV0001',

  // 인증 코드 발급이 만료됐거나 인증 코드를 발급한 적이 없는 경우 : 400
  INVALID_EMAIL: 'EV0002',

  // 인증 코드 입력에 5회 이상 실패했을 경우 : 400
  VERIFICATION_ATTEMPT_EXCEEDED: 'EV0003',

  // 이미 24시간 동안 3번의 이메일 인증 요청을 보냈을 경우 : 400
  VERIFICATION_LIMIT_EXCEEDED: 'EV004',

  // 등록되지 않은 사용자의 경우: 404
  UNKNOWN_USER: 'U0001',
} as const;
