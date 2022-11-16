import StoreViewModal from "./StoreViewModal";
import ModalConfirm from "./ModalConfirm";
import { BsXLg } from "react-icons/bs";
export default function ModalWrapper({
  setOpenModal,
  store,
  isConfirmModal,
  changeStoreStatus,
}) {
  return (
    <div>
      <div
        className="fixed bg-black/75 w-full h-full top-0 left-0"
        onClick={() => {
          setOpenModal(false);
        }}
      >
        <BsXLg className="text-5xl fixed right-5 top-5 rounded-full hover:bg-white/25 p-3 text-white cursor-pointer" />
      </div>
      {(() => {
        if (isConfirmModal) {
          return (
            <ModalConfirm
              store={store}
              changeStoreStatus={changeStoreStatus}
              setOpenModal={setOpenModal}
            />
          );
        } else {
          return <StoreViewModal store={store} />;
        }
      })()}
    </div>
  );
}
