import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../utils/firebase";
import User from "../../../assets/img/user.png";
import {
  handleChatChange,
  setChatting,
} from "../../../features/chats/chatSlice";
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
  const { username } = useSelector((store) => store.chat);
  // const [userName, setUserName] = useState("");
  const [userChattings, setUserChattings] = useState([]);
  const [chats, setChats] = useState([]);
  const dispatch = useDispatch();

  const handleChatInput = async () => {
    try {
      if (userChattings.length > 0) {
        setUserChattings([]);
      }
      if (username === "") {
        setUserChattings([]);
        return;
      }
      const q = query(
        collection(db, "rooms"),
        where("users", "array-contains", user.id)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          doc.data().userInfos.map((userInfo) => {
            if (
              user.store?.id !== userInfo.uid &&
              userInfo.displayName.toLowerCase().includes(username)
            ) {
              setUserChattings((prevState) => [...prevState, userInfo]);
            }
          });
        });
      } else {
        setUserChattings([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleChatInput();
  };

  const handleSelect = async (userChatting) => {
    try {
      const q = query(
        collection(db, "rooms"),
        where("users", "array-contains", userChatting.uid)
      );
      const docSnap = await getDocs(q);
      if (docSnap.empty) {
        await addDoc(collection(db, "rooms"), {
          createdAt: serverTimestamp(),
          userInfos: [
            {
              displayName: user.store?.name,
              photoUrl: user.store?.photoUrl,
              uid: user.store?.id,
            },
            userChatting,
          ],
          updatedAt: serverTimestamp(),
          users: [user.id, userChatting.uid],
        });
      } else {
        docSnap.forEach((doc) => {
          dispatch(
            setChatting({
              chatId: doc.id,
              userData: userChatting,
            })
          );
        });
      }
    } catch (error) {
      console.log(error);
    }
    setUserChattings([]);
    // setUserName("");
  };

  useEffect(() => {
    try {
      const q = query(
        collection(db, "rooms"),
        where("users", "array-contains", user.id),
        orderBy("updatedAt", "desc")
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
            name="username"
            onKeyDown={handleKey}
            onChange={(e) =>
              dispatch(
                handleChatChange({ name: e.target.name, value: e.target.value })
              )
            }
            value={username}
          />
        </div>
      </div>
      <ul className="overflow-auto h-[32rem]">
        {/* {console.log(userChattings)} */}
        {userChattings &&
          userChattings.map((userChatting, index) => {
            return (
              <div
                key={index}
                className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none"
                onClick={() => handleSelect(userChatting)}
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
            );
          })}
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
                          user.store?.id !== chat.userInfos[0].uid
                            ? chat.userInfos[0]
                            : chat.userInfos[1],
                      })
                    )
                  }
                >
                  <img
                    className="object-cover w-10 h-10 rounded-full"
                    src={
                      user.store?.id !== chat.userInfos[0].uid
                        ? chat.userInfos[0].photoUrl
                        : chat.userInfos[1].photoUrl
                    }
                    alt="username"
                    referrerPolicy="no-referrer"
                  />
                  <div className="w-full pb-2">
                    <div className="flex justify-between">
                      <span className="block ml-2 font-semibold text-gray-600">
                        {user.store?.id !== chat.userInfos[0].uid
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
