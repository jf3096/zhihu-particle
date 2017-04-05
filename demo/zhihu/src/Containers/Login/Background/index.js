import React from 'react';
import styles from './index.less';
import Particle from '../../../../../../index';

export default class Background extends React.Component {
    componentDidMount() {
        new Particle(this.background, {interactive: true});
    }

    render() {
        return (
            <div ref={(background) => {
                this.background = background;
            }}
                 className={styles.background}
            />
        )
    }
}