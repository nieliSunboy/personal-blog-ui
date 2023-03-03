import React from 'react';
import './App.css';
import 'antd/dist/reset.css';
import { RenderRouter } from './compents/router/index';
import { mapRouterConfig } from './router/config';

function App() {
  return (
    <div className="App">
      <RenderRouter routers={mapRouterConfig}></RenderRouter>
    </div>
  );
}

export default App;
