/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
import QueueRoundedIcon from '@material-ui/icons/QueueRounded';
import GroupIcon from '@material-ui/icons/Group';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import ProductTable from "views/ProductTable/ProductTable.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";
import Product from "views/Product/Product";
import UserTable from "views/UserTable/UserTable";
import User from "views/User/User";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
    visible: true,
  },
  {
    path: "/profile",
    name: "Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
    visible: true,
  },
  {
    path: "/User-table",
    name: "User table",
    rtlName: "قائمة الجدول",
    icon: GroupIcon,
    component: UserTable,
    layout: "/admin",
    visible: true,
  },
  {
    path: "/add-user",
    name: "New user",
    rltName: "New user",
    icon: PersonAddRoundedIcon,
    component: User,
    layout: "/admin",
    visible: true,
  },
  {
    path: "/Product-table",
    name: "Product table",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: ProductTable,
    layout: "/admin",
    visible: true,
  },
  {
    path: "/add-product",
    name: "New product",
    rltName: "New product",
    icon: QueueRoundedIcon,
    component: Product,
    layout: "/admin",
    visible: true,
  },
  {
    path: "/typography",
    name: "Typography",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin",
    visible: false,
  },
  {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin",
    visible: false,
  },
  {
    path: "/maps",
    name: "Maps",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Maps,
    layout: "/admin",
    visible: true,
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin",
    visible: false,
  },
  {
    path: "/rtl-page",
    name: "RTL Support",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Language,
    component: RTLPage,
    layout: "/rtl",
    visible: false,
  },
  {
    path: "/upgrade-to-pro",
    name: "Upgrade To PRO",
    rtlName: "التطور للاحترافية",
    icon: Unarchive,
    component: UpgradeToPro,
    layout: "/admin",
    visible: false,
  },
  {
    path: "/product/:id",
    name: "Edit product",
    rltName: "Edit product",
    icon: "content_paste",
    component: Product,
    layout: "/admin",
    visible: false,
  },
  {
    path: "/user/:id",
    name: "Edit user",
    rltName: "Edit user",
    icon: "content_paste",
    component: User,
    layout: "/admin",
    visible: false,
  },
];

export default dashboardRoutes;
