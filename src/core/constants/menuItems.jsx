import { AccountBalance, AccountBox, AdminPanelSettings, Analytics, AnalyticsTwoTone, Dashboard, DashboardCustomizeOutlined, DocumentScanner, Favorite, LightMode, Logout, Person2, Person3, ProductionQuantityLimitsOutlined, Report, ReportGmailerrorred, ReportGmailerrorredSharp, ReportProblemSharp, ReportSharp, Search, Shop2, Shop2Outlined, Tune, TurnedIn, Wallet } from '@mui/icons-material';
import { FaProductHunt } from 'react-icons/fa6';
import { GoListOrdered } from 'react-icons/go';
import { GrOrderedList, GrUserAdmin } from 'react-icons/gr';
import { HiDocumentReport } from 'react-icons/hi';
import { HiDocumentPlus } from 'react-icons/hi2';
import { RiOrderPlayLine } from 'react-icons/ri';


export const mainMenuItems = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        path: 'dashboard',
        icon: <DashboardCustomizeOutlined />,
        subMenus: [
            { id: 'createUser', label: 'Create User', path: 'create-user', permission: 'User.Create' },

        ]

    },
    {
        id: 'admin',
        label: 'Admin',
        path: 'admin',
        icon: <AdminPanelSettings />,
        subMenus: [
            { id: 'userList', label: 'User List', path: 'all-users', permission: 'Users.View' },
            { id: 'createUser', label: 'Create User', path: 'create-user', permission: 'User.Create' },
            { id: 'updateUser', label: 'Update User', path: 'update-user', permission: 'User.Update' },
            { id: 'createRole', label: 'Create Role', path: 'create-role', permission: 'Role.Create' },
            { id: 'updateRole', label: 'Update Role', path: 'update-role', permission: 'Role.Update' },
        ]

    },
    {
        id: 'account',
        label: 'Account',
        path: 'account',
        icon: <AccountBalance />,
        subMenus: [
            { id: 'createAccount', label: 'Create Account', path: 'create-account', permission: 'User.Create' },
            { id: 'updateAccount', label: 'Update Account', path: 'update-account', permission: 'User.Update' },
        ]

    },
    {

        id: 'customers',
        label: 'Customers',
        path: 'customer',
        icon: <Person2 />,
        subMenus: [
            { id: 'createcustomer', label: 'Create Customer', path: 'create-user', permission: 'User.Create' },
            { id: 'updatecustomer', label: 'Update Customer', path: 'create-user', permission: 'User.Update' },
        ]
    },
    {
        id: 'products',
        label: 'Products',
        path: 'products',
        icon: <ProductionQuantityLimitsOutlined />,
        subMenus: [
            { id: 'createUser', label: 'Create User', path: 'create-user', permission: 'User.Create' },
            { id: 'updateUser', label: 'Update User', path: 'create-user', permission: 'User.Update' },
            { id: 'createRole', label: 'Create Role', path: 'create-role', permission: 'Role.Create' },
            { id: 'updateRole', label: 'Update Role', path: 'update-role', permission: 'Role.Update' },
        ]

    },
    {
        id: 'orders',
        label: 'Orders',
        path: 'orders',
        icon: <RiOrderPlayLine />,
        subMenus: [
            { id: 'createUser', label: 'Create User', path: 'create-user', permission: 'User.Create' },
            { id: 'updateUser', label: 'Update User', path: 'create-user', permission: 'User.Update' },
            { id: 'createRole', label: 'Create Role', path: 'create-role', permission: 'Role.Create' },
            { id: 'updateRole', label: 'Update Role', path: 'update-role', permission: 'Role.Update' },
        ]

    },
    {
        id: 'branches',
        label: 'Branches',
        path: 'branches',
        icon: <Shop2Outlined />,
        subMenus: [
            { id: 'createbranch', label: 'Create Branch', path: 'create-user', permission: 'User.Create' },
            { id: 'updatebranch', label: 'Update Branch', path: 'create-user', permission: 'User.Update' },
            { id: 'deletebranch', label: 'Delete Branch', path: 'create-role', permission: 'Role.Create' },
        ]

    },
    {
        id: 'reports',
        label: 'Reports',
        path: 'reports',
        icon: <AnalyticsTwoTone />,
        subMenus: [
            { id: 'createbranch', label: 'Create Branch', path: 'create-user', permission: 'User.Create' },
            { id: 'updatebranch', label: 'Update Branch', path: 'create-user', permission: 'User.Update' },
            { id: 'deletebranch', label: 'Delete Branch', path: 'create-role', permission: 'Role.Create' },
        ]

    }
]