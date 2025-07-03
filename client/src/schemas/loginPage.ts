import z, { ZodError } from "zod";
import { passwordMessage } from "src/utils/constants";

export const loginSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, passwordMessage),
  })
  .required();

export type LoginSchema = z.infer<typeof loginSchema>;
export type LoginFields = keyof LoginSchema;
export type LoginFieldErrors = {
  [key in LoginFields]?: string;
};
export type LoginTouchedFields = {
  [key in LoginFields]?: boolean;
};

export function getLoginFieldError<
  T extends LoginFields,
  K extends LoginSchema[T]
>(property: T, value: K) {
  const { error } = loginSchema.shape[property].safeParse(value);
  return error
    ? error.issues.map((issue) => issue.message).join(", ")
    : undefined;
}

export const getLoginErrors = (error: ZodError) =>
  error.issues.reduce((all, issue) => {
    const path = issue.path.join("") as keyof LoginSchema;
    const message = all[path] ? all[path] + ", " : "";
    all[path] = message + issue.message;
    return all;
  }, {} as LoginFieldErrors);
