import { uuidv4 } from "@firebase/util";
import User from "../../../assets/img/user.png";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../utils/firebase";
import CardChatMessage from "./CardChatMessage";
import { pushChatNotification } from "../../../features/notification/notificationSlice";

const CardChatBody = () => {
  const { user } = useSelector((store) => store.user);
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const { userData, chatId } = useSelector((store) => store.chat);
  const [text, setText] = useState("");

  const handleSend = async () => {
    if (text) {
      await addDoc(collection(db, `rooms/${chatId}/messages`), {
        author: {
          firstName: user.store === null ? user.displayName : user.store.name,
          id: user.store === null ? user.id : user.store.id,
          imageUrl: user.store === null ? user.photoUrl : user.store.photoUrl,
        },
        roomId: chatId,
        createdAt: serverTimestamp(),
        text,
        type: "text",
      });
      await updateDoc(doc(db, "rooms", chatId), {
        lastMessage: text,
        lastMessageTime: serverTimestamp(),
        lastMessageName: user?.store?.name,
        updatedAt: serverTimestamp(),
      });
      dispatch(
        pushChatNotification({
          chat: {
            receiverId: userData.uid,
            itemType: 5,
            title: user?.store?.name,
            content: text,
          },
        })
      );
      setText("");
    }
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  };
  useEffect(() => {
    try {
      if (chatId) {
        const q = query(
          collection(db, `rooms/${chatId}/messages`),
          where("roomId", "==", chatId),
          orderBy("createdAt")
        );
        onSnapshot(q, (snapshot) => {
          const documents = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setMessages(documents);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [chatId]);

  return (
    <div className="w-full">
      <div className="relative flex items-center p-3 border-b border-gray-300">
        <img
          className="object-cover w-10 h-10 rounded-full"
          src={userData.photoUrl || User}
          alt=""
          referrer="no-referrer"
        />
        <span className="block ml-2 font-bold text-gray-600">
          {userData.displayName}
        </span>
      </div>
      <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
        <ul className="space-y-2">
          {messages.map((message) => {
            return <CardChatMessage message={message} key={message.id} />;
          })}
        </ul>
      </div>

      <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            />
          </svg>
        </button>
        <input
          type="text"
          placeholder="Message"
          onChange={(e) => setText(e.target.value)}
          className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
          name="message"
          value={text}
          required
          onKeyDown={handleKey}
        />
        <button onClick={handleSend} type="button">
          <svg
            className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CardChatBody;
