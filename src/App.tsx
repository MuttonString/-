import { RouterProvider } from 'react-router-dom'
import router from './router'
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider, theme } from 'antd'
import { useState } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'

function App() {
  const media = matchMedia('(prefers-color-scheme: dark)')
  const [mode, setMode] = useState(media.matches)
  media.addEventListener('change', (e) => setMode(e.matches))
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: mode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router}></RouterProvider>
        </PersistGate>
      </Provider>
    </ConfigProvider>
  )
}

export default App
