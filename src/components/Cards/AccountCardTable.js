import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAccounts,
  getSingleAccount,
  setUpdateAccount,
  updateAccount,
} from "../../features/accounts/accountSlice";
import Loading from "../../utils/Loading";
import User from "../../assets/img/user.png";
import StatusCard from "./StatusCard";
import { BsEyeFill } from "react-icons/bs";
import ModalWrapper from "./ModalWrapper";
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
                  <th className="px-6 align-middle text-xs uppercase font-semibold text-left ">
                    Trạng thái tài khoản
                  </th>
                  {/* <th className="px-6 align-middle text-xs uppercase font-semibold text-left "></th> */}
                </tr>
              </thead>
              <tbody>
                {accounts.map((account, index) => {
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
                      <td className="pl-6 align-middle p-4">
                        {(() => {
                          let smallestRoleID = 10;
                          account.roles.map((role) => {
                            if (role < smallestRoleID) {
                              smallestRoleID = role;
                            }
                          });

                          if (smallestRoleID === 3) {
                            return (
                              <StatusCard
                                text="Thợ bánh"
                                backgroundColor="bg-orange-200"
                                dotColor="bg-orange-600"
                              />
                            );
                          } else if (smallestRoleID === 2) {
                            return (
                              <StatusCard
                                text="Chủ cửa hàng"
                                backgroundColor="bg-blue-200"
                                dotColor="bg-blue-600"
                              />
                            );
                          } else if (smallestRoleID === 1) {
                            return (
                              <StatusCard
                                text="Nhân viên"
                                backgroundColor="bg-yellow-200"
                                dotColor="bg-yellow-600"
                              />
                            );
                          } else if (smallestRoleID === 0) {
                            return (
                              <StatusCard
                                text="Quản trị viên"
                                backgroundColor="bg-red-200"
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
                          <span
                            className="mr-2"
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
                          >
                            {account.status === 0 ? (
                              <StatusCard
                                text="Hoạt động"
                                backgroundColor="bg-green-200"
                                dotColor="bg-green-600"
                              />
                            ) : (
                              <StatusCard
                                text="Dừng hoạt động"
                                backgroundColor="bg-gray-200"
                                dotColor="bg-gray-600"
                              />
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="pl-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                        <BsEyeFill
                          onClick={() => {
                            setModalAccount(account.id);
                            setOpenModal(true);
                            setIsConfirmModal(false);
                          }}
                          className="p-2 w-10 h-10 bg-green-200 text-black/50 hover:bg-emerald-600 hover:text-white rounded-md cursor-pointer"
                        />
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
