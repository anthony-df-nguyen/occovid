import { createContext, useState } from "react";

export const TimeContext = createContext(null);

const TimeStore = ({ children }) => {
  const [time, setTime] = useState(() => {
    if (!localStorage.getItem("timeSetting")) {
      localStorage.setItem("timeSetting", 30);
      return 30;
    } else {
      return localStorage.getItem("timeSetting");
    }
  });
  return (
    <TimeContext.Provider value={[time, setTime]}>
      {children}
    </TimeContext.Provider>
  );
};

export default TimeStore;
