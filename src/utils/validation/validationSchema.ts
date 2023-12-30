import { z } from 'zod';
import { LocaleData } from '@/context/locales';

const validationSchema = (localeData: LocaleData) => {
  const { validation } = localeData;

  return z.object({
    email: z
      .string({ required_error: validation.email.required })
      .min(1, validation.email.required)
      .email(validation.email.message),
    password: z
      .string({ required_error: validation.password.required })
      .min(1, validation.password.required)
      .min(8, validation.password.messages.eight_symbols)
      .refine((value) => /^(?=.*\p{L})/gu.test(value), {
        message: validation.password.messages.one_letter,
      })
      .refine((value) => /^(?=.*[0-9])/.test(value), {
        message: validation.password.messages.one_digit,
      })
      .refine((value) => /^(?=.*[!@#\$%\^&\*])/.test(value), {
        message: validation.password.messages.one_special,
      }),
  });
};

export default validationSchema;
