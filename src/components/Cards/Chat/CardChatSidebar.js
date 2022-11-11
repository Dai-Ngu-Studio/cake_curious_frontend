import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../utils/firebase";
import User from "../../../assets/img/user.png";
import { setChatting } from "../../../features/chats/chatSlice";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

const CardChatSidebar = () => {
  const { user } = useSelector((store) => store.user);
  const [userName, setUserName] = useState("");
  const [userChatting, setUserChatting] = useState(null);
  const [chats, setChats] = useState([]);
  const dispatch = useDispatch();

  const handleChatInput = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("displayName", ">=", userName),
        where("displayName", "<=", userName + "\uf8ff")
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          setUserChatting(doc.data());
        });
      } else {
        setUserChatting(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleChatInput();
  };

  const handleSelect = async () => {
    let combinedId =
      user.id > userChatting.uid
        ? user.id + userChatting.uid
        : userChatting.uid + user.id;

    try {
      // update doc for current user and the person chatting with
      await updateDoc(doc(db, "rooms", user.id), {
        [combinedId + ".userInfo"]: {
          uid: userChatting.uid,
          displayName: userChatting.displayName,
          photoUrl: userChatting.photoUrl,
        },
        [combinedId + ".messages"]: [],
        [combinedId + ".date"]: serverTimestamp(),
      });

      // update doc for user that being chat with
      await updateDoc(doc(db, "rooms", userChatting.uid), {
        [combinedId + ".userInfo"]: {
          uid: user.id,
          displayName: user.displayName,
          photoUrl: user.photoUrl,
        },
        [combinedId + ".messages"]: [],
        [combinedId + ".date"]: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
    setUserChatting(null);
    setUserName("");
  };

  useEffect(() => {
    onSnapshot(doc(db, "rooms", user.id), (doc) => {
      setChats(doc.data());
    });
  }, [user.id]);

  return (
    <>
      <div className="mx-3 my-3">
        <div className="relative text-gray-600">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-6 h-6 text-gray-300"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </span>
          <input
            type="text"
            className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none"
            placeholder="Search"
            onKeyDown={handleKey}
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
        </div>
      </div>
      <ul className="overflow-auto h-[32rem]">
        {userChatting && (
          <div
            className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none"
            onClick={handleSelect}
          >
            <img
              className="object-cover w-10 h-10 rounded-full"
              src={userChatting.photoUrl || User}
              alt="username"
            />
            <div className="w-full">
              <span className="block ml-2 font-semibold text-gray-600">
                {userChatting.displayName}
              </span>
            </div>
          </div>
        )}
        <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
        <li>
          {chats &&
            Object.entries(chats)
              ?.sort((a, b) => b[1].date - a[1].date)
              .map((chat) => {
                return (
                  <a
                    className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none"
                    key={chat[0]}
                    onClick={() =>
                      dispatch(
                        setChatting({
                          chatId:
                            user.id > chat[1].userInfo.uid
                              ? user.id + chat[1].userInfo.uid
                              : chat[1].userInfo.uid + user.id,
                          userData: chat[1].userInfo,
                        })
                      )
                    }
                  >
                    <img
                      className="object-cover w-10 h-10 rounded-full"
                      src={chat[1].userInfo.photoUrl}
                      alt="username"
                      referrerPolicy="no-referrer"
                    />
                    <div className="w-full pb-2">
                      <div className="flex justify-between">
                        <span className="block ml-2 font-semibold text-gray-600">
                          {chat[1].userInfo.displayName}
                        </span>
                        {/* <span className="block ml-2 text-sm text-gray-600">
                              25 minutes
                            </span> */}
                      </div>
                      <span className="block ml-2 text-sm text-gray-600">
                        {chat[1].lastMessage?.text}
                      </span>
                    </div>
                  </a>
                );
              })}
        </li>
      </ul>
    </>
  );
};

export default CardChatSidebar;
