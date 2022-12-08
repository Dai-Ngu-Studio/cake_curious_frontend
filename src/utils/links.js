export const AdminLinks = {
  title: "Quản trị viên",
  dashboardLink: "/admin/admin-dashboard",
  links: [
    {
      name: "Thông tin chung",
      style: "fas fa-tv mr-2 text-sm opacity-75",
      linkTo: "/admin/admin-dashboard",
    },
    {
      name: "Danh sách cửa hàng",
      style: "fa fa-home mr-2 text-sm opacity-75",
      linkTo: "/admin/store-tables",
    },
    {
      name: "Quản lý người dùng",
      style: "fa fa-user mr-2 text-sm opacity-75",
      linkTo: "/admin/account-tables",
    },
    {
      name: "Quản lý nhân viên",
      style: "fa-solid fa-building-shield mr-2 text-sm opacity-75",
      linkTo: "/admin/staff-management",
    },
    {
      name: "Báo cáo bình luận",
      style: "fa fa-comment mr-2 text-sm opacity-75",
      linkTo: "/admin/report-tables-comment",
    },
    {
      name: "Kiểm tra công thức",
      style: "fa-solid fa-skull-crossbones mr-2 text-sm opacity-75",
      linkTo: "/admin/report-tables-recipe",
    },
  ],
};

export const StoreLinks = {
  title: "Store Pages",
  dashboardLink: "/store/store-dashboard",
  links: [
    {
      name: "Thông tin chung",
      style: "fas fa-tv mr-2 text-sm opacity-75",
      linkTo: "/store/store-dashboard",
    },
    {
      name: "Thông tin cửa hàng",
      style: "fa fa-home mr-2 text-sm opacity-75",
      linkTo: "/store/store-detail",
    },
    {
      name: "Sản phẩm của bạn",
      style: "fab fa-product-hunt mr-2 text-sm opacity-75",
      linkTo: "/store/product-tables",
    },
    {
      name: "Phiếu giảm giá",
      style: "fa-solid fa-tags mr-2 text-sm opacity-75",
      linkTo: "/store/coupon-tables",
    },
    {
      name: "Danh sách đơn đặt",
      style: "fa fa-shopping-cart mr-2 text-sm opacity-75",
      linkTo: "/store/order-tables",
    },
    {
      name: "Chat",
      style: "fas fa-comment-alt mr-2 text-sm opacity-75",
      linkTo: "/store/chat",
    },
  ],
};

export const StaffLinks = {
  title: "Staff Pages",
  dashboardLink: "/staff/staff-dashboard",
  links: [
    {
      name: "Thông tin chung",
      style: "fas fa-tv mr-2 text-sm opacity-75",
      linkTo: "/staff/staff-dashboard",
    },
    {
      name: "Báo cáo bình luận",
      style: "fa fa-comment mr-2 text-sm opacity-75",
      linkTo: "/staff/report-tables-comment",
    },
    {
      name: "Kiểm tra công thức",
      style: "fa-solid fa-skull-crossbones mr-2 text-sm opacity-75",
      linkTo: "/staff/report-tables-recipe",
    },
  ],
};
