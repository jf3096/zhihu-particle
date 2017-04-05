import React from 'react';
import styles from './index.less';

export default class Layout extends React.Component {
    render() {
        return (
            <div className={styles.main}>
                <h1 className={styles.logo}>
                    知乎
                </h1>
            </div>);
    }
}