import Home from "../screens/Homepage/Homepage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { appColors } from '../utils/appColors.js';
// import { scale } from 'react-native-size-matters';
import ShopPage from "../screens/ShopPage/ShopPage.js";
import PlantDetail from "../screens/PlantDetail/PlantDetail.js";
import TrackingOrder from "../screens/TrackingOrder/TrackingOrder.js";
import PlantGuide from "../screens/PlantGuide/PlantGuide.js";
import CartView from "../screens/CartView/CartView.js";
import Checkout from "../screens/Checkout/Checkout.js";
import Payment from "../screens/Payment/Payment.js";
import OrderComplete from "../screens/OrderComplete/OrderComplete.js";
import LoginPage from "../screens/login/login.js";
import ScanCamera from "../screens/ScanCamera/ScanCamera.js";
import OrderList from "../screens/OrderList/OrderList.js";
import Welcome from "../screens/welcome/welcome.js";
import Signup from "../screens/signup/signup.js";
import Verification from "../screens/OTPverfication/Verification.js";
import Registerverify from "../screens/Registerverify/Registerverify.js";
import PackagePlan from "../screens/PackagePlan/PackagePlan.js";
import signin from "../screens/signin/signin";
import PlantReport from "../screens/PlantReport/PlantReport.js";
import Galery from "../screens/Galery/Galery.js";
import Personal from "../screens/Personal/Personal.jsx";
import Timer from "../screens/Timer/Timer.jsx";
import EditProfile from "../screens/EditProfile/EditProfile.jsx";
import PlanterDetail from "../screens/PlanterDetail/PlantDetail.js";
// import Category from '../screens/Category';

export const RoutesList = [
  {
    name: "homepage",
    component: Home,
    options: {
      tabBarIcon: ({ color, focused }) => (
        <Icon name="home-outline" size={32} color={color} />
      ),
      headerShown: false,
    },
  },
  {
    name: "Galery",
    component: Galery,
    options: {
      tabBarIcon: ({ color, focused }) => (
        <Icon name="view-grid-outline" size={32} color={color} />
      ),
      headerShown: false,
      iconStyles: { transform: [{ translateX: -25 }] },
    },
  },
  {
    name: "Timer",
    component: Timer,
    options: {
      tabBarIcon: ({ color, focused }) => (
        <Icon name="alarm" size={32} color={color} />
      ),
      headerShown: false,
      iconStyles: { transform: [{ translateX: 25 }] },
      activeColor: "#37B551",
    },
  },
  {
    name: "Personal",
    component: Personal,
    options: {
      tabBarIcon: ({ color, focused }) => (
        <Icon name="account-outline" size={32} color={color} />
      ),
      headerShown: false,
      activeColor: "#43BD44",
    },
  },
  {
    name: "ShopPage",
    component: ShopPage,
    options: {
      tabBarButton: () => null,
    },
  },
  {
    name: "TrackingOrder",
    component: TrackingOrder,
    options: {
      tabBarButton: () => null,
    },
  },
  {
    name: "PlantGuide",
    component: PlantGuide,
    options: {
      tabBarButton: () => null,
    },
  },
  {
    name: "CartView",
    component: CartView,
    options: {
      tabBarButton: () => null,
    },
    hiddenBottomTab: true,
  },
  {
    name: "PlantDetail",
    component: PlantDetail,
    options: {
      tabBarButton: () => null,
    },
    hiddenBottomTab: true,
  },
  {
    name: "PlanterDetail",
    component: PlanterDetail,
    options: {
      tabBarButton: () => null,
    },
    hiddenBottomTab: true,
  },
  {
    name: "Checkout",
    component: Checkout,
    options: {
      tabBarButton: () => null,
    },
    hiddenBottomTab: true,
  },
  {
    name: "Payment",
    component: Payment,
    options: {
      tabBarButton: () => null,
    },
    hiddenBottomTab: true,
  },
  {
    name: "OrderComplete",
    component: OrderComplete,
    options: {
      tabBarButton: () => null,
    },
    hiddenBottomTab: true,
  },
  {
    name: "LoginPage",
    component: LoginPage,
    options: {
      tabBarButton: () => null,
    },
    hiddenBottomTab: true,
  },
  {
    name: "ScanCamera",
    component: ScanCamera,
    options: {
      tabBarButton: () => null,
    },
    hiddenBottomTab: true,
  },
  {
    name: "OrderList",
    component: OrderList,
    options: {
      tabBarButton: () => null,
    },
  },
  {
    name: "Signin",
    component: signin,
    options: {
      tabBarButton: () => null,
    },
    hiddenBottomTab: true,
  },
  {
    name: "CreateAnAccount",
    component: Signup,
    options: {
      tabBarButton: () => null,
    },
    hiddenBottomTab: true,
  },
  {
    name: "verify",
    component: Verification,
    options: {
      tabBarButton: () => null,
    },
    hiddenBottomTab: true,
  },
  {
    name: "registerverify",
    component: Registerverify,
    options: {
      tabBarButton: () => null,
    },
    hiddenBottomTab: true,
  },
  {
    name: "packageplan",
    component: PackagePlan,
    options: {
      tabBarButton: () => null,
    },
    hiddenBottomTab: true,
  },
  {
    name: "PlantReport",
    component: PlantReport,
    options: {
      tabBarButton: () => null,
    },
    hiddenBottomTab: true,
  },
  {
    name: "EditProfile",
    component: EditProfile,
    options: {
      tabBarButton: () => null,
    },
    hiddenBottomTab: true,
  },
];
