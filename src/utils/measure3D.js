import DirectLineMeasurement3D from 'esri/widgets/DirectLineMeasurement3D';
import AreaMeasurement3D from 'esri/widgets/AreaMeasurement3D';

class Measure_line_3d {
  constructor(view) {
    this.sceneView = view;
    this.state = {
      over: false,
      deactivate: false,
    };
  }
  Measureline() {
    this.mapView.when(view => {

    });
    const directLineMeasurement3D = new DirectLineMeasurement3D();
    directLineMeasurement3D.view = ags.view;
  }
}
class Measure_Area_3d {
  constructor(view) {
    this.sceneView = view;
    this.state = {
      over: false,
      deactivate: false,
    };
  }
}
class MeasureUtil {
  static active(tool) {
    if (this.activeTool !== undefined && this.activeTool !== null) {
      this.activeTool.deactivate();
    }
    if (tool === 'line') {
      this.activeTool = new Measure_line_3d(this.mapView);
      this.activeTool.Measureline();
    }
    if (tool === 'area') {
      this.activeTool = new Measure_Area_3d(this.mapView);
      this.activeTool.Measureline();
    }
  }
}
export default MeasureUtil;
