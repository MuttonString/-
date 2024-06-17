import React from 'react'
import { Input, Select } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import styles from './index.module.less'

const VipInput: React.FC = () => {
  return (
    <>
      <main className={styles.main}>
        <section className={styles['main-2']}>
          <span><span style={{color:'red', fontSize: '1rem'}}>*</span>黄金会员价格类型</span>
          <div>
            <Select placeholder="请选择" style={{ width: '22rem' }}></Select>
          </div>
        </section>
        <section className={styles['main-2']}>
          <span><span style={{color:'red', fontSize: '1rem'}}>*</span>积分数量</span>
          <div>
            <Input placeholder="请输入"></Input>
          </div>
        </section>

        <section className={styles['main-3']}>
          <div className={styles['main-2']}>
            <span><span style={{color:'red', fontSize: '1rem'}}>*</span>现金价格</span>
            <div>
              <Input placeholder="请输入"></Input>
            </div>
          </div>
          <DeleteOutlined
            style={{ fontSize: '1.25rem', marginTop: '2rem', color: 'red' }}
          />
        </section>
      </main>
    </>
  )
}

export default VipInput
