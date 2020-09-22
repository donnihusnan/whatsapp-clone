import { Avatar, Button } from "@material-ui/core";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import db from "../firebase";

function SidebarChat({ id, name }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");

  useEffect(() => {
    // sort latest message shown in sidebarchat
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
    // id as dependency
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const deleteChat = () => {
    alert("Are you Sure ?");
    // delete rooms
  };

  return (
    <div className="sidebarChat">
      <Link to={`/rooms/${id}`}>
        <div className="sidebarChat__container">
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
          <div className="sidebarChat__info">
            <h2>{name}</h2>
            <p>{messages[0]?.message}</p>
          </div>
        </div>
      </Link>
      <div className="sidebarChat__option">
        <Button onClick={deleteChat}>
          <DeleteOutlineRoundedIcon />
        </Button>
      </div>
    </div>
  );
}

export default SidebarChat;
