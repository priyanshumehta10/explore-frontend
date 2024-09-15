import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import { Provider } from 'react-redux';
import store from './store/store';
import HomePage from './pages/HomePage.jsx';
import { AuthLayout } from './component/index.js';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import OpinionPage from './pages/OpinionPage.jsx';
import TrandingPage from './pages/TrendingPage.jsx';
import OneVideo from './component/Video/OneVideo.jsx';
import UploadPage from './pages/UploadPage.jsx';

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',element:<HomePage/>
      },{
        path:"/login",
        element:(
          <AuthLayout authentication={false}>
            <LoginPage/>
          </AuthLayout>

        )
      },{
        path:"/signup",
        element:(
          <AuthLayout authentication={false}>
            <SignupPage/>
          </AuthLayout>

        )
      },{
        path:"/opinion",
        element:(
          <AuthLayout authentication>
            <OpinionPage/>
          </AuthLayout>

        )
      },{
        path:"/trending",
        element:(
          <AuthLayout authentication>
            <TrandingPage/>
          </AuthLayout>

        )
      },{
        path:"/:videoId",
        element:(
          <AuthLayout authentication>
            <OneVideo/>
          </AuthLayout>

        )
      },{
        path:"/upload",
        element:(
          <AuthLayout authentication>
            <UploadPage/>
          </AuthLayout>
        )
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
    <App />
      </RouterProvider>
    </Provider>
  </StrictMode>,
)
