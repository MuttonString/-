import React, { useState, useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
  Popconfirm,
  UploadFile,
  Row,
  Col,
} from 'antd'
import {
  PlusOutlined,
  QuestionCircleOutlined,
  LeftOutlined,
} from '@ant-design/icons'
import { nanoid } from 'nanoid'
import axios from 'axios'
import dayjs from 'dayjs'
import { requestAllCategory, requestAddGoods, requestUpdateGoods } from '@/api/goodsEdit'
import styles from './index.module.less'
import type { AppendGoods, SingleProRule } from '@/api/goodsEdit/type'
import type { VipInputType } from './VipInput/type'
import type { CitiesInTree, AreaData } from './type'
import type { SingleCategory } from '@/api/goodsEdit/type'
import VipInput from './VipInput'
import convertCities from '@/utils/covertCities'
import getChildCategoryLists from '@/utils/traverseCategoryList'
import { GoodsDetailData } from '@/api/goodsDetail/type'
import { reqGoodsDetail } from '@/api/goodsDetail'

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

const provinceKeys: React.Key[] = Array.from({ length: 35 }, (_, i) =>
  (i + 1).toString()
)

const GoodsEdit: React.FC = () => {
  const [goodsExchangeWays, setGoodsExchangeWays] = useState<VipInputType[]>([]) //兑换方式状态管理
  const [selectedExchangeWay, setSelectedExchangeWay] = useState<
    'CASH' | 'INTEGRAL' | 'INTEGRAL_AND_CASH'
  >() //当前选中要添加的兑换方式
  const [isValiExchange, setIsValiExchange] = useState<boolean>(false) //显示是否提交校验过兑换方式
  const [open1, setOpen1] = useState<boolean>(false) //控制不发货城市抽屉显隐
  const [open2, setOpen2] = useState<boolean>(false) //控制投发城市抽屉显隐
  const [stock, setStock] = useState<number>() //库存数量
  const [exchangeLimit, setExchangeLimit] = useState<number>() //兑换限制
  const [goodsAvatar, setGoodsAvatar] = useState<string>('') //商品头图
  const [totalCommit, setTotalCommit] = useState<AppendGoods>() //总提交项，校验通过生成
  const [citiesTree, setCitesTree] = useState<CitiesInTree[]>() //城市在Tree里面的展示
  const [selectedNonCities, setSelectedNonCities] = useState<React.Key[]>() //选择的不发货城市
  const [selectedYesCities, setSelectedYesCities] = useState<React.Key[]>() //选择的投放城市
  const [childCategoryList, setChildCategoryList] = useState<SingleCategory[]>() //节点分类
  const [status, setStatus] = useState<number>() //设置当前页状态 1.新增 2.更新 3.草稿
  const [fileList, setFileList] = useState<UploadFile[]>([])

  // 返回上一页
  const navigate = useNavigate()

  //鉴别是新增还是更新页面
  const params = useParams()

  // 查看商品status，鉴别是否正常，异常路由到404
  if (params.status && (+params.status > 6 || +params.status < 0)) {
    navigate('/404')
  }

  // 两个form表单数据绑定
  const [form1] = Form.useForm()
  const [form2] = Form.useForm()

  // 初始取得要初始化的数据
  useEffect(() => {
    if (params.id) {
      setStatus(2)
      reqGoodsDetail(params.id).then((res) => {
        if (res) {
          setBackShow(res)
        }
      })
    } else {
      setStatus(1)
    }
    axios.get('/src/assets/json/cities.json').then((res) => {
      const cities: AreaData = res.data
      const formedTreeCities: CitiesInTree[] = convertCities(cities)
      setCitesTree(formedTreeCities)
    })
    requestAllCategory().then((res) => {
      if (!res) return
      const childCategoryList: SingleCategory[] = getChildCategoryLists(res)
      setChildCategoryList(childCategoryList)
    })
  }, [])

  // 完成校验收集到数据之后准备发送请求
  useEffect(() => {
    if (totalCommit) {
      if (status === 2) {
        requestUpdateGoods(totalCommit).then((res) => {
          if(res) {
            message.success('修改成功')
            navigate(-1)
          }
        })
        return
      }
      requestAddGoods(totalCommit).then((res) => {
        if (res && res?.length > 0) {
          message.success('新增成功')
          navigate(-1)
        }
      })
    }
  }, [totalCommit])

  const [messageApi, contextHolder] = message.useMessage() //message消息提示导入

  const error = (msg: string) => {
    messageApi.open({
      type: 'error',
      content: msg,
    })
  }

  const showDrawer1 = () => {
    setOpen1(true)
  }

  const onClose1 = () => {
    setOpen1(false)
  }

  const showDrawer2 = () => {
    setOpen2(true)
  }

  const onClose2 = () => {
    setOpen2(false)
  }

  // 改变子兑换为生效的状态
  const ableGoodsExchangeWays = (updateWay: VipInputType) => {
    for (let i = 0; i < goodsExchangeWays.length; i++) {
      if (goodsExchangeWays[i].typeNum == updateWay.typeNum) {
        goodsExchangeWays[i].isAble = updateWay.isAble
        goodsExchangeWays[i].cash = updateWay.cash * 100 || 0
        goodsExchangeWays[i].score = updateWay.score || '0'
        break
      }
    }
  }
  // 让子兑换删除兑换方式
  const delGoodsExchangeWays = (
    typeNum: 'CASH' | 'INTEGRAL' | 'INTEGRAL_AND_CASH'
  ) => {
    const newWays = goodsExchangeWays.filter(
      (way: VipInputType) => way.typeNum != typeNum
    )
    setGoodsExchangeWays(newWays)
  }
  //添加新的兑换方式
  const addExchangeWay = () => {
    if (!selectedExchangeWay) {
      error('你还未选择要填加的兑换方式')
      return
    }
    if (
      goodsExchangeWays.find(
        (way: VipInputType) => way.typeNum == selectedExchangeWay
      )
    ) {
      error('兑换方式已存在')
      return
    }
    const newWay: VipInputType = {
      id: nanoid(),
      typeNum: selectedExchangeWay,
      score: '-1',
      cash: -1,
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
          propCash={way.cash}
          propScore={way.score}
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
    } catch (er) {
      error('存在不合理字段')
      isThrow = true
      console.log(er)
    } finally {
      try {
        await form2.validateFields()
      } catch (er) {
        console.log(er)
      }
    }
    //更改校验状态，自定义表单将自动校验
    setIsValiExchange(true)
    //更改兑换方式列表初始化值，以提醒字段校验
    changeInitialWays()
    // 上线时间不能晚于下线时间
    if (form2.getFieldValue('startDate') > form2.getFieldValue('endDate')) {
      error('上线时间不能大于下线时间')
    }
    if (isThrow) return
    if (showZeroWays(true) === 'inline') {
      error('存在不合理字段')
      return
    }
    if (showStockWarnings(true) === true) {
      error('存在不合理字段')
      return
    }
    //检验所有兑换方式是否合法
    for (let i = 0; i < goodsExchangeWays.length; i++) {
      if (!goodsExchangeWays[i].isAble) {
        error('存在不合理字段')
        return
      }
    }
    if (goodsAvatar === '') {
      error('商品头图上传出错')
      return
    }
    collectForm()
  }
  //校验图片文件上传是否超过5MB, 是否非图片类型
  const valiAvatar = (file: any) => {
    if (!file?.type.includes('image')) {
      error('商品头图格式错误')
      return false
    }
    if (file?.size >= 5 * 1024 * 1024) {
      error(`商品头图大小不能超过5MB【${file?.size}】`)
      return false
    }
    return true
  }

  // 对整个表单数据进行收集
  const collectForm = () => {
    //收集兑换方式数组
    const resExchangeWays: SingleProRule[] = goodsExchangeWays.map(
      (way: VipInputType) => {
        return {
          priceType: way.typeNum,
          cash: +way.cash,
          integral: way.score,
        }
      }
    )
    const allData: AppendGoods = {
      proName: form1.getFieldValue('goodsName'),
      poster: goodsAvatar,
      proDesc: form1.getFieldValue('goodsDesc'),
      proType: form1.getFieldValue('goodsType'),
      // detail: form1.getFieldValue('goodsDetail'),
      categoryId: form1.getFieldValue('goodsCategory'),
      supplierName: form1.getFieldValue('supplierName'),
      supplierPhone: form1.getFieldValue('supplierPhone'),
      guarantee: form1.getFieldValue('serviceGuarantee'),
      proRules: resExchangeWays,
      nonShippingRegion:
        selectedNonCities && selectedNonCities.length > 0
          ? selectedNonCities.join()
          : '',
      exchangeCap: exchangeLimit || -1,
      stock: stock!,
      startTime: form2
        .getFieldValue('startDate')
        .format('YYYY-MM-DD HH:mm:ss'),
      endTime: form2.getFieldValue('endDate').format('YYYY-MM-DD HH:mm:ss'),
      shippingRegion:
        selectedYesCities && selectedYesCities.length > 0
          ? selectedYesCities.join()
          : '216',
    }
    if(status === 2) {
      console.log(params.id)
      setTotalCommit({...allData, id: params.id})
      return
    }
    setTotalCommit(allData)
  }

  // 重置所有表单项
  const resetAllForm = () => {
    form1.resetFields()
    form2.resetFields()
    setIsValiExchange(false)
    setGoodsExchangeWays([])
    setFileList([])
  }

  // 设置回显数据
  const setBackShow = (backData: GoodsDetailData) => {
    form1.setFieldValue('goodsName', backData.proName)
    setGoodsAvatar(backData.poster)
    setFileList([
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: backData.poster
      }
    ])
    form1.setFieldValue('goodsDesc', backData.proDesc)
    form1.setFieldValue('goodsType', backData.proType)
    form1.setFieldValue('goodsCategory', backData.categoryId)
    form1.setFieldValue('supplierName', backData.supplierName)
    form1.setFieldValue('supplierPhone', backData.supplierPhone)
    form1.setFieldValue('serviceGuarantee', backData.guarantee)
    setGoodsExchangeWays(backData.proRules.map((rule): VipInputType => {
      return {id: nanoid(), typeNum: rule.priceType, score: rule.integral, cash: rule.cash / 100, isAble: true, isInitial: false}
    }))
    setSelectedNonCities(backData.nonShippingRegion.split(','))
    setExchangeLimit(backData.exchageCap)
    setStock(backData.stock)
    form2.setFieldValue('startDate', dayjs(backData.startTime))
    form2.setFieldValue('endDate', dayjs(backData.endTime))
    setSelectedYesCities(backData.shippingRegion?.split(','))
  }

  return (
    <>
      {contextHolder}
      <div className={styles.main}>
        <div className={styles.return} onClick={() => navigate(-1)}>
          <LeftOutlined />
          &nbsp;<span>返回上一页</span>
        </div>
        <Form
          // labelCol={{ span: 4 }}
          style={{ maxWidth: 'none', marginTop: '1.25rem' }}
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
                    { value: '实物', label: '实物' },
                    { value: '券', label: '券' },
                    { value: '虚拟货物', label: '虚拟货物' },
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
                /* rules={[
                  {
                    required: true,
                    message: '商品头图不能为空',
                  },
                ]} */
              >
                <Upload
                  name="file"
                  listType="picture-card"
                  maxCount={1}
                  action={'/api/common/upload'}
                  headers={{
                    token: localStorage.getItem('token') || '',
                    refreshToken: localStorage.getItem('refreshToken') || '',
                  }}
                  beforeUpload={(file: UploadFile) => {
                    valiAvatar(file)
                  }}
                  fileList={fileList}
                  onChange={(info) => {
                    setFileList(info.fileList)
                    if (
                      info.file.status === 'done' &&
                      info.file.response?.code !== 200
                    ) {
                      message.error(
                        `${info.file.response?.msg}(${info.file.response?.code})`
                      )
                      return
                    }
                    if (
                      info.file.status === 'done' &&
                      info.file.response.code === 200
                    ) {
                      // 确保响应中包含预期的URL字段，这里假设服务器返回的结构中有一个名为url的键
                      const url = info.file.response?.data
                      if (url) {
                        console.log('服务器返回的文件URL:', url)
                        setGoodsAvatar(url)
                        // 在这里可以进一步处理URL，例如存储到状态中、显示预览等
                      } else {
                        console.warn('服务器响应中没有找到URL')
                      }
                    } else if (info.file.status === 'error') {
                      // 处理上传错误的情况
                      message.error('文件上传失败')
                    }
                  }}
                >
                  {uploadButton}
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
                <Select
                  options={childCategoryList?.map((item: SingleCategory) => {
                    return { value: item.id, label: item.name }
                  })}
                  placeholder="请选择"
                ></Select>
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
            {/* <Col span={0} xl={2} />
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
            </Col> */}
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
                { value: 'INTEGRAL', label: '积分' },
                { value: 'INTEGRAL_AND_CASH', label: '积分+现金' },
                { value: 'CASH', label: '现金' },
              ]}
              value={selectedExchangeWay}
              onChange={(value: 'CASH' | 'INTEGRAL' | 'INTEGRAL_AND_CASH') => {
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
            onClick={showDrawer1}
          >
            选择城市
          </Button>
          <Tooltip title="默认值为空">
            <QuestionCircleOutlined
              style={{ marginLeft: '.5rem', fontSize: '1rem' }}
            />
          </Tooltip>
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
            <div>
              <Button type="primary" onClick={showDrawer2}>
                选择城市
              </Button>
              <Tooltip title="默认值为长沙">
                <QuestionCircleOutlined
                  style={{ marginLeft: '.5rem', fontSize: '1rem' }}
                />
              </Tooltip>
            </div>
          </Form.Item>
        </Form>
        <Drawer title="选择城市" onClose={onClose1} open={open1}>
          <Tree
            checkable
            treeData={citiesTree}
            checkedKeys={selectedNonCities}
            onCheck={(checkedKeysValue) => {
              if (Array.isArray(checkedKeysValue)) {
                const filtered: React.Key[] = checkedKeysValue.filter(
                  (item) => {
                    return !provinceKeys.includes(item)
                  }
                )
                setSelectedNonCities(filtered)
              }
            }}
            onSelect={(selectedValue) => {
              if (Array.isArray(selectedValue)) {
                const filtered: React.Key[] = selectedValue.filter((item) => {
                  return !provinceKeys.includes(item)
                })
                setSelectedNonCities(filtered)
              }
            }}
          ></Tree>
        </Drawer>
        <Drawer title="选择城市" onClose={onClose2} open={open2}>
          <Tree
            checkable
            treeData={citiesTree}
            checkedKeys={selectedYesCities}
            onCheck={(checkedKeysValue) => {
              if (Array.isArray(checkedKeysValue)) {
                const filtered: React.Key[] = checkedKeysValue.filter(
                  (item) => {
                    return !provinceKeys.includes(item)
                  }
                )
                setSelectedYesCities(filtered)
              }
            }}
            onSelect={(selectedValue) => {
              if (Array.isArray(selectedValue)) {
                const filtered: React.Key[] = selectedValue.filter((item) => {
                  return !provinceKeys.includes(item)
                })
                setSelectedYesCities(filtered)
              }
            }}
          ></Tree>
        </Drawer>
        <div style={{ marginTop: '3rem', marginLeft: '6rem' }}>
          <Popconfirm title="你确定要提交吗？" onConfirm={handlerCommit}>
            <Button type="primary">
              提交
            </Button>
          </Popconfirm>
          <Button style={{ marginLeft: '1.25rem' }} onClick={resetAllForm}>
            重置
          </Button>
          <Button style={{ marginLeft: '12rem', display: status === 1 ? 'inline' : 'none' }}>暂存</Button>
        </div>
      </div>
    </>
  )
}

export default GoodsEdit
