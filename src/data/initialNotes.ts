 const initialNotes  = [
    {
      id: "1",
      text: "تکمیل پروژه",
      date: new Date().toISOString(),
      deadline: new Date(
        new Date().getTime() + 150 * 24 * 60 * 60 * 1000
      ).toISOString(), // یک هفته بعد
    },
    {
      id: "2",
      text: "جلسه تیمی",
      date: new Date().toISOString(),
      deadline: new Date(
        new Date().getTime() + 3 * 24 * 60 * 60 * 1000
      ).toISOString(), // سه روز بعد
    },
    {
      id: "3",
      text: "ارسال گزارش",
      date: new Date().toISOString(),
      deadline: new Date(
        new Date().getTime() + 24 * 60 * 60 * 1000
      ).toISOString(), // فردا
    },
  ];

  export default initialNotes;