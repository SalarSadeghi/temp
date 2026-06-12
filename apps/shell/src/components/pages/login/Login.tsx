import OTPForm from "./OTPForm";
import PhoneNumberForm from "./PhoneNumberForm";

const Login = () => {
  return <div>{true ? <PhoneNumberForm /> : <OTPForm />}</div>;
};

export default Login;
