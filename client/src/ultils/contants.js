import path from "./path";
import icons from "./icons";

export const navigation = [
  {
    id: 1,
    value: "Trang chủ",
    path: `/${path.HOME}`,
  },
  {
    id: 2,
    value: "Sản phẩm",
    path: `/${path.PRODUCTS}`,
  },
  // {
  //   id: 3,
  //   value: "Bài viết",
  //   path: `/${path.BLOGS}`,
  // },
  {
    id: 4,
    value: "Giới thiệu",
    path: `/${path.INTRODUCE}`,
  },
  {
    id: 5,
    value: "Liên hệ",
    path: `/${path.CONTACT}`,
  },
];
const { RiTruckFill, BsShieldShaded, BsReplyFill, FaTty, AiFillGift } = icons;
export const productExtraInfomation = [
  {
    id: "1",
    title: "Guarantee",
    sub: "Quality Checked",
    icon: <BsShieldShaded />,
  },
  {
    id: "2",
    title: "Free Shipping",
    sub: "Free On All Products",
    icon: <RiTruckFill />,
  },
  {
    id: "3",
    title: "Special Gift Cards",
    sub: "Special Gift Cards",
    icon: <AiFillGift />,
  },
  {
    id: "4",
    title: "Free Return",
    sub: "Within 7 Days",
    icon: <BsReplyFill />,
  },
  {
    id: "5",
    title: "Consultancy",
    sub: "Lifetime 24/7/356",
    icon: <FaTty />,
  },
];

export const productInfoTabs = [
  {
    id: 1,
    name: "DISCRIPTION",
    content: `Bánh mì UIT`,
  },
  // {
  //   id: 2,
  //   name: "WARRANTY",
  //   content: `WARRANTY INFORMATION
  //       LIMITED WARRANTIES
  //       Limited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products:

  //       Frames Used In Upholstered and Leather Products
  //       Limited Lifetime Warranty
  //       A Limited Lifetime Warranty applies to all frames used in sofas, couches, love seats, upholstered chairs, ottomans, sectionals, and sleepers. Ashley Furniture Industries,Inc. warrants these components to you, the original retail purchaser, to be free from material manufacturing defects.`,
  // },
  {
    id: 3,
    name: "DELIVERY",
    content: `Giao hàng trong khuân viên trường UIT`,
  },
  {
    id: 4,
    name: "PAYMENT",
    content: `Thanh toán tại quầy hoặc quét mã QR`,
  },
];

export const colors = [
  "black",
  "brown",
  "gray",
  "white",
  "pink",
  "yellow",
  "orange",
  "purple",
  "green",
  "blue",
];

export const sorts = [
  // {
  //   id: 1,
  //   value: "-sold",
  //   text: "Best selling",
  // },
  // {
  //   id: 2,
  //   value: "-title",
  //   text: "Alphabetically, A-Z",
  // },
  // {
  //   id: 3,
  //   value: "title",
  //   text: "Alphabetically, Z-A",
  // },
  // {
  //   id: 4,
  //   value: "-price",
  //   text: "Price, high to low",
  // },
  // {
  //   id: 5,
  //   value: "price",
  //   text: "Price, low to high",
  // },
  // {
  //   id: 6,
  //   value: "-createdAt",
  //   text: "Date, new to old",
  // },
  // {
  //   id: 7,
  //   value: "createdAt",
  //   text: "Date, old to new",
  // },
  {
    id: 1,
    value: "-sold",
    text: "Bán chạy",
  },
  {
    id: 2,
    value: "-title",
    text: "A-Z",
  },
  {
    id: 3,
    value: "title",
    text: "Z-A",
  },
  {
    id: 4,
    value: "-price",
    text: "Cao - Thấp",
  },
  {
    id: 5,
    value: "price",
    text: "Thấp - Cao",
  },
  {
    id: 6,
    value: "-createdAt",
    text: "Mới - Cũ",
  },
  {
    id: 7,
    value: "createdAt",
    text: "Cũ - Mới",
  },
];

export const voteOptions = [
  {
    id: 1,
    text: "Terrible",
  },
  {
    id: 2,
    text: "Bad",
  },
  {
    id: 3,
    text: "Neutral",
  },

  {
    id: 4,
    text: "Good",
  },

  {
    id: 5,
    text: "Perfect",
  },
];
const { AiOutlineDashboard, MdGroups, TbBrandProducthunt, RiBillLine } = icons;
export const adminSidebar = [
  // {
  //   id: 1,
  //   type: "SINGLE",
  //   text: "Bảng điều khiển",
  //   path: `/${path.ADMIN}/${path.DASHBOARD}`,
  //   icon: <AiOutlineDashboard size={20} />,
  // },
  {
    id: 2,
    type: "SINGLE",
    text: "Quản lí người dùng",
    path: `/${path.ADMIN}/${path.MANAGE_USER}`,
    icon: <MdGroups size={20} />,
  },
  {
    id: 3,
    type: "PARENT",
    text: "Sản phẩm",
    icon: <TbBrandProducthunt size={20} />,
    submenu: [
      {
        text: "Tạo sản phẩm",
        path: `/${path.ADMIN}/${path.CREATE_PRODUCTS}`,
      },
      {
        text: "Quản lí sản phẩm",
        path: `/${path.ADMIN}/${path.MANAGE_PRODUCTS}`,
      },
    ],
  },
  {
    id: 4,
    type: "SINGLE",
    text: "Quản lí đơn hàng",
    path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
    icon: <RiBillLine size={20} />,
  },
];
export const memberSidebar = [
  {
    id: 1,
    type: "SINGLE",
    text: "Thông tin cá nhân",
    path: `/${path.MEMBER}/${path.PERSONAL}`,
    icon: <AiOutlineDashboard size={20} />,
  },
  {
    id: 2,
    type: "SINGLE",
    text: "Giỏ hàng",
    path: `/${path.MEMBER}/${path.MY_CART}`,
    icon: <MdGroups size={20} />,
  },
  {
    id: 4,
    type: "SINGLE",
    text: "Lịch sử mua hàng",
    path: `/${path.MEMBER}/${path.HISTORY}`,
    icon: <RiBillLine size={20} />,
  },
  {
    id: 4,
    type: "SINGLE",
    text: "Yêu thích",
    path: `/${path.MEMBER}/${path.WISHLIST}`,
    icon: <RiBillLine size={20} />,
  },
];

export const roles = [
  {
    code: 1945,
    value: "Admin",
  },
  {
    code: 1979,
    value: "User",
  },
];
export const blockStatus = [
  {
    code: true,
    value: "Blocked",
  },
  {
    code: false,
    value: "Active",
  },
];
export const statusOrders = [
  {
    label: "Cancalled",
    value: "Cancalled",
  },
  {
    label: "Succeed",
    value: "Succeed",
  },
];
