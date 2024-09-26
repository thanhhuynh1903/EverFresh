import Home from '../screens/Homepage/Homepage';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { appColors } from '../utils/appColors.js';
// import { scale } from 'react-native-size-matters';
import ShopPage from '../screens/ShopPage/ShopPage.js';
import PlantDetail from '../screens/PlantDetail/PlantDetail.js';
import TrackingOrder from '../screens/TrackingOrder/TrackingOrder.js';
import PlantGuide from '../screens/PlantGuide/PlantGuide.js';
// import Category from '../screens/Category';

export const RoutesList = [
    {
        name: 'Home',
        component: Home,
        options: {
            tabBarIcon: ({ color, focused }) => (
                <Icon name="home-outline" size={32} color={color} />
            ),
            headerShown: false,
        },
    },
    {
        name: 'Home1',
        component: Home,
        options: {
            tabBarIcon: ({ color, focused }) => (
                <Icon name="view-grid-outline" size={32} color={color} />
            ),
            headerShown: false,
            iconStyles: { transform: [{ translateX: -25 }] }
        },
    },
    {
        name: 'Home2',
        component: Home,
        options: {
            tabBarIcon: ({ color, focused }) => (
                <Icon name="alarm" size={32} color={color} />
            ),
            headerShown: false,
            iconStyles: { transform: [{ translateX: 25 }] },
            activeColor: "#37B551"
        },
    },
    {
        name: 'Home3',
        component: Home,
        options: {
            tabBarIcon: ({ color, focused }) => (
                <Icon name="account-outline" size={32} color={color} />
            ),
            headerShown: false,
            activeColor: "#43BD44"
        },
    },
    {
        name: 'ShopPage',
        component: ShopPage,
        options: {
            tabBarButton: () => null,
        },
    },
    {
        name: 'TrackingOrder',
        component: TrackingOrder,
        options: {
            tabBarButton: () => null,
        },
    },
    {
        name: 'PlantGuide',
        component: PlantGuide,
        options: {
            tabBarButton: () => null,
        },
    },
    // {
    //     name: 'PlantDetail',
    //     component: PlantDetail,
    //     options: {
    //         tabBarButton: () => null,
    //     },
    // },
];
