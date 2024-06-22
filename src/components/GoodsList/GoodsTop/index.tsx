import React, { useState, useRef } from 'react'
import { Row, Col, Input, Select, Button, DatePicker } from 'antd'
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import type { TopProps } from './type'
import styles from './index.module.less'
        
const textStyle: React.CSSProperties = {
  minWidth: 'max-content',
  whiteSpace: 'nowrap',
}

const GoodsTop: React.FC<TopProps> = ({ changeQueryList, queryItem, setQueryItem, statusIsAble }) => {
  const [isRetract, setIsRetract] = useState<boolean>(false) //是否收缩

  
  const mainRef = useRef<HTMLDivElement>(null) // 动态添加类名

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
          <Input
            className={styles['top-input']}
            placeholder="请输入"
            type='number'
            value={queryItem.goodsId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.currentTarget.value && e.currentTarget.value !== '')
                setQueryItem({ ...queryItem, goodsId: e.currentTarget.value })
              else {
                setQueryItem({ ...queryItem, goodsId: undefined })
              }
            }}
          ></Input>
        </Col>
        <Col className={styles['main-col']} span={5}>
          <p style={textStyle}>商品名称：</p>
          <Input
            className={styles['top-input']}
            placeholder="请输入"
            value={queryItem.goodsName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.currentTarget.value && e.currentTarget.value !== ''){
                setQueryItem({ ...queryItem, goodsName: e.currentTarget.value })
              }
              else {
                setQueryItem({ ...queryItem, goodsName: undefined })
              }
            }}
          ></Input>
        </Col>
        <Col className={styles['main-col']} span={5}>
          <p style={textStyle}>开始时间：</p>
          <DatePicker
            className={styles['top-input']}
            showTime
            placeholder="请输入"
            value={queryItem.startDate}
            onChange={(value: dayjs.Dayjs) => {
              if (value)
                setQueryItem({ ...queryItem, startDate: value })
              else {
                setQueryItem({ ...queryItem, startDate: undefined })
              }
            }}
          ></DatePicker>
        </Col>
        <Col
          className={
            styles['main-col'] + ' ' + (isRetract ? styles['item-hide'] : '')
          }
          span={5}
        >
          <p style={textStyle}>结束时间：</p>
          <DatePicker
            className={styles['top-input']}
            showTime
            placeholder="请输入"
            onChange={(value: dayjs.Dayjs) => {
              if (value)
                setQueryItem({ ...queryItem, endDate: value })
              else {
                setQueryItem({ ...queryItem, endDate: undefined })
              }
            }}
          ></DatePicker>
        </Col>
        <Col
          className={
            styles['main-col'] + ' ' + (isRetract ? styles['item-hide'] : '')
          }
          span={5}
        >
          <p style={textStyle}>商品状态：</p>
          <Select
            className={styles['top-input']}
            placeholder="请输入"
            disabled={!statusIsAble}
            options={[
              { value: 0, label: '待提交审核' },
              { value: 1, label: '待上线' },
              { value: 2, label: '上线' },
              { value: 3, label: '下线' },
              { value: 4, label: '审核驳回' },
              { value: 5, label: '待审核' },
              { value: 6, label: '草稿' },
            ]}
            value={queryItem.goodsStatus}
            onChange={(value: number) => {
              if (value !== undefined) {
                setQueryItem({
                  ...queryItem,
                  goodsStatus: value,
                })
              } else {
                setQueryItem({ ...queryItem, goodsStatus: undefined })
              }
            }}
          ></Select>
        </Col>
        <Col
          className={
            styles['main-col'] + ' ' + (isRetract ? styles['item-hide'] : '')
          }
          span={5}
        >
          <p style={textStyle}>管理人：</p>
          <Input
            className={styles['top-input']}
            placeholder="请输入"
            value={queryItem.admin}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.currentTarget.value && e.currentTarget.value !== '')
                setQueryItem({ ...queryItem, admin: e.currentTarget.value })
              else {
                setQueryItem({ ...queryItem, admin: undefined })
              }
            }}
          ></Input>
        </Col>
        <Col
          className={
            styles['main-col'] + ' ' + (isRetract ? styles['item-hide'] : '')
          }
          span={5}
        >
          <p style={textStyle}>代理人：</p>
          <Input
            className={styles['top-input']}
            placeholder="请输入"
            value={queryItem.agent}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.currentTarget.value && e.currentTarget.value !== '')
                setQueryItem({ ...queryItem, agent: e.currentTarget.value })
              else {
                setQueryItem({ ...queryItem, agent: undefined })
              }
            }}
          ></Input>
        </Col>

        <Col
          className={styles['main-col'] + ' ' + styles['main-btns']}
          span={5}
        >
          <Button
            onClick={() => {
              setQueryItem({})
              changeQueryList({}, true)
            }}
          >
            重置
          </Button>
          <Button type="primary" onClick={() => changeQueryList(queryItem)}>
            查询
          </Button>
          {isRetract ? (
            <div className={styles['top-hide']} onClick={changeRetract}>
              展开&nbsp;
              <DownOutlined />
            </div>
          ) : (
            <div className={styles['top-hide']} onClick={changeRetract}>
              收起&nbsp;
              <UpOutlined />
            </div>
          )}
        </Col>
      </Row>
    </>
  )
}

export default GoodsTop
