import { useEffect } from "react";
import NoImg from "../../../assets/img/user.png";
import { useDispatch, useSelector } from "react-redux";
import { getSingleAccount } from "../../../features/accounts/accountSlice";
import Loading from "../../../utils/Loading";

export default function AccountViewModal({ id }) {
  const { user, isModalAccountLoading } = useSelector((slice) => slice.account);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleAccount({ userId: id }));
  }, []);
  if (isModalAccountLoading) {
    return <Loading />;
  }
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2 ">
      <div className="block item bg-white p-2 rounded-md">
        <div className="bg-white ml-auto mr-auto rounded-full w-40 h-40 ">
          <img
            className="rounded-full object-contain ml-auto mr-auto w-36 h-36 -mt-20"
            src={user.photoUrl || NoImg}
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="p-5 rounded-xl">
          <div className="flex items-center gap-5 ">
            <div className="w-20 text-right">Tên đại diện</div>
            <div className="w-96 p-2 rounded-md border-gray-300 border">
              {user.displayName}
            </div>
          </div>
          <div className="flex items-center gap-5 my-3">
            <div className="w-20 text-right">Tên đầy đủ</div>
            <div className="w-96 p-2 rounded-md border-gray-300 border">
              {user.fullName || <div className="text-gray-500">Unknown</div>}
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="w-20 text-right">Ngày đăng ký CCCD</div>
            <div className="w-96 p-2 rounded-md border-gray-300 border">
              {user.citizenshipDate || (
                <div className="text-gray-500">Unknown</div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-5 my-3">
            <div className="w-20 text-right">Số CCCD</div>
            <div className="w-96 p-2 rounded-md border-gray-300 border">
              {user.citizenshipNumber || (
                <div className="text-gray-500">Unknown</div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="w-20 text-right">Ngày tạo tài khoản </div>
            <div className="w-96 p-2 rounded-md border-gray-300 border">
              {user.createdDate || <div className="text-gray-500">Unknown</div>}
            </div>
          </div>
          <div className="flex items-center gap-5 my-3">
            <div className="w-20 text-right">Ngày sinh </div>
            <div className="w-96 p-2 rounded-md border-gray-300 border">
              {user.dateOfBirth || <div className="text-gray-500">Unknown</div>}
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="w-20 text-right">Email</div>
            <div className="w-96 p-2 rounded-md border-gray-300 border">
              {user.email || <div className="text-gray-500">Unknown</div>}
            </div>
          </div>
          <div className="flex items-center gap-5 my-3">
            <div className="w-20 text-right">Giới tính</div>
            <div className="w-96 p-2 rounded-md border-gray-300 border">
              {user.gender || <div className="text-gray-500">Unknown</div>}
            </div>
          </div>
          {/* <div className="flex items-center gap-5">
            <div className="w-20 text-right">Mã số</div>
            <div className="w-96 p-2 rounded-md border-gray-300 border">
              {user.id || <div className="text-gray-500">Unknown</div>}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
