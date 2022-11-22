import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormRow from "../../components/Inputs/FormRow";
import FormRowSelect from "../../components/Inputs/FormRowSelect";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Loading from "../../utils/Loading";
import { useParams } from "react-router-dom";
import {
  addCoupon,
  getSingleCoupon,
  handleCouponChange,
  updateCoupon,
} from "../../features/coupons/couponSlice";
import { CouponStatus, DiscountTypeOptions } from "../../utils/StatusOptions";

export const CouponForm = () => {
  const {
    isCouponLoading,
    name,
    code,
    discount,
    discountType,
    expiryDate,
    maxUses,
    storeId,
    status,
  } = useSelector((store) => store.coupon);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const { editCouponId } = useParams();
  const [isCouponEditing, setIsCouponEditing] = useState(false);

  useEffect(() => {
    if (editCouponId) {
      dispatch(getSingleCoupon({ couponId: editCouponId }));
      setIsCouponEditing(true);
    }
  }, []);

  if (isCouponLoading) {
    return <Loading />;
  }

  const handleCouponInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleCouponChange({ name, value }));
  };

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    if (!name || !code || !discount || !maxUses || !expiryDate) {
      toast.error("Please fill out all fields");
      return;
    }
    if (parseInt(maxUses) < 0) {
      toast.error("Max uses aren't allowed to go below 0");
    }
    if (parseInt(discount) < 0) {
      toast.error("Discount aren't allowed to go below 0");
    }
    if (parseInt(discountType) === 0) {
      if (parseInt(discount) > 100) {
        toast.error("Percentage discount aren't allowed to go above 100");
      }
    }

    if (isCouponEditing) {
      dispatch(
        updateCoupon({
          couponId: editCouponId,
          coupon: {
            id: editCouponId,
            name,
            storeId: user?.store.id,
            expiryDate,
            discountType: parseInt(discountType),
            code,
            maxUses: parseInt(maxUses),
            discount: parseFloat(discount),
            status: parseInt(status),
          },
        })
      );
      return;
    }
    dispatch(
      addCoupon({
        name,
        expiryDate,
        discountType: parseInt(discountType),
        code,
        storeId: user?.store.id,
        maxUses: parseInt(maxUses),
        discount: parseFloat(discount),
        status: parseInt(status),
      })
    );
  };

  return (
    <div className="relative bg-gray-100 md:pt-32 pb-32 pt-12">
      <div className="px-4 md:px-10 mx-auto w-full">
        <div>
          <form>
            <FormRow
              type="text"
              name="name"
              labelText="Coupon Name"
              value={name}
              handleChange={handleCouponInput}
            />
            <FormRow
              type="text"
              name="code"
              labelText="Discount Code"
              value={code}
              handleChange={handleCouponInput}
            />
            <FormRow
              type="number"
              name="discount"
              labelText="Discount"
              value={discount}
              handleChange={handleCouponInput}
            />
            <FormRowSelect
              name="discountType"
              labelText="Type"
              value={discountType}
              list={DiscountTypeOptions}
              handleChange={handleCouponInput}
            />
            <FormRow
              type="date"
              name="expiryDate"
              labelText="Expiry Date"
              value={expiryDate}
              handleChange={handleCouponInput}
            />
            <FormRow
              type="number"
              name="maxUses"
              labelText="Max Uses"
              value={maxUses}
              handleChange={handleCouponInput}
            />
            <FormRowSelect
              name="status"
              labelText="Status"
              value={status}
              list={CouponStatus}
              handleChange={handleCouponInput}
            />
            <button
              type="submit"
              disabled={isCouponLoading}
              onClick={handleCouponSubmit}
              className={
                isCouponLoading
                  ? "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
                  : "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              }
            >
              {isCouponLoading ? (
                <>
                  <svg
                    role="status"
                    className="inline w-4 h-4 mr-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Loading...
                </>
              ) : (
                "Save"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
