import React, { useState, useCallback, useEffect } from 'react'
import {
  Form,
  Input,
  Divider,
  Upload,
  Select,
  Button,
  DatePicker,
  message,
  Drawer,
  Tree,
  Tooltip,
  UploadFile,
  Row,
  Col,
} from 'antd'
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { nanoid } from 'nanoid'
import type { GoodsInfo, ExchangeWay } from './type'
import styles from './index.module.less'
import type { VipInputType } from './VipInput/type'
import VipInput from './VipInput'

/* 全局编辑或新增界面 */

const TextArea = Input.TextArea

const textStyle: React.CSSProperties = {
  fontSize: '.875rem',
}

const gapStyle: React.CSSProperties = {
  marginLeft: '6rem',
}

const uploadButton = (
  <button
    style={{ border: 0, background: 'none', color: 'var(--main-fg-color)' }}
    type="button"
  >
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>上传图片</div>
  </button>
)

const GoodsEdit: React.FC = () => {
  const [goodsExchangeWays, setGoodsExchangeWays] = useState<VipInputType[]>([]) //兑换方式状态管理
  const [selectedExchangeWay, setSelectedExchangeWay] = useState<number>() //当前选中要添加的兑换方式
  const [isValiExchange, setIsValiExchange] = useState<boolean>(false) //显示是否提交校验过兑换方式
  const [open, setOpen] = useState<boolean>(false) //控制抽屉显隐
  const [stock, setStock] = useState<number>() //库存数量
  const [exchangeLimit, setExchangeLimit] = useState<number>() //兑换限制
  const [goodsAvatar, setGoodsAvatar] = useState<UploadFile<any>[]>() //商品头图
  const [totalCommit, setTotalCommit] = useState<GoodsInfo>() //总提交项，校验通过生成

  // 两个form表单数据绑定
  const [form1] = Form.useForm()
  const [form2] = Form.useForm()

  // 完成校验收集到数据之后准备发送请求
  useEffect(() => {
    console.log(totalCommit)
  }, [totalCommit])

  const [messageApi, contextHolder] = message.useMessage() //message消息提示导入

  const errorNull = () => {
    messageApi.open({
      type: 'error',
      content: '你还未选择要填加的兑换方式',
    })
  }

  const errorRepeat = () => {
    messageApi.open({
      type: 'error',
      content: '兑换方式已存在',
    })
  }

  const errorDateCompare = () => {
    messageApi.open({
      type: 'error',
      content: '上线时间不能大于下线时间',
    })
  }

  const errorSizeAvatar = (imgSize: number) => {
    messageApi.open({
      type: 'error',
      content: `图片大小超过5MB(${(imgSize / 1024 / 1024).toFixed(2)}MB)`,
    })
  }

  const errorFormatAvatar = () => {
    messageApi.open({
      type: 'error',
      content: '文件格式错误(必须为图片)',
    })
  }

  const errorCommon = () => {
    messageApi.open({
      type: 'error',
      content: '存在不合理字段',
    })
  }

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  // 改变子兑换为生效的状态
  const ableGoodsExchangeWays = (updateWay: VipInputType) => {
    for (let i = 0; i < goodsExchangeWays.length; i++) {
      if (goodsExchangeWays[i].typeNum == updateWay.typeNum) {
        goodsExchangeWays[i].isAble = updateWay.isAble
        goodsExchangeWays[i].cash = updateWay.cash || 0
        goodsExchangeWays[i].score = updateWay.score || 0
        break
      }
    }
  }
  // 让子兑换删除兑换方式
  const delGoodsExchangeWays = (typeNum: number) => {
    const newWays = goodsExchangeWays.filter(
      (way: VipInputType) => way.typeNum != typeNum
    )
    setGoodsExchangeWays(newWays)
  }
  //添加新的兑换方式
  const addExchangeWay = () => {
    if (!selectedExchangeWay) {
      errorNull()
      return
    }
    if (
      goodsExchangeWays.find(
        (way: VipInputType) => way.typeNum == selectedExchangeWay
      )
    ) {
      errorRepeat()
      return
    }
    const newWay: VipInputType = {
      id: nanoid(),
      typeNum: selectedExchangeWay,
      score: 0,
      cash: 0,
      isAble: false,
      isInitial: true,
    }
    goodsExchangeWays.push(newWay)
    setGoodsExchangeWays([...goodsExchangeWays])
  }
  //通过兑换方式数组，渲染所有兑换方式表单
  const exchangeWaysSelectComponent = () => {
    return goodsExchangeWays.map((way: VipInputType) => {
      return (
        <VipInput
          key={way.id}
          typeNum={way.typeNum}
          ableGoodsExchangeWays={ableGoodsExchangeWays}
          delGoodsExchangeWays={delGoodsExchangeWays}
          isInitial={way.isInitial!}
          isValiExchange={isValiExchange}
        ></VipInput>
      )
    })
  }

  //改变所有兑换方式栏子组件初始化状态
  const changeInitialWays = () => {
    goodsExchangeWays.forEach((way: VipInputType) => {
      way.isInitial = false
    })
    setGoodsExchangeWays([...goodsExchangeWays])
  }

  //通过计算stock与isValiExchange(点击提交后变成true)，返回是否显示警告，通过useCallback优化
  const showStockWarnings = useCallback(
    (validating = false) => {
      if (stock === undefined && (isValiExchange || validating)) return true
      if (stock === undefined || stock >= 0) return false
      return true
    },
    [stock, isValiExchange]
  )

  //通过计算exchangeLimit，返回是否显示警告，通过useCallback优化
  const showExchangeLimit = useCallback(() => {
    if (exchangeLimit === 0) return true
    if (exchangeLimit === undefined || exchangeLimit >= -1) return false
    return true
  }, [exchangeLimit])

  //通过计算isValichange和兑换方式数量，来确定是否展示兑换方式数量为0的警告
  const showZeroWays = useCallback(
    (validating = false) => {
      if ((isValiExchange || validating) && goodsExchangeWays.length === 0)
        return 'inline'
      return 'none'
    },
    [goodsExchangeWays, isValiExchange]
  )

  //验证所有的兑换方式输入格式是否正确

  const handlerCommit = async () => {
    //校验两个antd表单，通过try-catch-finally确保实现双表都能校验，以及后续自定义表单项校验
    let isThrow = false
    try {
      await form1.validateFields()
    } catch (error) {
      errorCommon()
      isThrow = true
      console.log(error)
    } finally {
      try {
        await form2.validateFields()
      } catch (error) {
        console.log(error)
      }
    }
    //更改校验状态，自定义表单将自动校验
    setIsValiExchange(true)
    //更改兑换方式列表初始化值，以提醒字段校验
    changeInitialWays()
    // 上线时间不能晚于下线时间
    if (form2.getFieldValue('startDate') > form2.getFieldValue('endDate')) {
      errorDateCompare()
    }
    //校验商品头图
    valiAvatar()
    if (isThrow) return
    if (showZeroWays(true) === 'inline') {
      errorCommon()
      return
    }
    if (showStockWarnings(true) === true) {
      errorCommon()
      return
    }
    //检验所有兑换方式是否合法
    for (let i = 0; i < goodsExchangeWays.length; i++) {
      if (!goodsExchangeWays[i].isAble) {
        errorCommon()
        return
      }
    }
    collectForm()
  }
  //校验图片文件上传是否超过5MB, 是否非图片类型
  const valiAvatar = () => {
    const { file } = form1.getFieldValue('goodsAvatar')
    if (!file?.type.includes('image')) {
      errorFormatAvatar()
      return false
    }
    if (file?.size >= 5 * 1024 * 1024) {
      errorSizeAvatar(file?.size)
      return false
    }
    return true
  }

  // 对整个表单数据进行收集
  const collectForm = () => {
    //收集兑换方式数组
    const resExchangeWays: ExchangeWay[] = goodsExchangeWays.map(
      (way: VipInputType) => {
        return {
          exchangeWayType: way.typeNum,
          cash: way.cash,
          score: way.score,
        }
      }
    )
    const allData: GoodsInfo = {
      goodsName: form1.getFieldValue('goodsName'),
      goodsAvatar: form1.getFieldValue('goodsAvatar'),
      goodsDesc: form1.getFieldValue('goodsDesc'),
      goodsType: form1.getFieldValue('goodsType'),
      goodsDetail: form1.getFieldValue('goodsDetail'),
      goodsCaId: form1.getFieldValue('goodsCategory'),
      goodsStatus: 1,
      supplierName: form1.getFieldValue('supplierName'),
      supplierPhone: form1.getFieldValue('supplierPhone'),
      serviceGuarantee: form1.getFieldValue('serviceGuarantee'),
      exchangeWays: resExchangeWays,
      noCities: ['1', '2'],
      exchangeLimit: exchangeLimit || -1,
      stock: stock!,
      startDate: form2.getFieldValue('startDate').toISOString(),
      endDate: form2.getFieldValue('endDate').toISOString(),
      yesCities: ['1', '2'],
    }
    setTotalCommit(allData)
  }

  // 重置所有表单项
  const resetAllForm = () => {
    form1.resetFields()
    form2.resetFields()
    setIsValiExchange(false)
    setGoodsExchangeWays([])
  }

  return (
    <>
      {contextHolder}
      <div className={styles.main}>
        <Form
          // labelCol={{ span: 4 }}
          style={{ maxWidth: 'none' }}
          form={form1}
        >
          <Divider orientation="left">基本信息</Divider>
          <Row gutter={32}>
            <Col span={12} xl={10}>
              <Form.Item
                label="商品名称"
                name="goodsName"
                // wrapperCol={{ span: 6 }}
                rules={[
                  {
                    required: true,
                    message: '商品名称不能为空',
                  },
                  { max: 20, message: '超出商品名称最大长度20' },
                ]}
              >
                <Input placeholder="请输入商品名称"></Input>
              </Form.Item>
            </Col>
            <Col span={0} xl={2} />
            <Col span={12} xl={10}>
              <Form.Item
                label="商品类型"
                name="goodsType"
                // wrapperCol={{ span: 6 }}
                rules={[
                  {
                    required: true,
                    message: '商品类型不能为空',
                  },
                ]}
              >
                <Select
                  placeholder="请选择"
                  options={[
                    { value: 0, label: '实物' },
                    { value: 1, label: '券' },
                    { value: 2, label: '虚拟货物' },
                  ]}
                ></Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={32}>
            <Col span={12} xl={10}>
              <Form.Item
                label="商品头图"
                name="goodsAvatar"
                // wrapperCol={{ span: 6 }}
                rules={[
                  {
                    required: true,
                    message: '商品头图不能为空',
                  },
                ]}
              >
                <Upload
                  name="goodsAvatar"
                  listType="picture-card"
                  fileList={goodsAvatar}
                  maxCount={1}
                  action={'8.138.13.158:9088/api/common/upload'}
                  beforeUpload={() => false}
                  onChange={(info) => {
                    console.log(info)
                    // setGoodsAvatar(fileList)
                  }}
                >
                  {goodsAvatar?.length! >= 1 ? null : uploadButton}
                </Upload>
              </Form.Item>
            </Col>
            <Col span={0} xl={2} />
            <Col span={12} xl={10}>
              <Form.Item
                label="商品分类"
                name="goodsCategory"
                // wrapperCol={{ span: 6 }}
                rules={[
                  {
                    required: true,
                    message: '商品分类不能为空',
                  },
                ]}
              >
                <Select options={[{ value: 1, label: '777' }]}></Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={32}>
            <Col span={12} xl={10}>
              <Form.Item
                label="商品文字描述"
                name="goodsDesc"
                // wrapperCol={{ span: 8 }}
                rules={[
                  {
                    required: true,
                    message: '商品文字描述不能为空',
                  },
                ]}
              >
                <TextArea
                  showCount
                  maxLength={100}
                  placeholder="请输入详细文字描述，最大不超过100字"
                  style={{ height: '10rem', resize: 'none' }}
                ></TextArea>
              </Form.Item>
            </Col>
            <Col span={0} xl={2} />
            <Col span={12} xl={10}>
              <Form.Item
                label="商品详情"
                name="goodsDetail"
                // wrapperCol={{ span: 8 }}
                rules={[
                  {
                    required: true,
                    message: '商品详情不能为空',
                  },
                ]}
              >
                <TextArea
                  showCount
                  maxLength={400}
                  placeholder="请输入商品详情，最大不超过400字"
                  style={{ height: '10rem', resize: 'none' }}
                ></TextArea>
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">服务条款</Divider>
          <Row gutter={32}>
            <Col span={12} xl={10}>
              <Form.Item
                label="供应商名称"
                name="supplierName"
                // wrapperCol={{ span: 6 }}
                rules={[{ required: true, message: '供应商不能为空' }]}
              >
                <Input placeholder="请输入供应商名称"></Input>
              </Form.Item>
            </Col>
            <Col span={0} xl={2} />
            <Col span={12} xl={10}>
              <Form.Item
                label="供应商联系方式"
                name="supplierPhone"
                // wrapperCol={{ span: 6 }}
                rules={[
                  {
                    required: true,
                    message: '供应商联系方式不能为空',
                  },
                ]}
              >
                <Input placeholder="请输入供应商联系方式"></Input>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={32}>
            <Col span={12} xl={10}>
              <Form.Item
                label="服务保障"
                name="serviceGuarantee"
                // wrapperCol={{ span: 8 }}
                rules={[
                  {
                    required: true,
                    message: '服务保障不能为空',
                  },
                ]}
              >
                <TextArea
                  showCount
                  maxLength={100}
                  placeholder="请输入服务保障，最大不超过100字"
                  style={{ height: '10rem', resize: 'none' }}
                ></TextArea>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div className={styles['vip-inputs']}>
          {exchangeWaysSelectComponent()}
          <div className={styles['vip-add']}>
            <span style={{ fontSize: '.9375rem', color: 'skyblue' }}>
              添加兑换方式
            </span>
            <Select
              placeholder="请选择"
              style={{ width: '9.375rem' }}
              options={[
                { value: '0', label: '积分' },
                { value: '1', label: '积分+现金' },
                { value: '2', label: '现金' },
              ]}
              value={selectedExchangeWay}
              onChange={(value: number) => {
                setSelectedExchangeWay(value)
              }}
            ></Select>
            <Button type="primary" onClick={addExchangeWay}>
              <PlusOutlined></PlusOutlined>
            </Button>
            <span
              style={{
                color: 'red',
                fontSize: '.9375rem',
                display: showZeroWays(),
                ...textStyle,
              }}
            >
              至少要有一个兑换方式
            </span>
          </div>
        </div>
        <Divider orientation="left">快递</Divider>
        <div style={gapStyle}>
          <div style={textStyle}>不发货地区</div>
          <Button
            type="primary"
            style={{ marginTop: '1rem' }}
            onClick={showDrawer}
          >
            选择城市
          </Button>
        </div>
        <Divider orientation="left">兑换限制</Divider>
        <div style={gapStyle} className={styles['goods-num']}>
          <div className={styles['num-store']}>
            <div style={textStyle}>
              兑换上限
              <span className={styles['exchange-question']}>
                <Tooltip title="-1表示无限制，默认为-1">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            </div>
            <Input
              type="number"
              placeholder="请输入数量"
              value={exchangeLimit}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setExchangeLimit(Math.floor(+e.currentTarget.value))
              }
              style={{ width: '7.5rem' }}
            ></Input>
            <span
              style={{
                color: 'red',
                opacity: showExchangeLimit() ? 1 : 0,
                ...textStyle,
              }}
            >
              兑换上限是大于等于-1且不为0的整数
            </span>
          </div>
          <div className={styles['num-store']}>
            <div style={textStyle}>
              <span style={{ color: 'red', fontSize: '1rem' }}>*</span>
              库存
            </div>
            <Input
              type="number"
              placeholder="请输入数量"
              value={stock}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStock(Math.floor(+e.currentTarget.value))
              }
              style={{ width: '7.5rem' }}
            ></Input>
            <span
              style={{
                color: 'red',
                opacity: showStockWarnings() ? 1 : 0,
                ...textStyle,
              }}
            >
              库存应该为正数
            </span>
          </div>
        </div>
        <Divider orientation="left">投放</Divider>
        <Form layout="inline" style={gapStyle} form={form2}>
          <Form.Item
            name="startDate"
            label="上线时间"
            layout="vertical"
            rules={[{ required: true, message: '上线时间不能为空' }]}
          >
            <DatePicker showTime placeholder="请选择"></DatePicker>
          </Form.Item>
          <Form.Item
            name="endDate"
            label="下线时间"
            layout="vertical"
            rules={[{ required: true, message: '下线时间不能为空' }]}
          >
            <DatePicker showTime placeholder="请选择"></DatePicker>
          </Form.Item>
          <Form.Item name="allowCity" label="投放城市" layout="vertical">
            <Button type="primary" onClick={showDrawer}>
              选择城市
            </Button>
          </Form.Item>
        </Form>
        <Drawer title="选择城市" onClose={onClose} open={open}>
          <Tree></Tree>
        </Drawer>
        <div style={{ marginTop: '3rem', marginLeft: '6rem' }}>
          <Button type="primary" onClick={handlerCommit}>
            提交
          </Button>
          <Button style={{ marginLeft: '1.25rem' }} onClick={resetAllForm}>
            重置
          </Button>
          <Button style={{ marginLeft: '12rem' }}>暂存</Button>
        </div>
      </div>
    </>
  )
}

export default GoodsEdit
