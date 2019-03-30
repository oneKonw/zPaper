import dva from 'dva';
import 'antd/dist/antd.css';
import Router from './router';
import { createMap } from './middleware/arcgis/sceneview/arcgis-sceneview';
import { viewOperate } from './middleware/arcgis/sceneview/view-operate';

import './index.css';


// 1. Initialize
const app = dva({
  onAction: [
    createMap(),
    viewOperate(),
  ],
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/agsmap').default);
app.model(require('./models/agsOperate').default);
app.model(require('./models/linkService').default);
// app.model(require('./models/search').default);

// 4. Router
app.router(Router);

// 5. Start
app.start('#root');
