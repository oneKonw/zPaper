import React, { Component, PropTypes } from 'react';
import { Form, Input, Icon } from 'antd';
// import { formItemLayout } from '../../../../constants/constants';
import styles from './FromLoadSys.less';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};

const CustomerForm = ({
  form: {
    getFieldDecorator,
  }
}) => {

  // let { customerName, contactPeople, contactPhone, address, mem, accountName, accountBank, accountNo } = customer;

  return (
    <div >
      <Form layout='horizontal'>
      <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名' }],
          })(
            <Input size="large" className={styles.inputUserData} prefix={<Icon type="user" className={styles.iconUserData} />} placeholder="Username" />
          )}
        </Form.Item>
        <FormItem >
          {
            getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入密码！'
                }
              ]
            })(
              <Input size="large" className={styles.inputUserData} prefix={<Icon type="lock"className={styles.iconUserData} />} type="password" placeholder="Password" />
              )
          }
        </FormItem>
      </Form>
    </div>
  );
};

export default Form.create()(CustomerForm);
