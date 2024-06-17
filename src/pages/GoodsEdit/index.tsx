import React from 'react'
import { Form, Input, Divider, Upload, Select, Button, TreeSelect, DatePicker } from 'antd'
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import VipInput from './VipInput'

/* 全局编辑或新增界面 */

const TextArea = Input.TextArea

const textStyle: React.CSSProperties = {
  fontSize: '.875rem'
}

const gapStyle: React.CSSProperties = {
  marginLeft: '6rem'
}

const GoodsEdit: React.FC = () => {
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )
  return (
    <>
      <div className={styles.main}>
        <Form labelCol={{ span: 4 }} style={{ maxWidth: 'none' }} >
          <Divider orientation="left">基本信息</Divider>
          <Form.Item label="商品名称" name="goodsName" wrapperCol={{ span: 6 }}>
            <Input placeholder="请输入商品名称"></Input>
          </Form.Item>
          <Form.Item
            label="商品头图"
            name="goodsAvatar"
            wrapperCol={{ span: 6 }}
          >
            <Upload name="goodsAvatar" listType="picture-card">
              {uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item
            label="商品文字描述"
            name="goodsDesc"
            wrapperCol={{ span: 8 }}
          >
            <TextArea
              showCount
              maxLength={100}
              placeholder="请输入详细文字描述，最大不超过100字"
              style={{ height: '10rem', resize: 'none' }}
            ></TextArea>
          </Form.Item>
          <Form.Item label="商品类型" name="goodsType" wrapperCol={{ span: 6 }}>
            <Select placeholder="请选择"></Select>
          </Form.Item>
          <Form.Item
            label="商品详情"
            name="goodsDetail"
            wrapperCol={{ span: 8 }}
          >
            <TextArea
              showCount
              maxLength={400}
              placeholder="请输入商品详情，最大不超过400字"
              style={{ height: '10rem', resize: 'none' }}
            ></TextArea>
          </Form.Item>
          <Form.Item
            label="商品分类"
            name="goodsCategory"
            wrapperCol={{ span: 6 }}
          >
            <TreeSelect placeholder="请选择"></TreeSelect>
          </Form.Item>
          <Divider orientation="left">服务条款</Divider>
          <Form.Item
            label="供应商名称"
            name="supplierName"
            wrapperCol={{ span: 6 }}
          >
            <Input placeholder="请输入供应商名称"></Input>
          </Form.Item>
          <Form.Item
            label="供应商联系方式"
            name="supplierPhone"
            wrapperCol={{ span: 6 }}
          >
            <Input placeholder="请输入供应商联系方式"></Input>
          </Form.Item>
          <Form.Item
            label="服务保障"
            name="serviceGuarantee"
            wrapperCol={{ span: 8 }}
          >
            <TextArea
              showCount
              maxLength={100}
              placeholder="请输入服务保障，最大不超过100字"
              style={{ height: '10rem', resize: 'none' }}
            ></TextArea>
          </Form.Item>
        </Form>
        <div className={styles['vip-inputs']}>
          <VipInput></VipInput>
          <div className={styles['vip-add']}>
            <span style={{fontSize: '.9375rem', color: 'skyblue'}}>添加兑换方式</span>
            <Select 
              placeholder="请选择"
              style={{width: '9.375rem'}}
              options={[
                { value: '0', label: '积分' },
                { value: '1', label: '积分+现金' }, 
                { value: '2', label: '现金' } 
              ]}
            ></Select>
            <Button type='primary'><PlusOutlined></PlusOutlined></Button>
          </div>
        </div>
        <Divider orientation='left'>快递</Divider>
        <div style={gapStyle}>
          <div style={textStyle}>不发货地区</div>
          <Button type='primary' style={{marginTop: '1rem'}}>选择城市</Button>
        </div>
        <Divider orientation='left'>兑换限制</Divider>
        <div style={gapStyle}>
          <div style={textStyle}>兑换上限<span className={styles['exchange-question']}><QuestionCircleOutlined /></span></div>
          <Input type='number' placeholder='请输入数量' style={{width: '7.5rem', marginTop: '1rem'}}></Input> 
        </div>
        <Divider orientation='left'>投放</Divider>
        <Form
          layout='inline'
          style={gapStyle}
        >
          <Form.Item name='startDate' label='上线时间' layout='vertical'>
            <DatePicker></DatePicker>
          </Form.Item>
          <Form.Item name='endDate' label='下线时间' layout='vertical'>
            <DatePicker></DatePicker>
          </Form.Item>
          <Form.Item name='allowCity' label='投放城市' layout='vertical'>
            <Button type='primary'>选择城市</Button>
          </Form.Item>
        </Form>
        <div style={{marginTop: '1.25rem', marginLeft: '4.2rem'}}>
          <Button type='primary'>提交</Button>
          <Button style={{marginLeft: '1.25rem'}}>重置</Button>
        </div>
      </div>
    </>
  )
}

export default GoodsEdit
