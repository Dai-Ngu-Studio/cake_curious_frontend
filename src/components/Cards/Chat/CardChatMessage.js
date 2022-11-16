import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const CardChatMessage = ({ message }) => {
  const { user } = useSelector((store) => store.user);
  // const { userData, chatId } = useSelector((store) => store.chat);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <li
      // key={message.id}
      ref={ref}
      className={`flex ${
        message.author.id === user.id ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`relative max-w-xl px-4 py-2 text-gray-700 ${
          message.author.id === user.id ? "bg-gray-100" : null
        } rounded shadow`}
      >
        <span className="block">{message.text}</span>
        <img
          className="object-cover w-10 h-10 rounded-full"
          src={
            message.author.id === user.id
              ? user.photoUrl
              : message.author.imageUrl
          }
          alt=""
          referrerPolicy="no-referrer"
        />
      </div>
    </li>
  );
};

export default CardChatMessage;
