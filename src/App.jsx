import { Route, Routes } from "react-router-dom"

import { UserProvider } from "./context/UserContext"
import { AuthLayout } from "./layout/AuthLayout"

{/* Views */}
import { ForgetPasswordView } from "./pages/ForgotPasswordView"
import { HomeView } from "./pages/HomeView"
import { LoginView } from "./pages/LoginView"
import { RegisterView } from "./pages/RegisterView"
import { UpdatePasswordView } from "./pages/UpdatePasswordView"


function App() {

  return (
    <div className="bg-base-superdark min-h-screen text-white font-medium tracking-wider">
    <UserProvider>
      <Routes>
        <Route path="/link-app" element={<HomeView />
        }/>
        <Route path="/link-app/auth" element={<AuthLayout />}>
          <Route index element={<LoginView />}/>
          <Route path="register" element={<RegisterView />}/>
          <Route path="forgot-password" element={<ForgetPasswordView />}/>
          <Route path="update-password" element={<UpdatePasswordView />}/>
        </Route>
      </Routes>
    </UserProvider>
    </div>
  )
}

export default App
