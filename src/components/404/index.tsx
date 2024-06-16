import React from 'react'
import { Button } from 'antd'
import styles from './index.module.less'
/* 页面未找到 显示404page */

const NotFoundPage: React.FC = () => {
  return (
    <>
      <div className={styles.main}>
        <Button>返回首页</Button>
      </div>
    </>
  )
}

export default NotFoundPage
