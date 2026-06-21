export interface VerifyRequestDTO {
  phone: string;
  code: string;
}

export interface UpdatePasswordRequestDTO {
  currentPassword: "string";
  newPassword: "string";
}

export interface ResetPasswordRequestDTO {
  password: "string";
  code: "string";
}
