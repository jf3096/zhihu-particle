import './index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Containers/Login';

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        React.createElement(Login),
        document.getElementById('mount')
    );
});