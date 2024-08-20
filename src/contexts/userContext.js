import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userid,setUserid]= useState(false);;
  const [first_name,setFirst_name]= useState(false);;
  const [last_name,setLast_name]= useState(false);;
  const [email,setEmail]= useState(false);;
  const [city,setCity]= useState(false);;
  const [volunteer_frequency,setVolunteer_frequency]= useState(false);;
  const [volunteer_categories,setVolunteer_categories]= useState(false);;
  const [most_important,setMost_important]= useState(false);;
  const [allow_notifications,setAllow_notifications]= useState(false);;
  const [friends,setFriends]= useState([]);;
  return (
    <UserContext.Provider value={{
                                    userid,setUserid,
                                    first_name,setFirst_name,
                                    last_name,setLast_name,
                                    email,setEmail,
                                    city,setCity,
                                    volunteer_frequency,setVolunteer_frequency,
                                    volunteer_categories,setVolunteer_categories,
                                    most_important,setMost_important,
                                    allow_notifications,setAllow_notifications,
                                    friends,setFriends}}>
      {children}
    </UserContext.Provider>
  );
};
