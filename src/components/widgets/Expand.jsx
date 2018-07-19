import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import ExpandViewModel from 'esri/widgets/Expand/ExpandViewModel';
import Widget from 'esri/widgets/Widget';

import { Tooltip } from 'antd';

import styles from './WidgetButtons.css';

const CSS = {
  base: 'esri-expand esri-widget',
  container: 'esri-expand__container',
  containerExpanded: 'esri-expand__container--expanded',
  panel: 'esri-expand__panel',
  button: 'esri-widget-button',
  text: 'esri-icon-font-fallback-text',
  icon: 'esri-collapse__icon',
  iconExpanded: 'esri-expand__icon--expanded',
  iconNumber: 'esri-expand__icon-number',
  iconNumberExpanded: 'esri-expand__icon-number--expanded',
  expandIcon: 'esri-icon-expand',
  collapseIcon: 'esri-icon-collapse',
  content: 'esri-expand__content',
  contentExpanded: 'esri-expand__content--expanded',
  expandMask: 'esri-expand__mask',
  expandMaskExpanded: 'esri-expand__mask--expanded',
};

function isWidget(value) {
  return value && value.isInstanceOf && value.isInstanceOf(Widget);
}

function isWidgetBase(value) {
  // naive type check

  return (
    value &&
    typeof value.postMixInProperties === 'function' &&
    typeof value.buildRendering === 'function' &&
    typeof value.postCreate === 'function' &&
    typeof value.startup === 'function'
  );
}

class Expand extends Component {
  // static defaultProps = {
  //   view: {},
  // }

  // static propTypes = {
  //   view: PropTypes.object,
  // }

  constructor(props) {
    super(props);
    this.state = {
      vm: new ExpandViewModel(),
      expanded: false,
    };
    this.toggle = this.toggle.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  componentDidMount() {
    this.renderContent();
    this.props.view.when((view) => {
      this.state.vm.view = view;
    });
    // this.getUllist();
  }

  // getUllist() {
  //   const ullist = document.getElementsByClassName('123445')[0];

  //   if (ullist) {
  //     setTimeout(() => {
  //       // const ullists = ullist.childNodes[0].querySelector(
  //       //   '.esri-basemap-gallery__item-container',
  //       // );
  //       // console.log(ullist.childNodes[0].childNodes[0].childNodes[0]);
  //       for (const liitems of ullist.childNodes[0].childNodes[0].childNodes) {
  //         console.log(liitems.title);
  //         liitems.style.display = 'none';
  //         if (liitems.title === '天地图全球影像图') {
  //           console.log(liitems);
  //           liitems.style.display = 'flex';
  //         }
  //         if (liitems.title === '天地图全球矢量图') {
  //           console.log(liitems);
  //           liitems.style.display = 'flex';
  //         }
  //       }
  //       // console.log(ullists);
  //       console.log(this);
  //     }, 3000);
  //   }
  // }
  toggle() {
    this.state.vm.expanded = !this.state.vm.expanded;
    this.setState({
      expanded: this.state.vm.expanded,
    });
  }

  attachToNode(node) {
    const content = this;
    node.appendChild(content);
  }

  renderContent() {
    const content = this.props.content;
    const div = this.contentDom;
    if (this.props.contentClass) {
      div.className = this.props.contentClass;
    }
    // console.log(div);
    // this.getUllist();
    if (typeof content === 'string') {
      div.innerHTML = content;
    }

    if (isWidget(content)) {
      div.appendChild(content.render());
    }

    if (content instanceof HTMLElement) {
      div.appendChild(content);
    }

    if (isWidgetBase(content)) {
      div.appendChild(content.domNode);
    }
  }

  render() {
    const expanded = this.state.expanded;

    const collapseIconClass = this.props.collapseIconClass || CSS.collapseIcon;
    const expandIconClass = this.props.expandIconClass || CSS.expandIcon;
    const expandIconClasses = expanded
      ? `${CSS.icon} ${CSS.iconExpanded} ${collapseIconClass}`
      : `${CSS.icon} ${expandIconClass}`;
    return (
      <div>
        <div
          className={
            expanded
              ? `${CSS.container} ${CSS.containerExpanded}`
              : CSS.container
          }
        >
          <div className={CSS.panel}>
            <Tooltip placement="left" title={this.props.title || '图层列表'}>
              <a className={styles.btn} onClick={this.toggle}>
                <span aria-hidden="true" className={expandIconClasses} />
              </a>
            </Tooltip>
          </div>
          <div
            className={
              expanded ? `${CSS.content} ${CSS.contentExpanded}` : CSS.content
            }
          >
            <div
              ref={(node) => {
                this.contentDom = node;
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Expand;
