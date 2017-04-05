import React from 'react';
import styles from './index.less'
export default class Form extends React.Component {
    render() {
        return (
            <form noValidate>
                <div className={styles.inputGroups}>
                    <input className={styles.input} placeholder="手机号或邮箱"/>
                    <input className={styles.input} placeholder="密码"/>
                </div>
                <button className={styles.btn}>
                    登录
                </button>
                <div className={styles.extra}>
                    <button className={styles.phoneLogin}>
                        手机验证码登录
                    </button>
                    <button className={`${styles.link} ${styles.fr}`}>
                        无法登录？
                    </button>
                </div>
                <div className={styles.extra}>
                    <button className={styles.link}>
                        社交账号登录
                    </button>
                </div>
            </form>
        );
    }
}