import { ReportStatus } from "../../../utils/StatusOptions";
import StatusCard from "../StatusCard";

export default function ReportDetails({ report }) {
  return (
    <>
      <div className="flex items-center gap-5 ">
        <div className="w-20 text-right">Tựa đề</div>
        <div className="w-96 p-2 rounded-md border-gray-300 border font-bold">
          {report.title || (
            <div className="text-gray-500">Không có dữ liệu</div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-5 my-3">
        <div className="w-20 text-right">Nội dung</div>
        <div className="w-96 p-2 rounded-md border-gray-300 border">
          {report.content || (
            <div className="text-gray-500">Không có dữ liệu</div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-5">
        <div className="w-20 text-right">Loại báo cáo</div>
        <div className="w-96 p-2 rounded-md border-gray-300 border">
          {report.reportCategory.name || (
            <div className="text-gray-500">Không có dữ liệu</div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-5 my-3">
        <div className="w-20 text-right">Trạng thái</div>
        <div className="w-96 p-2 rounded-md">
          {ReportStatus.map((status) => {
            return (
              <div key={status.id}>
                {report.status === status.id ? (
                  <StatusCard
                    text={status.name}
                    backgroundColor={status.backgroundColor}
                    dotColor={status.dotColor}
                  />
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* <div className="flex items-center gap-5">
        <div className="w-20 text-right">Ngày tạo tài khoản </div>
        <div className="w-96 p-2 rounded-md border-gray-300 border">
          {account.createdDate || (
            <div className="text-gray-500">Không có dữ liệu</div>
          )}
        </div>
      </div> */}
    </>
  );
}
