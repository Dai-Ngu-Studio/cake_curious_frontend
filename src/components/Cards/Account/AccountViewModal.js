import { useEffect } from "react";
import NoImg from "../../../assets/img/user.png";
import { useDispatch, useSelector } from "react-redux";
import { getSingleAccount } from "../../../features/accounts/accountSlice";
import Loading from "../../../utils/Loading";
import { getReason } from "../../../features/reasons/reasonSlice";
export default function AccountViewModal({ id }) {
  const { account, isModalAccountLoading } = useSelector(
    (store) => store.account
  );
  const { reason, isDoneLoadingReason } = useSelector((store) => store.reason);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleAccount({ userId: id }));
  }, []);
  useEffect(() => {
    if (account !== null) {
      dispatch(getReason({ email: account.email }));
    }
  }, [isModalAccountLoading]);
  if (isModalAccountLoading || isDoneLoadingReason == false) {
    return <Loading />;
  }
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2 ">
      <div className="block item bg-white p-2 rounded-md">
        <div className="bg-white ml-auto mr-auto rounded-full w-40 h-40 ">
          <img
            className="rounded-full object-contain ml-auto mr-auto w-36 h-36 -mt-20"
            src={account.photoUrl || NoImg}
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="p-5 rounded-xl">
          <div className="flex items-center gap-5 ">
            <div className="w-20 text-right">Tên đại diện</div>
            <div className="w-96 p-2 rounded-md border-gray-300 border">
              {account.displayName}
            </div>
          </div>
          <div className="flex items-center gap-5 my-3">
            <div className="w-20 text-right">Tên đầy đủ</div>
            <div className="w-96 p-2 rounded-md border-gray-300 border">
              {account.fullName || (
                <div className="text-gray-500">Không có dữ liệu</div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="w-20 text-right">Ngày đăng ký CCCD</div>
            <div className="w-96 p-2 rounded-md border-gray-300 border">
              {account.citizenshipDate || (
                <div className="text-gray-500">Không có dữ liệu</div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-5 my-3">
            <div className="w-20 text-right">Số CCCD</div>
            <div className="w-96 p-2 rounded-md border-gray-300 border">
              {account.citizenshipNumber || (
                <div className="text-gray-500">Không có dữ liệu</div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="w-20 text-right">Ngày tạo tài khoản </div>
            <div className="w-96 p-2 rounded-md border-gray-300 border">
              {(() => {
                if (account.createdDate) {
                  let a = new Date(account.createdDate + "Z");
                  return (
                    a.getDate() +
                    " Tháng " +
                    (a.getMonth() + 1) +
                    ", " +
                    a.getFullYear() +
                    " lúc " +
                    (a.getHours() < 10 ? "0" + a.getHours() : a.getHours()) +
                    ":" +
                    (a.getMinutes() < 10
                      ? "0" + a.getMinutes()
                      : a.getMinutes())
                  );
                } else return "Không có dữ liệu";
              })()}
            </div>
          </div>
          <div className="flex items-center gap-5 my-3">
            <div className="w-20 text-right">Ngày sinh </div>
            <div className="w-96 p-2 rounded-md border-gray-300 border">
              {(() => {
                if (account.dateOfBirth) {
                  let a = new Date(account.dateOfBirth);
                  return (
                    a.getDate() +
                    " Tháng " +
                    (a.getMonth() + 1) +
                    ", " +
                    a.getFullYear() +
                    " lúc " +
                    (a.getHours() < 10 ? "0" + a.getHours() : a.getHours()) +
                    ":" +
                    (a.getMinutes() < 10
                      ? "0" + a.getMinutes()
                      : a.getMinutes())
                  );
                } else return "Không có dữ liệu";
              })()}
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="w-20 text-right">Email</div>
            <div className="w-96 p-2 rounded-md border-gray-300 border">
              {account.email || (
                <div className="text-gray-500">Không có dữ liệu</div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-5 my-3">
            <div className="w-20 text-right">Giới tính</div>
            <div className="w-96 p-2 rounded-md border-gray-300 border">
              {account.gender || (
                <div className="text-gray-500">Không có dữ liệu</div>
              )}
            </div>
          </div>
          {reason?.reason && (
            <div className="flex items-center gap-5">
              <div className="w-20 text-right">
                Nguyên nhân hủy kích hoạt gần đây nhất
              </div>
              <div className="w-96 p-2 rounded-md border-red-600 border">
                {reason.reason || (
                  <div className="text-gray-500">Không có dữ liệu</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
