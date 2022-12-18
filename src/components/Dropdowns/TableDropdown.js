import { useState } from "react";
import { useDispatch } from "react-redux";
import { FaEdit, FaEllipsisV } from "react-icons/fa";
import { clearGetUserChatState } from "../../features/accounts/accountSlice";

const TableDropdown = ({ link, userChatLink, role }) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const dispatch = useDispatch();

  const [isDropDownTableExpanded, setToggleTableDropDown] = useState(false);

  return (
    <>
      <div
        className=" text-blueGray-500 py-1 px-3 hover:cursor-pointer"
        onMouseOver={() => {
          setToggleTableDropDown(true);
        }}
        onMouseOut={() => {
          setToggleTableDropDown(false);
        }}
      >
        <FaEllipsisV className="w-5 h-5" />
      </div>
      <div
        className={
          (isDropDownTableExpanded ? "absolute " : "hidden ") +
          "bg-white z-10 rounded shadow-2xl right-7"
        }
        onMouseOver={() => {
          setToggleTableDropDown(true);
        }}
        onMouseOut={() => {
          setToggleTableDropDown(false);
        }}
      >
        <a
          href={link}
          className="m-1 p-2 mx-6 flex text-blueGray-700 justify-center items-center gap-2 rounded hover:bg-green-200"
        >
          <FaEdit className="flex justify-center items-center" />
          Cập nhật
        </a>
        {role === 2 && (
          <a
            href={userChatLink}
            onClick={() => dispatch(clearGetUserChatState())}
            className="m-1 p-2  flex text-blueGray-700 justify-center items-center gap-2 rounded hover:bg-green-200"
          >
            <FaEdit className="flex justify-center items-center" />
            Chat
          </a>
        )}

        {/* <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Another action
        </a>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Something else here
        </a> */}
      </div>
    </>
  );
};

export default TableDropdown;
