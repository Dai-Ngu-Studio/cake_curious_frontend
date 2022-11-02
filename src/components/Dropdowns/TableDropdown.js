import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const TableDropdown = ({ link, setUpdate }) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const dispatch = useDispatch();

  const [isDropDownTableExpanded, setToggleTableDropDown] = useState(false);

  return (
    <>
      <div
        className="text-blueGray-500 py-1 px-3 hover:cursor-pointer"
        onClick={() => {
          setToggleTableDropDown(!isDropDownTableExpanded);
        }}
      >
        <i className="fas fa-ellipsis-v"></i>
      </div>
      <div
        className={
          (isDropDownTableExpanded ? "absolute " : "hidden ") +
          "right-14 top-16 z-10 list-none rounded shadow-2xl"
        }
      >
        <Link
          to={link}
          className="bg-white text-base z-50 rounded shadow-lg hover:bg-sky-100"
          onClick={() => dispatch(setUpdate)}
        >
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
