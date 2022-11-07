import React from "react";
import CardChatBody from "../../components/Cards/Chat/CardChatBody";
import CardChatSidebar from "../../components/Cards/Chat/CardChatSidebar";

const Chat = () => {
  return (
    <div className="relative bg-gray-100 md:pt-32 pb-32 pt-12">
      <div className="px-4 md:px-10 mx-auto w-full">
        <div className="container mx-auto">
          <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
            <div className="border-r border-gray-300 lg:col-span-1">
              <CardChatSidebar />
            </div>
            <div className="hidden lg:col-span-2 lg:block">
              <CardChatBody />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
