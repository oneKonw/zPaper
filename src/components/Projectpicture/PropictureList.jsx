import React, { Component } from 'react';
import { connect } from 'dva';
import { Pagination, Input, Menu, Button } from 'antd';
import styles from './Projectpicture.css';
import biaodian from '../../assets/slider/biaodian1.png';

const Search = Input.Search;
const SubMenu = Menu.SubMenu;

function onChange(pageNumber) {
  console.log('Page: ', pageNumber);
}

class PropictureList extends Component {
  constructor(props) {
    super(props);
    this.state = { openKeys: ['sub1'] };
    this.rootSubmenuKeys = ['sub1', 'sub2', 'sub3'];
    this.onOpenChange = this.onOpenChange.bind(this);
    this.prolistvisble = this.prolistvisble.bind(this);
  }

  onOpenChange(openKeys) {
    const latestOpenKey = openKeys.find(
      (key) => this.state.openKeys.indexOf(key) === -1,
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

  prolistvisble() {
    if (this.props.agsmap.prolistflags) {
      // prepare();
      this.props.dispatch({
        type: 'agsmap/prolistChangeState',
        payload: false,
      });
      console.log(this.props.agsmap.prolistflags);
    } else {
      this.props.dispatch({
        type: 'agsmap/prolistChangeState',
        payload: true,
      });
      console.log(this.props.agsmap.prolistflags);
    }
  }

  render() {
    return (
      <div
        className={styles.modlediv}
        style={{ display: this.props.agsmap.prolistflags ? 'block' : 'none' }}
      >
        <div className={styles.listdiv}>
          <p className={styles.ptitle}>
            项目一张图<span
              className={styles.spantitle}
              onClick={this.prolistvisble}
            >
              ×
            </span>
          </p>
          <div style={{ textAlign: 'center' }}>
            <Search
              placeholder=""
              onSearch={(value) => console.log(value)}
              style={{
                width: 300,
                border: '1px solid black',
                borderRadius: '20px',
              }}
            />
          </div>

          <div>
            <div>
              <Button style={{ margin: '5px', border: '1px solid black' }}>
                金苑小区
              </Button>
              <Button style={{ margin: '5px', border: '1px solid black' }}>
                常规一些项目
              </Button>
              <Button style={{ margin: '5px', border: '1px solid black' }}>
                常规一些项目
              </Button>
            </div>
            <div>
              <Button style={{ margin: '5px', border: '1px solid black' }}>
                金苑小区
              </Button>
              <Button style={{ margin: '5px', border: '1px solid black' }}>
                常规一些项目
              </Button>
              <Button style={{ margin: '5px', border: '1px solid black' }}>
                常规一些项目
              </Button>
            </div>
          </div>
          <Menu
            mode="inline"
            openKeys={this.state.openKeys}
            onOpenChange={this.onOpenChange}
            style={{ width: 350 }}
          >
            <SubMenu
              key="sub1"
              title={
                <span>
                  <span>在审批项目</span>
                </span>
              }
              className={styles.SubMenustyle}
            >
              <div
                style={{
                  height: '70px',
                  paddingLeft: '20px',
                  borderBottom: '1px solid gray',
                  display: 'flex',
                }}
              >
                <div style={{ flex: 'auto' }}>
                  <h5 className={styles.listh5}>
                    1 &nbsp;攀枝花职工宿舍 &nbsp;二期建设
                  </h5>
                  <h6 className={styles.listh6}>
                    <span>项目类型:</span>
                    <a>在审批项目</a>
                  </h6>
                  <h6 className={styles.listh6}>
                    <span>建设单位:</span>
                    <span>绿城地产开发有限公司</span>
                  </h6>
                </div>
                <div
                  style={{
                    flex: 'auto',
                    textAlign: 'center',
                    lineHeight: '70px',
                  }}
                >
                  <a>
                    <img src={biaodian} alt="" />
                  </a>
                </div>
              </div>
              <div
                style={{
                  height: '70px',
                  paddingLeft: '20px',
                  borderBottom: '1px solid gray',
                  display: 'flex',
                }}
              >
                <div style={{ flex: 'auto' }}>
                  <h5 className={styles.listh5}>
                    1 &nbsp;攀枝花职工宿舍 &nbsp;二期建设
                  </h5>
                  <h6 className={styles.listh6}>
                    <span>项目类型:</span>
                    <a>在审批项目</a>
                  </h6>
                  <h6 className={styles.listh6}>
                    <span>建设单位:</span>
                    <span>绿城地产开发有限公司</span>
                  </h6>
                </div>
                <div
                  style={{
                    flex: 'auto',
                    textAlign: 'center',
                    lineHeight: '70px',
                  }}
                >
                  <a>
                    <img src={biaodian} alt="" />
                  </a>
                </div>
              </div>
              <div
                style={{
                  height: '70px',
                  paddingLeft: '20px',
                  borderBottom: '1px solid gray',
                  display: 'flex',
                }}
              >
                <div style={{ flex: 'auto' }}>
                  <h5 className={styles.listh5}>
                    1 &nbsp;攀枝花职工宿舍 &nbsp;二期建设
                  </h5>
                  <h6 className={styles.listh6}>
                    <span>项目类型:</span>
                    <a>在审批项目</a>
                  </h6>
                  <h6 className={styles.listh6}>
                    <span>建设单位:</span>
                    <span>绿城地产开发有限公司</span>
                  </h6>
                </div>
                <div
                  style={{
                    flex: 'auto',
                    textAlign: 'center',
                    lineHeight: '70px',
                  }}
                >
                  <a>
                    <img src={biaodian} alt="" />
                  </a>
                </div>
              </div>
              <div
                style={{
                  height: '70px',
                  paddingLeft: '20px',
                  borderBottom: '1px solid gray',
                  display: 'flex',
                }}
              >
                <div style={{ flex: 'auto' }}>
                  <h5 className={styles.listh5}>
                    1 &nbsp;攀枝花职工宿舍 &nbsp;二期建设
                  </h5>
                  <h6 className={styles.listh6}>
                    <span>项目类型:</span>
                    <a>在审批项目</a>
                  </h6>
                  <h6 className={styles.listh6}>
                    <span>建设单位:</span>
                    <span>绿城地产开发有限公司</span>
                  </h6>
                </div>
                <div
                  style={{
                    flex: 'auto',
                    textAlign: 'center',
                    lineHeight: '70px',
                  }}
                >
                  <a>
                    <img src={biaodian} alt="" />
                  </a>
                </div>
              </div>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <span>未审批项目</span>
                </span>
              }
              className={styles.SubMenustyle}
            >
              <div
                style={{
                  height: '70px',
                  paddingLeft: '20px',
                  borderBottom: '1px solid gray',
                  display: 'flex',
                }}
              >
                <div style={{ flex: 'auto' }}>
                  <h5 className={styles.listh5}>
                    1 &nbsp;攀枝花职工宿舍 &nbsp;二期建设
                  </h5>
                  <h6 className={styles.listh6}>
                    <span>项目类型:</span>
                    <a>在审批项目</a>
                  </h6>
                  <h6 className={styles.listh6}>
                    <span>建设单位:</span>
                    <span>绿城地产开发有限公司</span>
                  </h6>
                </div>
                <div
                  style={{
                    flex: 'auto',
                    textAlign: 'center',
                    lineHeight: '70px',
                  }}
                >
                  <a>
                    <img src={biaodian} alt="" />
                  </a>
                </div>
              </div>
              <div
                style={{
                  height: '70px',
                  paddingLeft: '20px',
                  borderBottom: '1px solid gray',
                  display: 'flex',
                }}
              >
                <div style={{ flex: 'auto' }}>
                  <h5 className={styles.listh5}>
                    1 &nbsp;攀枝花职工宿舍 &nbsp;二期建设
                  </h5>
                  <h6 className={styles.listh6}>
                    <span>项目类型:</span>
                    <a>在审批项目</a>
                  </h6>
                  <h6 className={styles.listh6}>
                    <span>建设单位:</span>
                    <span>绿城地产开发有限公司</span>
                  </h6>
                </div>
                <div
                  style={{
                    flex: 'auto',
                    textAlign: 'center',
                    lineHeight: '70px',
                  }}
                >
                  <a>
                    <img src={biaodian} alt="" />
                  </a>
                </div>
              </div>
              <div
                style={{
                  height: '70px',
                  paddingLeft: '20px',
                  borderBottom: '1px solid gray',
                  display: 'flex',
                }}
              >
                <div style={{ flex: 'auto' }}>
                  <h5 className={styles.listh5}>
                    1 &nbsp;攀枝花职工宿舍 &nbsp;二期建设
                  </h5>
                  <h6 className={styles.listh6}>
                    <span>项目类型:</span>
                    <a>在审批项目</a>
                  </h6>
                  <h6 className={styles.listh6}>
                    <span>建设单位:</span>
                    <span>绿城地产开发有限公司</span>
                  </h6>
                </div>
                <div
                  style={{
                    flex: 'auto',
                    textAlign: 'center',
                    lineHeight: '70px',
                  }}
                >
                  <a>
                    <img src={biaodian} alt="" />
                  </a>
                </div>
              </div>
              <div
                style={{
                  height: '70px',
                  paddingLeft: '20px',
                  borderBottom: '1px solid gray',
                  display: 'flex',
                }}
              >
                <div style={{ flex: 'auto' }}>
                  <h5 className={styles.listh5}>
                    1 &nbsp;攀枝花职工宿舍 &nbsp;二期建设
                  </h5>
                  <h6 className={styles.listh6}>
                    <span>项目类型:</span>
                    <a>在审批项目</a>
                  </h6>
                  <h6 className={styles.listh6}>
                    <span>建设单位:</span>
                    <span>绿城地产开发有限公司</span>
                  </h6>
                </div>
                <div
                  style={{
                    flex: 'auto',
                    textAlign: 'center',
                    lineHeight: '70px',
                  }}
                >
                  <a>
                    <img src={biaodian} alt="" />
                  </a>
                </div>
              </div>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={
                <span>
                  <span>已审批项目</span>
                </span>
              }
              className={styles.SubMenustyle}
            >
              <div
                style={{
                  height: '70px',
                  paddingLeft: '20px',
                  borderBottom: '1px solid gray',
                  display: 'flex',
                }}
              >
                <div style={{ flex: 'auto' }}>
                  <h5 className={styles.listh5}>
                    1 &nbsp;攀枝花职工宿舍 &nbsp;二期建设
                  </h5>
                  <h6 className={styles.listh6}>
                    <span>项目类型:</span>
                    <a>在审批项目</a>
                  </h6>
                  <h6 className={styles.listh6}>
                    <span>建设单位:</span>
                    <span>绿城地产开发有限公司</span>
                  </h6>
                </div>
                <div
                  style={{
                    flex: 'auto',
                    textAlign: 'center',
                    lineHeight: '70px',
                  }}
                >
                  <a>
                    <img src={biaodian} alt="" />
                  </a>
                </div>
              </div>
              <div
                style={{
                  height: '70px',
                  paddingLeft: '20px',
                  borderBottom: '1px solid gray',
                  display: 'flex',
                }}
              >
                <div style={{ flex: 'auto' }}>
                  <h5 className={styles.listh5}>
                    1 &nbsp;攀枝花职工宿舍 &nbsp;二期建设
                  </h5>
                  <h6 className={styles.listh6}>
                    <span>项目类型:</span>
                    <a>在审批项目</a>
                  </h6>
                  <h6 className={styles.listh6}>
                    <span>建设单位:</span>
                    <span>绿城地产开发有限公司</span>
                  </h6>
                </div>
                <div
                  style={{
                    flex: 'auto',
                    textAlign: 'center',
                    lineHeight: '70px',
                  }}
                >
                  <a>
                    <img src={biaodian} alt="" />
                  </a>
                </div>
              </div>
              <div
                style={{
                  height: '70px',
                  paddingLeft: '20px',
                  borderBottom: '1px solid gray',
                  display: 'flex',
                }}
              >
                <div style={{ flex: 'auto' }}>
                  <h5 className={styles.listh5}>
                    1 &nbsp;攀枝花职工宿舍 &nbsp;二期建设
                  </h5>
                  <h6 className={styles.listh6}>
                    <span>项目类型:</span>
                    <a>在审批项目</a>
                  </h6>
                  <h6 className={styles.listh6}>
                    <span>建设单位:</span>
                    <span>绿城地产开发有限公司</span>
                  </h6>
                </div>
                <div
                  style={{
                    flex: 'auto',
                    textAlign: 'center',
                    lineHeight: '70px',
                  }}
                >
                  <a>
                    <img src={biaodian} alt="" />
                  </a>
                </div>
              </div>
              <div
                style={{
                  height: '70px',
                  paddingLeft: '20px',
                  borderBottom: '1px solid gray',
                  display: 'flex',
                }}
              >
                <div style={{ flex: 'auto' }}>
                  <h5 className={styles.listh5}>
                    1 &nbsp;攀枝花职工宿舍 &nbsp;二期建设
                  </h5>
                  <h6 className={styles.listh6}>
                    <span>项目类型:</span>
                    <a>在审批项目</a>
                  </h6>
                  <h6 className={styles.listh6}>
                    <span>建设单位:</span>
                    <span>绿城地产开发有限公司</span>
                  </h6>
                </div>
                <div
                  style={{
                    flex: 'auto',
                    textAlign: 'center',
                    lineHeight: '70px',
                  }}
                >
                  <a>
                    <img src={biaodian} alt="" />
                  </a>
                </div>
              </div>
            </SubMenu>
          </Menu>
          <div className={styles.footdiv}>
            <span className={styles.dataspan}>共100个项目</span>
            <Pagination
              defaultCurrent={1}
              defaultPageSize={10}
              pageSize={1}
              total={100}
              size="small"
              onChange={onChange}
              style={{ width: '300px', display: 'inline-block' }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ agsmap }) => {
  return {
    agsmap,
  };
})(PropictureList);
