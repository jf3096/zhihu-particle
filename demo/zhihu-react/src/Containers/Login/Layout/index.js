import React from 'react';
import styles from './index.less';

export default class Login extends React.Component {

    render() {
        const {children} = this.props;
        return (
            <div className={styles.main}>
                <header>
                    <h1 className={styles.logo}>
                        知乎
                    </h1>
                    <h2 className={styles.slogan}>
                        与世界分享你的知识、经验和见解
                    </h2>
                </header>
                <section>
                    {children}
                </section>
                <footer>
                    <button className={styles.downloadApp}>
                        下载知乎 App
                    </button>
                </footer>
            </div>
        );
    }
}