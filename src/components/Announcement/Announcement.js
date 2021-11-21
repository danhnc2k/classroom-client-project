import React, { useEffect, useState } from "react";

import db from "../../lib/firebase";

import { Avatar } from "@mui/material";

import "./style.css";



const Announcement = ({ classData }) => {
  const [announcement, setAnnouncement] = useState([]);

  useEffect(() => {
    if (classData) {
      let unsubscribe = db
        .collection("announcements")
        .doc("classes")
        .collection(classData.id)
        .onSnapshot((snap) => {
          setAnnouncement(snap.docs.map((doc) => doc.data()));
        });
      return () => unsubscribe();
    }
  }, [classData]);
  console.log(announcement);
  return (
    <div>
      {announcement.map((item) => (
        <div className="amt">
          <div className="amt__Cnt">
            <div className="amt__top">
              <Avatar />
              <div>{item.sender}</div>
            </div>
            <p className="amt__txt">{item.text}</p>
            <img className="amt__img" src={item.imageUrl} alt={item.text} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Announcement;