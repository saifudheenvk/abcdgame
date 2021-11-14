const DashboardItems = (params) => {
  return {
    parent: [
      {
        title: "Dashboard",
        path: "/dashboard/parent",
      },
      {
        title: "Item1",
        path: "/dashboard/parent/item1",
      },
      {
        title: "Item2",
        path: "/dashboard/parent/item2",
      },
      {
        title: "Item3",
        path: "/dashboard/parent/item3",
      },
    ],
    kids: [
      {
        title: "Dashboard",
        path: `/dashboard/kids/${params.id}`,
      },
      {
        title: "Item1",
        path: `/dashboard/kids/${params.id}/item1`,
      },
      {
        title: "Item2",
        path: `/dashboard/kids/${params.id}/item2`,
      },
      {
        title: "Item3",
        path: `/dashboard/kids/${params.id}/item3`,
      },
    ],
    admin: [
      { title: "Games", path: "/dashboard/admin" },
      {
        title: "Learning Path",
        path: "/dashboard/admin/learningpath",
      },
      {
        title: "UsersList&Details",
        path: "/dashboard/admin/userlist",
      },
    ],
  };
};

export default DashboardItems;
