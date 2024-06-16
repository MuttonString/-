import React from 'react'
import GoodsTop from './GoodsTop'
import GoodsMain from './GoodsMain'
import styles from './index.module.less'

const GoodsList: React.FC = () => {
  return (
    <>
      <div className={styles.main}>
        <GoodsTop></GoodsTop>
        <GoodsMain></GoodsMain>
      </div>
    </>
  )
}

export default GoodsList