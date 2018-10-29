let activeWidget = null;

function removeMeasureWidget(view, widget) {
  activeWidget = widget;
  view.ui.remove(activeWidget);
  activeWidget.destroy();
  activeWidget = null;
}

export { removeMeasureWidget };
