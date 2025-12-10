import {
    LuLayoutDashboard,
    LuHandCoins,
    LuWalletMinimal,
    LuLogOut,
    LuSettings,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
    {
        id:"01",
        lable :"Dashboard",
        icon : LuLayoutDashboard,
        path : "/dashboard",
    },
    {
        id :"02",
        lable :"Income",
        icon : LuWalletMinimal,
        path : "/income",
    },
    {
        id :"03",
        lable :"Expense",
        icon : LuHandCoins,
        path : "/expense",
    },
    {
        id :"04",
        lable :"Settings",
        icon : LuSettings,
        path : "/settings",
    },
    {
        id :"06",
        lable :"Logout",
        icon : LuLogOut,
        path : "logout",
    }
]
