export const Shared_Text = {
  common: {
    date: "تاریخ",
    time: "زمان",
    character: "کاراکتر",
    saveAndSend: "ذخیره و ارسال",
    save: "ذخیره",
    send: "ارسال",
    uploadFile: {
      uploadFile: "بارگذاری فایل",
      selectFile: "انتخاب فایل",
      addAttachment: "افزودن پیوست",
      attachFileHintTitle:
        "فایل پیوست را انتخاب کرده یا بکشید و سپس در کادر رها کنید.",
      attachFileHintType: "نوع فایل مجاز",
      attchFileHintSize: "حجم فایل مجاز",
    },
  },
  validation: {
    required: "این فیلد اجباری است",
    MIN: (value: number) => `حداقل مقدار این فیلد ${value} است.`,
    MAX: (value: number) => `حداکثر مقدار این فیلد ${value} است.`,
  },
};
