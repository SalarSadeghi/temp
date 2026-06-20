import { useAuthStore } from "@store/auth/authStore";
import OTPForm from "./OTPForm";
import PhoneNumberForm from "./PhoneNumberForm";

const Login = () => {
  const { isPhoneVerified } = useAuthStore((state) => state);
  return <div>{!isPhoneVerified ? <PhoneNumberForm /> : <OTPForm />}</div>;
};

export default Login;
