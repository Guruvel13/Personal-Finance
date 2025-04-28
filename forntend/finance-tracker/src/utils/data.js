import {
    LuLayoutDashboard,
    LuHandCoins,
    LuWalletMinimal,
    LuLogOut,
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
        id :"06",
        lable :"Logout",
        icon : LuLogOut,
        path : "logout",
    }
]
