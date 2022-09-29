export const AdminLinks = {
  title: "Admin Pages",
  dashboardLink: "/admin/admin-dashboard",
  links: [
    {
      name: "Dashboard",
      style: "fas fa-tv mr-2 text-sm opacity-75",
      linkTo: "/admin/admin-dashboard",
    },
    {
      name: "Stores",
      style: "fa fa-home mr-2 text-sm opacity-75",
      linkTo: "/admin/store-tables",
    },
    {
      name: "Accounts",
      style: "fa fa-user mr-2 text-sm opacity-75",
      linkTo: "/admin/account-tables",
    },
  ],
};

export const StoreLinks = {
  title: "Store Pages",
  dashboardLink: "/store/store-dashboard",
  links: [
    {
      name: "Dashboard",
      style: "fas fa-tv mr-2 text-sm opacity-75",
      linkTo: "/store/store-dashboard",
    },
    {
      name: "Store Detail",
      style: "fa fa-home mr-2 text-sm opacity-75",
      linkTo: "/store/store-detail",
    },
    {
      name: "Products",
      style: "fab fa-product-hunt mr-2 text-sm opacity-75",
      linkTo: "/store/product-tables",
    },
    {
      name: "Orders",
      style: "fa fa-shopping-cart mr-2 text-sm opacity-75",
      linkTo: "/store/orders",
    },
  ],
};

export const StaffLinks = {
  title: "Staff Pages",
  dashboardLink: "/staff/staff-dashboard",
  links: [
    {
      name: "Dashboard",
      style: "fas fa-tv mr-2 text-sm opacity-75",
      linkTo: "/staff/staff-dashboard",
    },
    {
      name: "Reports",
      style: "fa fa-flag mr-2 text-sm opacity-75",
      linkTo: "/staff/report-tables",
    },
  ],
};
