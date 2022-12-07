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
        message.author.id === (user.store === null ? user.id : user.store.id)
          ? "justify-end"
          : "justify-start"
      }`}
    >
      {message.author.id === (user.store === null ? user.id : user.store.id) ? (
        <>
          <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded-xl shadow bg-green-200">
            <span className="block">{message.text}</span>
          </div>
        </>
      ) : (
        <>
          <img
            className="object-cover w-10 h-10 rounded-full"
            src={message.author.imageUrl}
            alt=""
            referrerPolicy="no-referrer"
          />
          <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded-xl shadow bg-gray-300 ml-2">
            <span className="block">{message.text}</span>
          </div>
        </>
      )}
    </li>
  );
};

export default CardChatMessage;
