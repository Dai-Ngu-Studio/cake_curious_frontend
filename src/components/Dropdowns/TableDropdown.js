import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaEdit, FaEllipsisV } from "react-icons/fa";

const TableDropdown = ({ link, setUpdate }) => {
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
        <FaEllipsisV className="" />
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
        <Link
          to={link}
          className="m-1 p-2  flex text-blueGray-700 justify-center items-center gap-2 rounded hover:bg-sky-100"
          onClick={() => dispatch(setUpdate)}
        >
          <FaEdit className="flex justify-center items-center" />
          Update
        </Link>
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
