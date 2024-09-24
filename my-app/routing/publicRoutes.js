import welcome from "../screens/welcome/welcome";
import Signup from "../screens/signup/signup";
import signin from "../screens/signin/signin";
import Verification from "../screens/OTPverfication/Verification";
import Registerverify from "../screens/Registerverify/Registerverify";
import PackagePlan from "../screens/PackagePlan/PackagePlan";
import Homepage from "../screens/Homepage/Homepage";
import SavedPlant from "../screens/SavedPlant/SavedPlant";
import ShopPage from "../screens/ShopPage/ShopPage";
export const publicRoutes = [
  {
    name: 'Welcome',
    component: welcome,
  },
  {
    name: 'Signin',
    component: signin,
  },
  {
    name: 'CreateAnAccount',
    component: Signup,
  },
  {
    name: 'verify',
    component: Verification,
  },
  {
    name: 'registerverify',
    component: Registerverify,
  },
  {
    name: 'packageplan',
    component: PackagePlan,
  },
  {
    name: 'homepage',
    component: Homepage,
  },
  {
    name: 'savedplant',
    component: SavedPlant,
  },
  {
    name: 'ShopPage',
    component: ShopPage,
  },
];
