import React from 'react';
import { Input } from 'antd';
import { connect } from 'dva';

import styles from './LoginPage.css';
import logoSrc from '../assets/logobig.png';

class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.dispatch({
      type: 'user/login',
      payload: {
        username: this.state.username,
        password: this.state.password,
      },
    });
  }

  handleUserInput(e) {
    this.setState({
      username: e.target.value,
    });
  }

  handlePasswordInput(e) {
    this.setState({
      password: e.target.value,
    });
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.formWrapper}>
          <div className={styles.banner}>
            <img alt="" src={logoSrc} className={styles.logo} />
            <h1 className={styles.bannerTitle}>易智瑞三维展示系统</h1>
          </div>
          <div className={styles.formContainer}>
            <div className={styles.title}>欢迎登录系统</div>
            <div className={styles.formContent}>
              {/* <button className={styles.signupBtn}>用户注册</button> */}
              {/* <div className={styles.separator}>
                <span className={styles.separatorContent}>or</span>
              </div> */}
              <div>
                <form onSubmit={this.handleSubmit}>
                  <div className={styles.formGroup}>
                    <div className={styles.formControls}>
                      <Input
                        className={styles.inputControl}
                        placeholder="用户名"
                        value={this.state.username}
                        onChange={this.handleUserInput}
                      />
                      <div className={styles.formErrors} />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <div className={styles.formControls}>
                      <Input
                        className={styles.inputControl}
                        type="password"
                        placeholder="密码"
                        value={this.state.password}
                        onChange={this.handlePasswordInput}
                      />
                      <div className={styles.formErrors} />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <input className={styles.submitBtn} type="submit" value="登录" />
                  </div>
                </form>
                {/* <div className={styles.terms}>
                  通过点击用户注册按钮通常意味着您接受本站的所有服务条款
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ user }) => {
  return {
    user,
  };
})(LoginPage);
