import React, { createContext, useState } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [hasNewMessage, setHasNewMessage] = useState(false);

  return (
    <NotificationContext.Provider value={{ hasNewMessage, setHasNewMessage }}>
      {children}
    </NotificationContext.Provider>
  );
};