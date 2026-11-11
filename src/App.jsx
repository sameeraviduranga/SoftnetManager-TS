
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from '@/layout/MainLayout'
import Dashboard from '@/features/dashboard/pages/Dashboard'
import LoginPage from '@/features/auth/pages/Login'
import RegisterPage from '@/features/auth/pages/Register'
import ProtectedRoute from '@/router/ProtectedRoute'
import useAuth from '@/core/hooks/useAuth'
import LoadingScreen from '@/core/components/LoadingScreen'
import GuestRoute from '@/router/GuestRoute'
import Report from '@/features/report/pages/report'
import Account from '@/features/account/pages/account'
import Customer from './features/customer/pages/customer'
import Branch from './features/branch/pages/branch'
import Likes from './features/likes/pages/likes'
import Analytics from './features/analyitics/pages/analytics'
import Wallets from './features/wallets/pages/wallets'
import Error403 from './core/errorpages/403'
import RoleRoute from './router/RoleRoute'
import CreateUser from '@/features/auth/pages/CreatUser'
import UpdateUser from './features/auth/pages/UpdateUser'
import Admin from '@/features/admin/pages/Admin'
import ListUsers from './features/admin/pages/ListUsers'







function App() {
  const { initializing } = useAuth();



  if (initializing) {
    return <LoadingScreen />;
  }

  return (

    <Routes>
      {/* 1. App එක Open වෙද්දීම (Root path '/') Login පිටුව පෙන්වීම */}
      <Route path='/' element={<Navigate to='/login' replace />} />

      <Route element={<GuestRoute />}>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Route>

      {/* Forbidden */}
      <Route path="/403" element={<Error403 />} />

      {/* 2. Main Layout එක සහ ඒ ඇතුළේ ඇති Nested Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path='/main' element={<MainLayout />}>
          <Route index element={<Navigate to='dashboard' replace />} />{/* කෙනෙක් /main එකට විතරක් ආවොත් auto /main/dashboard එකට redirect කිරීමට */}
          <Route element={<RoleRoute allowedRoutes={["Admin"]} />}>
            <Route path='admin' element={<Admin />} />
          </Route>
          <Route path='dashboard' element={<Dashboard />} />{/* /main/dashboard ලෙස Access කිරීමට (relative path එකක් විදිහට 'dashboard' යොදන්න) */}
          <Route path='admin'>
            <Route path='all-users' element={<ListUsers />} />
            <Route path='create-user' element={<CreateUser />} />
            <Route path='update-user' element={<UpdateUser />} />
            <Route path='create-role' element={<Branch />} />
            <Route path='update-role' element={<Branch />} />
          </Route>
          <Route path='customers' element={<Customer />} />
          <Route path='branches' element={<Branch />} />
          <Route path='analytics' element={< Analytics />} />
          <Route path='account'>
            <Route path='create-account' element={<Branch />} />
            <Route path='update-account' element={<Branch />} />
          </Route>
          <Route path='reports' element={<Report />} />
          <Route path='likes' element={<Likes />} />
          <Route path='wallet' element={<Wallets />} />
        </Route>
      </Route>
    </Routes >

  )
}

export default App
