import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../utils/firebase";
import User from "../../../assets/img/user.png";
import { setChatting } from "../../../features/chats/chatSlice";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
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
    try {
      const docSnap = await getDoc(doc(db, "users", user.id));
      if (docSnap.exists()) {
        await addDoc(collection(db, "rooms"), {
          createdAt: serverTimestamp(),
          userInfos: [docSnap.data(), userChatting],
          lastMessageTime: serverTimestamp(),
          users: [user.id, userChatting.uid],
        });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error);
    }
    setUserChatting(null);
    setUserName("");
  };

  useEffect(() => {
    try {
      const q = query(
        collection(db, "rooms"),
        where("users", "array-contains", user.id),
        orderBy("lastMessageTime", "desc")
      );
      onSnapshot(q, (snapshot) => {
        const documents = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setChats(documents);
      });
    } catch (error) {
      console.log(error);
    }
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
          {/* .sort((a, b) => b[1].date - a[1].date) */}
          {chats &&
            chats.map((chat) => {
              return (
                <a
                  className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none"
                  key={chat.id}
                  onClick={() =>
                    dispatch(
                      setChatting({
                        chatId: chat.id,
                        userData:
                          user.id !== chat.userInfos[0].uid
                            ? chat.userInfos[0]
                            : chat.userInfos[1],
                      })
                    )
                  }
                >
                  <img
                    className="object-cover w-10 h-10 rounded-full"
                    src={
                      user.id !== chat.userInfos[0].uid
                        ? chat.userInfos[0].photoUrl
                        : chat.userInfos[1].photoUrl
                    }
                    alt="username"
                    referrerPolicy="no-referrer"
                  />
                  <div className="w-full pb-2">
                    <div className="flex justify-between">
                      <span className="block ml-2 font-semibold text-gray-600">
                        {user.id !== chat.userInfos[0].uid
                          ? chat.userInfos[0].displayName
                          : chat.userInfos[1].displayName}
                      </span>
                      {/* <span className="block ml-2 text-sm text-gray-600">
                        25 minutes
                      </span> */}
                    </div>
                    {chat.lastMessage && (
                      <span className="block ml-2 text-sm text-gray-600">
                        {chat.lastMessage}
                      </span>
                    )}
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
