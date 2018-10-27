import {
  SCENE_MEASURE,
  SCENE_MEASURE_LINE,
  SCENE_MEASURE_AREA,
} from '../constants/action-types';

let activeWidget = null;

function removeMeasureWidget(view, widget) {
  activeWidget = widget;
  view.ui.remove(activeWidget);
  activeWidget.destroy();
  activeWidget = null;
}

export { removeMeasureWidget };
