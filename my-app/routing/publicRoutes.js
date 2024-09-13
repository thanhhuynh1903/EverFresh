import welcome from "../screens/welcome/welcome";
import signup from "../screens/signup/signup";
import signin from "../screens/signin/signin";
import Verification from "../screens/OTPverfication/Verification";
import Registerverify from "../screens/Registerverify/Registerverify";
export const publicRoutes = [
  {
    name: 'Welcome',
    component: welcome,
    options: {
      headerShown: false, // Hide the header
    },
  },
  {
    name: 'Signin',
    component: signin,
    options: {
      headerShown: false, // Hide the header if needed
    },
  },
  {
    name: 'CreateAnAccount',
    component: signup,
    options: {
      headerShown: false, // Hide the header if needed
    },
  },
  {
    name: 'verify',
    component: Verification,
    options: {
      headerShown: false, // Hide the header if needed
    },
  },
  {
    name: 'registerverify',
    component: Registerverify,
    options: {
      headerShown: false, // Hide the header if needed
    },
  },
  // Uncomment and adjust if needed
  // {
  //   name: 'Verification',
  //   component: Verification,
  //   options: {
  //     tabBarButton: (props) => null,
  //     tabBarVisible: false,
  //     tabBarBadge: 3,
  //     tabBarLabel: 'Verification',
  //   },
  // },
];
