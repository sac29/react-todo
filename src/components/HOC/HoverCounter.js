import React, { Component } from 'react'
import UpdatedComponent from './withHoc';

class HoverCounter extends Component {
    render() {
        const { count, incrementCount } = this.props;
        return (
            <div onMouseOver={incrementCount}>
                {count} hovered
            </div>
        )
    }
}

export default UpdatedComponent(HoverCounter);
