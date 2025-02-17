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

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  email: string;
  nickname: string;
  profileImage?: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}

export interface EmailVerificationRequestResponse {
  expiredAt: string;
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

  // 비밀번호가 설정되지 않았을 경우 : 400
  PASSWORD_NOT_SET: 'R0005',

  // 닉네임이 설정되지 않았을 경우 : 400
  NICKNAME_NOT_SET: 'R0006',

  // 인증 메일 요청에 실패했을 경우 : 500
  EMAIL_SEND_FAILED: 'EV0001',

  // 인증 코드 발급이 만료됐거나 인증 코드를 발급한 적이 없는 경우 : 400
  INVALID_EMAIL: 'EV0002',

  // 인증 코드 입력에 5회 이상 실패했을 경우 : 400
  VERIFICATION_ATTEMPT_EXCEEDED: 'EV0003',

  // 이미 24시간 동안 3번의 이메일 인증 요청을 보냈을 경우 : 400
  VERIFICATION_LIMIT_EXCEEDED: 'EV004',

  // 등록되지 않은 사용자의 경우(이메일 인증 코드 확인이 되지 않은 사용자): 404
  UNKNOWN_USER: 'U0001',

  // 사용자의 저장된 refresh token과 일치하지 않을 경우 : 400
  INVALID_TOKEN: 'T0001',

  // Request Param을 넘기지 않았을 경우(필수 매개변수 누락): 400
  MISSING_PARAMETER: 'C003',

  // 인증 코드가 일치하지 않을 경우 : 400
  INVALID_CODE: 'EV0004',
} as const;
