import React, { createContext, useState } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [hasnewfr,setHasNewFR] = useState(false);
  return (
    <NotificationContext.Provider value={{ hasNewMessage, setHasNewMessage ,hasnewfr,setHasNewFR}}>
      {children}
    </NotificationContext.Provider>
  );
};