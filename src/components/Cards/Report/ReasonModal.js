export default function ReasonModal({ reason }) {
  console.log(reason);
  return (
    <>
      <div className="flex gap-5 ">
        <div className="w-40 text-right pt-2">Lý do</div>
        <textarea className="w-96 p-2 rounded-md border-red-600 border flex items-center">
          {reason.reason || (
            <div className="text-gray-500">Không có dữ liệu</div>
          )}
        </textarea>
      </div>
      <div className="flex items-center gap-5 ">
        <div className="w-40 text-right">Người ra quyết định</div>
        <div className="w-96 p-2 rounded-md border-gray-300 border ">
          <div className="flex items-center justify-center">
            {reason.staff.photoUrl && (
              <img
                src={reason.staff.photoUrl}
                className="mr-2 h-12 w-12 rounded-full border"
                referrerPolicy="no-referrer"
              ></img>
            )}
            <div>{reason.staff.displayName}</div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-5 ">
        <div className="w-40 text-right">Thời điểm ra quyết định</div>
        <div className="w-96 p-2 rounded-md border-gray-300 border ">
          {(() => {
            if (reason.deactivateDate) {
              let a = new Date(reason.deactivateDate + "Z");
              return (
                a.getDate() +
                " Tháng " +
                (a.getMonth() + 1) +
                ", " +
                a.getFullYear() +
                " lúc " +
                (a.getHours() < 10 ? "0" + a.getHours() : a.getHours()) +
                ":" +
                (a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes())
              );
            } else return "Không có dữ liệu";
          })()}
        </div>
      </div>
    </>
  );
}
