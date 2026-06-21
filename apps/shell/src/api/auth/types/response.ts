export interface VerifyResponseDTO {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponseDTO {
  message: string;
}

export interface RefreshResponseDTO {
  accessToken: string;
}
