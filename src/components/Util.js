import moment from "moment-timezone";

export const generateState = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export const nowDate = () => {
  return moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss");
};

//YYYYMMDD
export const changeDateStr = (year, month, date) => {
  return (
    String(year) +
    String(month).padStart(2, "0") +
    String(date).padStart(2, "0")
  );
};
