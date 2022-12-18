import React from "react";
import { Link } from "react-router-dom";
// components

import LandingNavbar from "../components/Navbars/LandingNavbar";
import Footer from "../components/Footers/Footer";
import landing1 from "../assets/img/landing-1.jpeg";
import landing2 from "../assets/img/landing-2.png";
export default function Landing() {
  return (
    <>
      <LandingNavbar />

      <main>
        <div className="pt-16 pb-32 flex content-center items-center justify-center bg-gradient-to-r from-blue-400 to-emerald-400">
          {/* <div className="absolute top-0 w-full h-full bg-center bg-cover">
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-100 bg-green-500"
            ></span>
          </div> */}
          <div className="relative grid grid-cols-2 p-10 w-4/5 gap-16">
            <div className="flex justify-center items-center">
              <div className="text-white">
                <h1 className="text-6xl font-signika font-bold leading-snug ">
                  Giải pháp kinh doanh nguyên liệu
                </h1>
                <p className="mt-4 text-lg">
                  Tăng khả năng tiếp cận khách hàng và doanh số cho shop nguyên
                  liệu làm bánh hiệu quả hơn trên CakeCurious với CakeCurious -
                  Kênh Người Bán
                </p>
                <div className=" text-xl rounded-full w-fit px-7 py-5 mt-5  bg-white font-bold cursor-pointer hover:shadow-2xl text-blue-500">
                  <Link to="/auth/login">Đăng ký ngay</Link>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <img src={landing2} className=""></img>
            </div>
          </div>
        </div>
        <div className="relative -mt-56">
          <svg
            viewBox="0 0 1428 174"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g
            // stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"
            >
              <g transform="translate(-2.000000, 44.000000)">
                <path
                  className="fill-white opacity-25"
                  d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                ></path>
                <path
                  className="fill-white opacity-25"
                  d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                ></path>
                <path
                  className="fill-white opacity-25"
                  d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                  id="Path-4"
                  // opacity="0.200000003"
                ></path>
              </g>
              <g
                transform="translate(-4.000000, 76.000000)"
                className="fill-slate-100"
              >
                <path d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"></path>
              </g>
            </g>
          </svg>
        </div>
        <section className="pb-20 bg-slate-100">
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <div className="flex flex-wrap w-2/3">
                <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                        <i className="fas fa-award"></i>
                      </div>
                      <h6 className="text-xl font-semibold">Nhanh chóng</h6>
                      <p className="mt-2 mb-4 text-blueGray-500">
                        Tiết kiệm chi phí và thời gian với thủ tục đăng ký nhanh
                        chóng làm bên bán hàng ở CakeCurious
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-4/12 px-4 text-center">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                        <i className="fas fa-retweet"></i>
                      </div>
                      <h6 className="text-xl font-semibold">Tiện lợi</h6>
                      <p className="mt-2 mb-4 text-blueGray-500">
                        Hệ thống quản lý kho hàng chi tiết và hiệu quả
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                        <i className="fas fa-fingerprint"></i>
                      </div>
                      <h6 className="text-xl font-semibold">Hiệu quả</h6>
                      <p className="mt-2 mb-4 text-blueGray-500">
                        Nền tảng tự động quảng bá và tạo điều kiện bán hàng
                        nguyên vật liệu cho người làm bánh thông qua nền tảng
                        mua sắm trực tuyến khi chia sẽ công thức.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* <Footer /> */}
    </>
  );
}
