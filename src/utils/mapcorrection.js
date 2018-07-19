import React from 'react';
import ReactDom from 'react-dom';
import Graphic from 'esri/Graphic';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import PopupTemplate from 'esri/PopupTemplate';
import domConstruct from 'dojo/dom-construct';
import MapcorrectPop from '../components/mapcorrect/MapcorrectPop';

class DrawPoint {
  constructor(view) {
    this.mapTwoView = view;
    this.state = {};
    this.graphicsLayerTwo = new GraphicsLayer();
    window.mapcorrectPoint = this.mapTwoView.map;
    this.mapTwoView.map.add(this.graphicsLayerTwo);
    this.mapTwoView.map.reorder(this.graphicsLayerTwo, 7);
  }

  Drawpoint() {
    this.mapTwoView.when((view) => {
      this.mouseOnClick = view.on('click', (evt) => {
        this.clear();
        const point = {
          type: 'point',
          longitude: evt.mapPoint.longitude,
          latitude: evt.mapPoint.latitude,
        };
        const pointSymbol = {
          type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
          url: './images/pointSymbol.png',
          width: '18px',
          height: '27px',
        };
        // const
        const graphicPointTwo = new Graphic({
          geometry: point,
          symbol: pointSymbol,
        });
        const div = domConstruct.create('div');
        ReactDom.render(
          <MapcorrectPop
            view={this.mapTwoView}
            layer={this.graphicsLayerTwo}
            event={this.mouseOnClick}
            point={point}
          />,
          div,
        );
        const template = new PopupTemplate({
          location: evt.mapPoint,
          title: 'Population by Gender',
          content: div,
        });
        graphicPointTwo.popupTemplate = template;
        this.mapTwoView.popup.open({
          features: [graphicPointTwo],
          location: evt.mapPoint,
        });

        this.graphicsLayerTwo.add(graphicPointTwo);
      });
    });
  }
  clear() {
    if (this.graphicsLayerTwo) {
      this.graphicsLayerTwo.removeAll();
    }
  }
}


class MapCorrect {
  static active(tool) {
    if (this.activeTool !== undefined && this.activeTool !== null) {
      console.log(this.activeTool);
      // this.activeTool.deactivate();
    }
    if (tool === 'point') {
      this.activeTool = new DrawPoint(this.mapTwoView);
      this.activeTool.Drawpoint();
    }
  }
}

export default MapCorrect;
