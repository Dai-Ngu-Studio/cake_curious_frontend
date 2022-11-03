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
      name: "Trung tâm hỗ trợ",
      style: "fa fa-flag mr-2 text-sm opacity-75",
      linkTo: "/admin/report-tables",
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
      name: "Danh sách đơn đặt",
      style: "fa fa-shopping-cart mr-2 text-sm opacity-75",
      linkTo: "/store/order-tables",
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
      name: "Trung tâm hỗ trợ",
      style: "fa fa-flag mr-2 text-sm opacity-75",
      linkTo: "/staff/report-tables",
    },
  ],
};
