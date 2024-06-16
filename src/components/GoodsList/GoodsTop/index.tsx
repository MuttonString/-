import React, { useState, useRef } from 'react'
import { Row, Col, Input, Select, Button } from 'antd'
import { UpOutlined } from '@ant-design/icons'
import styles from './index.module.less'

const textStyle: React.CSSProperties = {
  minWidth: 'max-content',
  whiteSpace: 'nowrap',
}

const GoodsTop: React.FC = () => {
  const [isRetract, setIsRetract] = useState<boolean>(false)
  const mainRef = useRef<HTMLDivElement>(null)

  const changeRetract = () => {
    setIsRetract((pre) => !pre)
    if (!isRetract) {
      mainRef.current?.classList.add(`${styles.shrink}`)
    } else {
      mainRef.current?.classList.remove(`${styles.shrink}`)
    }
  }
  return (
    <>
      <Row className={styles.main} wrap ref={mainRef}>
        <Col className={styles['main-col']} span={5}>
          <p style={textStyle}>权益ID：</p>
          <Input className={styles['top-input']} placeholder="请输入"></Input>
        </Col>
        <Col className={styles['main-col']} span={5}>
          <p style={textStyle}>商品名称：</p>
          <Input className={styles['top-input']} placeholder="请输入"></Input>
        </Col>
        <Col className={styles['main-col']} span={5}>
          <p style={textStyle}>开始时间：</p>
          <Input
            type="date"
            className={styles['top-input']}
            placeholder="请输入"
          ></Input>
        </Col>
        <Col className={styles['main-col'] + ' ' + (isRetract ? styles['item-hide'] : '')} span={5}>
          <p style={textStyle}>结束时间：</p>
          <Input
            type="date"
            className={styles['top-input']}
            placeholder="请输入"
          ></Input>
        </Col>
        <Col className={styles['main-col'] + ' ' + (isRetract ? styles['item-hide'] : '')} span={5}>
          <p style={textStyle}>商品状态：</p>
          <Select className={styles['top-input']} placeholder="请输入"></Select>
        </Col>
        <Col className={styles['main-col'] + ' ' + (isRetract ? styles['item-hide'] : '')} span={5}>
          <p style={textStyle}>管理人：</p>
          <Input className={styles['top-input']} placeholder="请输入"></Input>
        </Col>
        <Col className={styles['main-col'] + ' ' + (isRetract ? styles['item-hide'] : '')} span={5}>
          <p style={textStyle}>代理人：</p>
          <Input className={styles['top-input']} placeholder="请输入"></Input>
        </Col>

        <Col
          className={styles['main-col'] + ' ' + styles['main-btns']}
          span={5}
        >
          <Button>重置</Button>
          <Button type="primary">查询</Button>
          <div className={styles['top-hide']} onClick={changeRetract}>
            收起&nbsp;
            <UpOutlined />
          </div>
        </Col>
      </Row>
    </>
  )
}

export default GoodsTop
