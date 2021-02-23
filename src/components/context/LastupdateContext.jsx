import { createContext, useState } from "react";
import { lastUpdate } from "globalVars/Sources";

export const LastUpdateDate = createContext(null);

const LastUpdateStore = ({ children }) => {
  const [lastDate, setDate] = useState();

  const getUpdateDate = async () => {
    await fetch(lastUpdate)
      .then((res) => res.json())
      .then((date) => date.features[0].attributes.update_date)
      .then((final) => {
        setDate(final);
      });
  };
  getUpdateDate();



  return (
    <LastUpdateDate.Provider value={[lastDate, setDate]}>
      {children}
    </LastUpdateDate.Provider>
  );
};

export default LastUpdateStore;
