import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAccounts,
  updateAccount,
  updateAccountRole,
} from "../../../features/accounts/accountSlice";
import Loading from "../../../utils/Loading";
import User from "../../../assets/img/user.png";
import StatusCard from "../StatusCard";
import {
  BsEyeFill,
  BsFileEarmarkExcelFill,
  BsFileCheckFill,
} from "react-icons/bs";
import ModalWrapper from "../ModalWrapper";
import AccountViewModal from "./AccountViewModal";

export const AccountCardTable = () => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [modalAccount, setModalAccount] = useState(null);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const {
    accounts,
    isAccountLoading,
    page,
    search,
    filter,
    sort,
    isAccountDoneUpdating,
  } = useSelector((store) => store.account);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAccounts());
  }, [page, search, filter, sort, isAccountDoneUpdating]);

  if (isAccountLoading) {
    return <Loading />;
  }

  const changeAccountStatus = (accountId, accountStatus) => {
    if (accountId) {
      if (accountStatus === 0) {
        dispatch(
          updateAccount({
            userId: accountId,
            user: {
              id: accountId,
              status: 1,
            },
          })
        );
      } else {
        dispatch(
          updateAccount({
            userId: accountId,
            user: {
              id: accountId,
              status: 0,
            },
          })
        );
      }
    }
  };
  function changeAccountRole(accountId, accountRole) {
    dispatch(
      updateAccountRole({
        userId: accountId,
        user: {
          id: accountId,
          roles: [accountRole],
        },
      })
    );
  }
  function smallestRoleID(roles) {
    // console.log(roles);
    let smallestRoleID = 10;
    roles.map((role) => {
      if (role < smallestRoleID) {
        smallestRoleID = role;
      }
    });
    return smallestRoleID;
  }
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
        }
      >
        {accounts.length === 0 ? (
          <div className="block w-full overflow-x-auto">
            <h2 className="text-center pb-3">No accounts to display...</h2>
          </div>
        ) : (
          <div className="block w-full overflow-x-auto">
            {/* Projects table */}
            <table className="items-center w-full bg-transparent border-collapse">
              <thead className="bg-white border-b-2">
                <tr>
                  <th className="px-6 align-middle py-3 text-xs uppercase font-semibold text-center w-32">
                    Ảnh đại diện
                  </th>
                  <th className="px-6 align-middle text-xs uppercase font-semibold text-left ">
                    Chức danh
                  </th>
                  <th className="px-6 align-middle text-xs uppercase font-semibold text-left ">
                    Tên hiển thị
                  </th>
                  <th className="px-6 align-middle text-xs uppercase font-semibold text-left ">
                    Email
                  </th>
                  <th className="px-6 align-middle text-xs uppercase font-semibold text-left whitespace-nowrap max-w-full">
                    Trạng thái tài khoản
                  </th>
                  <th className="px-6 align-middle text-xs uppercase font-semibold text-left w-0"></th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account, index) => {
                  if (smallestRoleID(account.roles) !== 1)
                    return (
                      <tr
                        key={account.id}
                        className={
                          "hover:bg-green-50 " +
                          (index % 2 === 1 ? "bg-gray-50" : "bg-white")
                        }
                      >
                        <th className="pl-6 align-middle p-2 text-left flex justify-center">
                          <img
                            src={account.photoUrl || User}
                            className="w-24 bg-white rounded-full border"
                            referrerPolicy="no-referrer"
                          ></img>
                        </th>
                        <td className="pl-6 align-middle">
                          {(() => {
                            if (smallestRoleID(account.roles) === 3) {
                              return (
                                <StatusCard
                                  text="Thợ bánh"
                                  backgroundColor="bg-orange-50"
                                  dotColor="bg-orange-600"
                                />
                              );
                            } else if (smallestRoleID(account.roles) === 2) {
                              return (
                                <StatusCard
                                  text="Chủ cửa hàng"
                                  backgroundColor="bg-blue-50"
                                  dotColor="bg-blue-600"
                                />
                              );
                            } else if (smallestRoleID(account.roles) === 1) {
                              return (
                                <StatusCard
                                  text="Nhân viên"
                                  backgroundColor="bg-yellow-50"
                                  dotColor="bg-yellow-600"
                                />
                              );
                            } else if (smallestRoleID(account.roles) === 0) {
                              return (
                                <StatusCard
                                  text="Quản trị viên"
                                  backgroundColor="bg-red-50"
                                  dotColor="bg-red-600"
                                />
                              );
                            }
                          })()}
                        </td>
                        <td className="pl-6 align-middle p-4">
                          {account.displayName || "Annoymous"}
                        </td>
                        <td className="pl-6 align-middle p-4">
                          <div className="flex">{account.email}</div>
                        </td>
                        <td className="pl-6 align-middle p-4">
                          <div className="flex items-center">
                            <span className="mr-2">
                              {account.status === 0 ? (
                                <StatusCard
                                  text="Hoạt động"
                                  backgroundColor="bg-green-50"
                                  dotColor="bg-green-600"
                                />
                              ) : (
                                <StatusCard
                                  text="Dừng hoạt động"
                                  backgroundColor="bg-gray-50"
                                  dotColor="bg-gray-600"
                                />
                              )}
                            </span>
                          </div>
                        </td>
                        <td className="pl-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                          <div className="flex">
                            <BsEyeFill
                              onClick={() => {
                                setModalAccount(account.id);
                                setOpenModal(true);
                                setIsConfirmModal(false);
                              }}
                              className="p-2 w-10 h-10 text-gray-500 border border-gray-600 hover:bg-gray-600 hover:text-white rounded-md cursor-pointer"
                            />
                            {account.status === 0 && (
                              <BsFileEarmarkExcelFill
                                onClick={() => {
                                  // let storeEditing = {

                                  // }
                                  setModalAccount({
                                    id: account.id,
                                    status: account.status,
                                  });
                                  setOpenModal(true);
                                  setIsConfirmModal(true);
                                  // changeStoreStatus(store.id, store.status);
                                }}
                                className="p-2 ml-2 w-10 h-10 text-red-500 border border-red-600 hover:bg-red-600 hover:text-white rounded-md cursor-pointer"
                              />
                            )}
                            {/* {(() => {
                              if (smallestRoleID(account.roles) === 1) {
                                return (
                                  <div
                                    className="flex items-center justify-center  bg-slate-500 hover:bg-slate-500/80 ml-2 rounded p-2 cursor-pointer text-white w-32"
                                    onClick={() => {
                                      changeAccountRole(account.id, 3);
                                    }}
                                  >
                                    <div className="m-1 font-bold">Hạ chức</div>
                                    <BsPersonXFill className="" />
                                    <BsFillCaretDownFill className="" />
                                  </div>
                                );
                              } else if (smallestRoleID(account.roles) === 3) {
                                return (
                                  <div
                                    className="flex items-center justify-center bg-orange-400 hover:bg-orange-400/80 ml-2 rounded p-2 cursor-pointer text-white w-32"
                                    onClick={() => {
                                      changeAccountRole(account.id, 1);
                                    }}
                                  >
                                    <div className="m-1 font-bold">
                                      Thăng chức
                                    </div>
                                    <BsPersonXFill className="" />
                                    <BsFillCaretUpFill className="" />
                                  </div>
                                );
                              }
                            })()} */}
                          </div>
                        </td>
                      </tr>
                    );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {(() => {
        if (isOpenModal) {
          return (
            <ModalWrapper
              AccountViewModal={AccountViewModal}
              viewObject={modalAccount}
              setOpenModal={setOpenModal}
              isConfirmModal={isConfirmModal}
              changeStoreStatus={changeAccountStatus}
            />
          );
        }
      })()}
    </>
  );
};
