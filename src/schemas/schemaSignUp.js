import * as yup from "yup";

{
  /*To check a password between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character */
}
const passwordRules =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

export const basicSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid Email").required("Required"),
  password: yup
    .string()
    .min(7)
    .matches(passwordRules, {
      message:
        "Please create a Stronger Password between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
    })
    .required("Required"),
  confirmedPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .required("Required"),
});
