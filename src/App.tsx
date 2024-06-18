import { RouterProvider } from 'react-router-dom';
import router from './router';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider, theme } from 'antd';
import { useState } from 'react';

function App() {
    const media = matchMedia('(prefers-color-scheme: dark)');
    const [mode, setMode] = useState(media.matches);
    media.addEventListener('change', e => setMode(e.matches));
    return (
        <ConfigProvider
            locale={zhCN}
            theme={{
                algorithm: mode ? theme.darkAlgorithm : theme.defaultAlgorithm
            }}
        >
            <RouterProvider router={router}></RouterProvider>
        </ConfigProvider>
    );
}

export default App;
