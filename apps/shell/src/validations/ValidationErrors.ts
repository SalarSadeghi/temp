export const ValidationErrors = {
  LENGTH_NUMBER: ({ length }: { length: number }) =>
    `این فیلد باید دقیقا ${length} رقم باشد`,
  MATCH: (refFieldTitle: string) =>
    `این فیلد باید با ${refFieldTitle} یکسان باشد`,
  MOBILE: "شماره موبایل معتبر نمی‌باشد",
  EMAIL: "فرمت ایمیل نامعتبر است",
  NUMBER: "این فیلد باید از نوع عدد باشد",
  REQUIRED: "این فیلد اجباری است",
  MIN: (value: number) => `حداقل مقدار این فیلد ${value} است.`,
  MAX: (value: number) => `حداکثر مقدار این فیلد ${value} است.`,
};
