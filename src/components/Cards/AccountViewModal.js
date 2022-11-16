import Shop from "../../assets/img/no-store.png";

export default function AccountViewModal({ account }) {
  console.log(account);
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2 ">
      <div className="flex">
        {/* {account.email} */}
        {/* <img
          className="relative min-w-48 max-w-md scale-110 bg-white rounded-xl object-contain border"
          src={store.photoUrl || Shop}
        />
        <div className="pl-7 p-5 bg-gray-100 rounded-xl">
          <div className="flex items-center gap-5 ">
            <div className="w-28 text-right">Tên cửa hàng </div>
            <div className="w-96 p-2 rounded-md border-gray-300 border">
              {store.name}
            </div>
          </div>
          <div className="flex items-center gap-5 my-3">
            <div className="w-28 text-right">Tên chủ nhân </div>
            <div className="w-96 p-2 rounded-md border-gray-300 border">
              {store.user?.displayName || "Anonymous User"}
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="w-28 text-right">Mô tả</div>
            <div className="max-h-24 w-96 rounded-md overflow-scroll border-gray-300 border p-2">
              {store.description}
            </div>
          </div>
          <div className="flex items-center gap-5 my-3">
            <div className="w-28 text-right">Địa chỉ </div>
            <div className="w-96 p-2 rounded-md border-gray-300 border">
              {store.address}
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="w-28 text-right">Đánh giá </div>
            <div className="w-96 p-2 rounded-md border-gray-300 border">
              {store.rating}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
