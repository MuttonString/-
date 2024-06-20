import React, { useState, useEffect, useCallback } from 'react'
import { Input, Select } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import styles from './index.module.less'

interface propsType {
  typeNum: 'CASH' | 'INTEGRAL' | 'INTEGRAL_AND_CASH'
  ableGoodsExchangeWays: Function
  delGoodsExchangeWays: Function
  isInitial: boolean
  isValiExchange: boolean
}

const VipInput: React.FC<propsType> = React.memo(
  ({ typeNum, ableGoodsExchangeWays, delGoodsExchangeWays, isInitial, isValiExchange }) => {
    const [cash, setCash] = useState<string>()
    const [score, setScore] = useState<string>()

    useEffect(() => {
      if (typeNum == 'INTEGRAL') {
        if (score && +score >= 0) {
          ableGoodsExchangeWays({ typeNum, score, isAble: true })
        } else {
          ableGoodsExchangeWays({ typeNum, score: '0', isAble: false })
        }
      } else if (typeNum == 'INTEGRAL_AND_CASH') {
        if (cash && +cash >= 0 && score && +score >= 0) {
          ableGoodsExchangeWays({ typeNum, score, cash, isAble: true })
        } else {
          ableGoodsExchangeWays({ typeNum, score: '0', cash: 0, isAble: false})
        }
      } else {
        if (cash && +cash >= 0) {
          ableGoodsExchangeWays({ typeNum, cash, isAble: true })
        } else {
          ableGoodsExchangeWays({ typeNum, cash: 0, isAble: false })
        }
      }
    }, [cash, score])

    //验证cash字段
    const valiCash = useCallback(() => {
      if (cash && +cash < 0) return 1
      if (cash === undefined && !isInitial && isValiExchange) return 1
      if (cash === '') return 1
      if (cash && +cash >= 0) return 0
      return 0
    },[cash, isInitial, isValiExchange])

    //验证score字段
    const valiScore = useCallback(() => {
      if (score && +score < 0) return 1
      if (score === undefined && !isInitial && isValiExchange) return 1
      if (score === '') return 1
      if (score && +score >= 0) return 0
      return 0
    },[score, isInitial, isValiExchange])

    // 方式类别判断映射相应组件
    const waysMap: any = {
      'INTEGRAL': (
        <section className={styles['main-3']}>
          <div className={styles['main-2']}>
            <span>
              <span style={{ color: 'red', fontSize: '1rem' }}>*</span>
              积分数量
            </span>
            <div>
              <Input
                type="number"
                placeholder="请输入"
                value={score}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setScore(e.currentTarget.value)
                }
              ></Input>
            </div>
            <span
              style={{
                color: 'red',
                opacity: valiScore(),
              }}
            >
              积分非空且只能为正数
            </span>
          </div>
          <DeleteOutlined
            style={{ fontSize: '1.25rem', color: 'red' }}
            onClick={() => delGoodsExchangeWays(typeNum)}
          />
        </section>
      ),
      'INTEGRAL_AND_CASH': (
        <>
          <section className={styles['main-2']}>
            <span>
              <span style={{ color: 'red', fontSize: '1rem' }}>*</span>
              积分数量
            </span>
            <div>
              <Input
                type="number"
                placeholder="请输入"
                value={score}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setScore(e.currentTarget.value)
                }
              ></Input>
            </div>
            <span
              style={{
                color: 'red',
                opacity: valiScore()
              }}
            >
              积分非空且只能为正数
            </span>
          </section>
          <section className={styles['main-3']}>
            <div className={styles['main-2']}>
              <span>
                <span style={{ color: 'red', fontSize: '1rem' }}>*</span>
                现金价格
              </span>
              <div>
                <Input
                  type="number"
                  placeholder="请输入"
                  value={cash}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCash(e.currentTarget.value)
                  }
                ></Input>
              </div>
              <span
                style={{
                  color: 'red',
                  opacity: valiCash(),
                }}
              >
                现金非空且只能为正数
              </span>
            </div>
            <DeleteOutlined
              style={{ fontSize: '1.25rem', color: 'red' }}
              onClick={() => delGoodsExchangeWays(typeNum)}
            />
          </section>
        </>
      ),
      'CASH': (
        <section className={styles['main-3']}>
          <div className={styles['main-2']}>
            <span>
              <span style={{ color: 'red', fontSize: '1rem' }}>*</span>现金价格
            </span>
            <div>
              <Input
                type="number"
                placeholder="请输入"
                value={cash}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCash(e.currentTarget.value)
                }
              ></Input>
            </div>
            <span
              style={{
                color: 'red',
                opacity: valiCash(),
              }}
            >
              现金非空且只能为正数
            </span>
          </div>
          <DeleteOutlined
            style={{ fontSize: '1.25rem', color: 'red' }}
            onClick={() => delGoodsExchangeWays(typeNum)}
          />
        </section>
      ),
    }
    return (
      <>
        <main className={styles.main}>
          <section className={styles['main-2']}>
            <span>
              <span style={{ color: 'red', fontSize: '1rem' }}>*</span>
              黄金会员价格类型
            </span>
            <div>
              <Select
                placeholder="请选择"
                style={{ width: '9.375rem' }}
                defaultValue={
                  typeNum == 'CASH' ? '积分' : typeNum == 'INTEGRAL_AND_CASH' ? '积分+现金' : '现金'
                }
                options={[
                  { value: 'INTEGRAL', label: '积分' },
                  { value: 'INTEGRAL_AND_CASH', label: '积分+现金' },
                  { value: 'CASH', label: '现金' },
                ]}
                disabled
              ></Select>
            </div>
            <span style={{ opacity: 0 }}>字段不能为空</span>
          </section>
          {waysMap[typeNum] ? (
            waysMap[typeNum]
          ) : (
            <p style={{ color: 'red' }}>类型数据出错了</p>
          )}
        </main>
      </>
    )
  }
)

export default VipInput
