import { Button } from 'antd';
import React from 'react';
import styles from './WidgetButtons.css';
import Point from 'esri/geometry/Point';
import mapUtils from '../../utils/map';
import { Tooltip } from 'antd';



class Goto extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      
    };
    this.searchMap = this.searchMap.bind(this);
    this.closeSlt = this.closeSlt.bind(this);
    this.openSlt = this.openSlt.bind(this);
  }
  openSlt() {
	document.getElementById('xyss').style.display = "block"
} 
closeSlt() {
	document.getElementById('xyss').style.display = "none"
}
searchMap(){
    var jd = document.getElementById('x').value;
    var wd = document.getElementById('y').value;
    console.log(jd,wd);
    const view = mapUtils.getSceneView();
    view.goTo({
          center: new Point({
            longitude: jd,
            latitude: wd,
          }),
          heading: view.camera.heading,
          tilt: view.camera.tilt,
          zoom: 9,
        });
}
render() {
    return (
      <div>
        <Tooltip placement="left" title="定位">
        <a className={styles.btn} onClick={this.openSlt}>
        <span className="esri-icon-search"/>
        </a>
        </Tooltip>
            <div id="xyss" className={styles.xyss}>
                <h5 className={styles.xyss_h5}><i className={styles.xyss_i}>地理定位</i><span className={styles.xyss_span} onClick={this.closeSlt}>×</span></h5>
                <div className={styles.xyss_inp1}><label>经度<input type="text" id="x" placeholder="162.11" className={styles.xyss_inp}/></label></div>
                <div className={styles.xyss_inp2}><label>纬度<input type="text" id="y" placeholder="42.11" className={styles.xyss_inp}/></label></div>
                
                <button className={styles.xyss_btn1} onClick={this.searchMap}>搜索</button>
            </div>
      </div>
    )
  }


}



  export default Goto;