import User from "../../../assets/img/user.png";

import { BsFillExclamationTriangleFill } from "react-icons/bs";
export default function CommentCard({ comment, handleDeleteComment }) {
  console.log(comment);
  return (
    <div className="rounded-lg">
      <div className="flex pt-14 pl-2 justify-center shadow-2xl p-4 rounded-xl">
        <img
          src={comment.user.photoUrl || User}
          className="mr-2 h-14 w-14 rounded-full border"
          referrerPolicy="no-referrer"
        ></img>
        <div>
          <div className="bg-slate-200 p-2 break-words max-w-210-px rounded-xl">
            <div className="font-bold text-sm">{comment.user.displayName}</div>
            <div>{comment.content}</div>
          </div>
          {comment.images[0]?.mediaUrl && (
            <div>
              <img
                src={comment.images[0].mediaUrl}
                className="rounded-xl w-full pt-1"
                referrerPolicy="no-referrer"
              ></img>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center pt-10">
        <button
          type="button"
          className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 text-center text-lg"
          onClick={() => {
            handleDeleteComment();
          }}
        >
          <div className="flex items-center justify-center">
            Xóa bỏ bình luận
            <BsFillExclamationTriangleFill className="ml-2" />
          </div>
        </button>
      </div>
    </div>
  );
}
