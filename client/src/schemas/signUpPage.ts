import z, { ZodError } from "zod";
import { passwordMessage } from "src/utils/constants";

export const signUpSchema = z
  .object({
    fullName: z
      .string()
      .min(5, {
        message: "Must be at least 5 character(s)",
      })
      .refine(
        (value) => {
          const names = value.trim().split(" ");
          return names.length >= 2 && names[1].length >= 2;
        },
        {
          message: "Last name must have at least 2 characters",
        }
      ),
    email: z.string().email(),
  })
  .extend({
    password: z.string().min(8, passwordMessage),
    passwordConfirm: z.string().min(8, passwordMessage),
  });

export const ConfirmSchema = signUpSchema.refine(
  (data) => data.password === data.passwordConfirm,
  {
    message: "Passwords don't match",
    path: ["confirm"],
  }
);

export type SignUpSchema = z.infer<typeof signUpSchema>;
export type SignUpFields = keyof SignUpSchema;
export type SignUpFieldErorrs = {
  [key in SignUpFields]?: string;
};
export type SignUpTouchedFields = {
  [key in SignUpFields]?: boolean;
};

export function getSignUpFieldError<
  T extends SignUpFields,
  K extends SignUpSchema[T]
>(property: T, value: K) {
  const { error } = signUpSchema.shape[property].safeParse(value);
  if (!error) return;
  return error.issues[0]?.message;
}

export const getSignUpErrors = (error: ZodError) => {
  return error.issues.reduce((all, issue) => {
    const path = issue.path.join("") as keyof SignUpSchema;
    const message = all[path] ? all[path] : "";
    if (all[path]) {
      return all;
    }
    all[path] = message + issue.message;
    return all;
  }, {} as SignUpFieldErorrs);
};
