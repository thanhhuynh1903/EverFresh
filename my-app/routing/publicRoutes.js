import welcome from "../screens/welcome/welcome";
import Signup from "../screens/signup/signup";
import signin from "../screens/signin/signin";
import Verification from "../screens/OTPverfication/Verification";
import Registerverify from "../screens/Registerverify/Registerverify";
import PackagePlan from "../screens/PackagePlan/PackagePlan";
import Homepage from "../screens/Homepage/Homepage";
import SavedPlant from "../screens/SavedPlant/SavedPlant";
import ShopPage from "../screens/ShopPage/ShopPage";
import PlantDetail from "../screens/PlantDetail/PlantDetail";
import Checkout from "../screens/Checkout/Checkout";
import Payment from "../screens/Payment/Payment";
import OrderComplete from "../screens/OrderComplete/OrderComplete";
import TrackingOrder from "../screens/TrackingOrder/TrackingOrder";
import PlantGuide from "../screens/PlantGuide/PlantGuide";
import CartView from "../screens/CartView/CartView";
import LoginPage from "../screens/login/login";
import ScanCamera from "../screens/ScanCamera/ScanCamera";
import OrderList from "../screens/OrderList/OrderList";
import PlantReport from "../screens/PlantReport/PlantReport";
import Galery from "../screens/Galery/Galery";
export const publicRoutes = [
  {
    name: "Welcome",
    component: welcome,
  },
  {
    name: "Signin",
    component: signin,
  },
  {
    name: "CreateAnAccount",
    component: Signup,
  },
  {
    name: "verify",
    component: Verification,
  },
  {
    name: "registerverify",
    component: Registerverify,
  },
  {
    name: "packageplan",
    component: PackagePlan,
  },
  {
    name: "homepage",
    component: Homepage,
  },
  {
    name: "savedplant",
    component: SavedPlant,
  },
  {
    name: "ShopPage",
    component: ShopPage,
  },
  {
    name: "PlantDetail",
    component: PlantDetail,
  },
  {
    name: "Checkout",
    component: Checkout,
  },
  {
    name: "Payment",
    component: Payment,
  },
  {
    name: "OrderComplete",
    component: OrderComplete,
  },
  {
    name: "TrackingOrder",
    component: TrackingOrder,
  },
  {
    name: "PlantGuide",
    component: PlantGuide,
  },
  {
    name: "CartView",
    component: CartView,
  },
  {
    name: "LoginPage",
    component: LoginPage,
  },
  {
    name: "ScanCamera",
    component: ScanCamera,
  },
  {
    name: "OrderList",
    component: OrderList,
  },
  {
    name: "PlantReport",
    component: PlantReport,
  },
  {
    name: "Galery",
    component: Galery,
  },
];
