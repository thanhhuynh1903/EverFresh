// /**
//  * @author Amusoftech <er.amudeep@gmail.com>
//  * @description List of routes for Tabs Navigator and Stack navigator, Along addational  Option for Tabs
//  */
// import React from 'react';
import Home from '../screens/Homepage/Homepage';
// import ProductDetails from '../screens/ProductDetails';

// import WriteReview from '../screens/WriteReview';
// import Cart from '../screens/Cart';
// import Checkout from '../screens/Checkout';
// import Filters from '../screens/Filter';
// import Search from '../screens/Search';
// import CheckoutDelivery from '../screens/Checkout/CheckoutDelivery';
// import CheckOutSteper from '../screens/Checkout/CheckOutSteper';
// import Summary from '../screens/Summary';
// import Account from '../screens/Account';
// import WishList from '../screens/WishList';

// import Orders from '../screens/Orders';
// import Address from '../screens/Address';
// import Feather from 'react-native-vector-icons/dist/Feather';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { appColors } from '../utils/appColors.js';
import { scale } from 'react-native-size-matters';
// import Category from '../screens/Category';

export const RoutesList = [

    {
        name: 'homepage',
        component: Home,
        options: {
            //tabBarBadge: 3,
            tabBarIcon: (props) => (
                <Icon name="home-outline" size={32} color="rgba(59,206,172,0.75)" />
            ),
            headerShown: false
        },
    },
    {
        name: 'Home1',
        component: Home,
        options: {
            //tabBarBadge: 3,
            tabBarIcon: (props) => (
                <Icon name="tree-outline" size={32} color="rgba(59,206,172,0.75)" />
            ),
            headerShown: false
        },
    },
    {
        name: 'Home2',
        component: Home,
        options: {
            //tabBarBadge: 3,
            tabBarIcon: (props) => (
                // <Feather
                //     name={'mouse-pointer'}
                //     size={scale(20)}
                //     // color={appColors.primary}
                //     {...props}
                // />
                <Icon name="tree-outline" size={32} color="rgba(59,206,172,0.75)" />
            ),
            headerShown: false
        },
    },
    {
        name: 'Home3',
        component: Home,
        options: {
            //tabBarBadge: 3,
            tabBarIcon: (props) => (
                // <Feather
                //     name={'mouse-pointer'}
                //     size={scale(20)}
                //     // color={appColors.primary}
                //     {...props}
                // />
                <Icon name="tree-outline" size={32} color="rgba(59,206,172,0.75)" />
            ),
            headerShown: false
        },
    },
    //   {
    //     name: 'Cart',
    //     component: Cart,
    //     options: {
    //       //tabBarBadge: 3,
    //       tabBarIcon: (props) => (
    //         <Feather
    //           name={'shopping-cart'}
    //           size={scale(20)}
    //           color={appColors.primary}
    //           {...props}
    //         />
    //       ),
    //       tabBarLabel: 'Cart',
    //     },
    //   },

    //   {
    //     name: 'ProductDetails',
    //     component: ProductDetails,
    //     options: {
    //       tabBarButton: (props) => null,
    //       tabBarVisible: false,
    //       tabBarBadge: 3,
    //       tabBarLabel: 'ProductDetails',
    //     },
    //   },

    //   {
    //     name: 'WriteReview',
    //     component: WriteReview,
    //     options: {
    //       tabBarButton: (props) => null,
    //       tabBarVisible: false,
    //       tabBarBadge: 3,
    //       tabBarLabel: 'WriteReview',
    //     },
    //   },

    //   {
    //     name: 'Checkout',
    //     component: Checkout,
    //     options: {
    //       tabBarButton: (props) => null,
    //       //tabBarVisible:false,
    //       //tabBarBadge: 3,
    //       tabBarLabel: 'Checkout',
    //     },
    //   },

    //   {
    //     name: 'Category',
    //     component: Category,
    //     options: {
    //       tabBarButton: (props) => null,
    //       tabBarVisible: false,
    //       //tabBarBadge: 3,
    //       tabBarLabel: 'Category',
    //     },
    //   },

    //   {
    //     name: 'Filters',
    //     component: Filters,
    //     options: {
    //       tabBarButton: (props) => null,
    //       tabBarVisible: false,
    //       //tabBarBadge: 3,
    //       tabBarLabel: 'Filters',
    //     },
    //   },

    //   {
    //     name: 'Search',
    //     component: Search,
    //     options: {
    //       tabBarButton: (props) => null,
    //       //tabBarVisible: false,
    //       //tabBarBadge: 3,
    //       tabBarLabel: 'Search',
    //     },
    //   },

    //   {
    //     name: 'CheckoutDelivery',
    //     component: CheckoutDelivery,
    //     options: {
    //       tabBarButton: (props) => null,
    //       tabBarVisible: false,
    //       //tabBarBadge: 3,
    //       tabBarLabel: 'CheckoutDelivery',
    //     },
    //   },

    //   {
    //     name: 'CheckOutSteper',
    //     component: CheckOutSteper,
    //     options: {
    //       tabBarButton: (props) => null,
    //       tabBarVisible: false,
    //       //tabBarBadge: 3,
    //       tabBarLabel: 'CheckOutSteper',
    //     },
    //   },

    //   {
    //     name: 'Summary',
    //     component: Summary,
    //     options: {
    //       tabBarButton: (props) => null,
    //       tabBarVisible: false,
    //       //tabBarBadge: 3,
    //       tabBarLabel: 'Summary',
    //     },
    //   },

    //   {
    //     name: 'Account',
    //     component: Account,
    //     options: {
    //       // tabBarButton: (props) => null,
    //       //tabBarVisible: false,
    //       //tabBarBadge: 3,
    //       tabBarIcon: (props) => (
    //         <Feather
    //           name={'user'}
    //           size={scale(20)}
    //           color={appColors.primary}
    //           {...props}
    //         />
    //       ),
    //       tabBarLabel: 'Account',
    //     },
    //   },
    //   {
    //     name: 'Orders',
    //     component: Orders,
    //     options: {
    //       tabBarButton: (props) => null,
    //       //tabBarVisible: false,
    //       //tabBarBadge: 3,
    //       tabBarLabel: 'Orders',
    //     },
    //   },
    //   {
    //     name: 'Address',
    //     component: Address,
    //     options: {
    //       tabBarButton: (props) => null,
    //       //tabBarVisible: false,
    //       //tabBarBadge: 3,
    //       tabBarLabel: 'Address',
    //     },
    //   },

    //   {
    //     name: 'WishList',
    //     component: WishList,
    //     options: {
    //       tabBarButton: (props) => null,
    //       //tabBarVisible: false,
    //       //tabBarBadge: 3,
    //       tabBarLabel: 'WishList',
    //     },
    //   },
];