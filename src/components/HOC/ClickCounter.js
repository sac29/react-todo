import React, { Component } from 'react'
import UpdatedComponent from './withHoc';

class ClickCounter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0
        }
        this.updateDim = this.updateDim.bind(this);
    }

    componentWillMount() {
        this.updateDim();
    }

    updateDim() {
        this.setState({ width: window.innerWidth, height: window.innerHeight })
    }

    componentDidMount() {
        this.nameInput.focus();
        window.addEventListener('resize', this.updateDim);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDim);
    }

    render() {
        const { count, incrementCount } = this.props;
        return (
            <>
                <input
                    value={count}
                    ref={(input) => this.nameInput = input}
                    defaultValue={'Will focus'}
                />
                <span>{this.state.width} x {this.state.height}</span>
                <div>
                    <button onClick={incrementCount}>{this.props.name} {count} cliked times</button>
                </div>
            </>
        )
    }
}

export default UpdatedComponent(ClickCounter);
