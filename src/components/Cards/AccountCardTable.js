import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAccounts,
  getSingleAccount,
  setUpdateAccount,
} from "../../features/accounts/accountSlice";
import Loading from "../../ultils/Loading";
import TableDropdown from "../Dropdowns/TableDropdown";
import User from "../../assets/img/user.png";

export const AccountCardTable = () => {
  const { accounts, isAccountLoading, page, search, filter, sort } =
    useSelector((store) => store.account);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAccounts());
  }, [page, search, filter, sort]);

  if (isAccountLoading) {
    return <Loading />;
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
                    Photo
                  </th>
                  <th className="px-6 align-middle text-xs uppercase font-semibold text-left ">
                    FullName
                  </th>
                  <th className="px-6 align-middle text-xs uppercase font-semibold text-left ">
                    DisplayName
                  </th>
                  <th className="px-6 align-middle text-xs uppercase font-semibold text-left ">
                    Email
                  </th>
                  <th className="px-6 align-middle text-xs uppercase font-semibold text-left ">
                    Status
                  </th>
                  <th className="px-6 align-middle text-xs uppercase font-semibold text-left "></th>
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
                          alt="..."
                        ></img>
                      </th>
                      <td className="pl-6 align-middle p-4">
                        {account.fullName || "Annoymous"}
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
                            {account.status === 0 ? "Active" : "Inactive"}
                          </span>
                          {/* <div className="relative w-full">
                          <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                            <div
                              style={{ width: "60%" }}
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                            ></div>
                          </div>
                        </div> */}
                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                        <TableDropdown
                          link="/admin/account-form"
                          setUpdate={setUpdateAccount({
                            editAccountId: account.id,
                            email: account.email,
                            displayName: account.displayName,
                            photoUrl: account.photoUrl,
                            gender: account.gender,
                            roles: account.roles,
                            status: account.status,
                          })}
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
    </>
  );
};
