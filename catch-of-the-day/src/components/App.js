import React, { Component } from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends Component {

    constructor () {
        super();
        this.state = {
            fishes: {},
            order: {}
        };

        this.addFish = this.addFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        this.removeFromOrder = this.removeFromOrder.bind(this);
        this.updateFish = this.updateFish.bind(this);
        this.removeFish = this.removeFish.bind(this);
    }

    componentWillMount () {
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });

        // Check if there is any order in localStorage
        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

        if (localStorageRef) {
            // Update our App component's order state
            this.setState({
                order: JSON.parse(localStorageRef)
            });
        }
    }

    componentWillUnmount () {
        base.removeBinding(this.ref);
    }

    componentWillUpdate (nextProps, nextState) {
        localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
    }

    addFish (fish) {
        // update out state
        const fishes = {...this.state.fishes};
        const timeStamp = Date.now();
        
        // Add fish
        fishes[`fish-${timeStamp}`] = fish;
        // Set state
        this.setState({ fishes });
    }

    updateFish (key, updatedFish) {
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({ fishes });
    }

    removeFish (key) {
        const fishes = {...this.state.fishes};

        fishes[key] = null;
        this.setState({fishes});
    }

    loadSamples () {
        this.setState({ fishes: sampleFishes });
    }

    addToOrder (key) {
        // take a copy of our state
        const order = {...this.state.order};

        // update or add the new number of fish ordered
        order[key] = order[key] + 1 || 1;

        // Update our state
        this.setState({ order });
    }

    removeFromOrder (key) {
        const order = {...this.state.order};

        delete order[key];
        this.setState({ order });
    }

    render() {
        const { fishes } = this.state;
        
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="list-of-fishes">
                        {Object.keys(fishes).map(key => <Fish key={key} index={key} details={fishes[key]} addToOrder={this.addToOrder} />)}
                    </ul>
                </div>

                <Order
                    fishes={this.state.fishes}
                    order={this.state.order}
                    params={this.props.params}
                    removeFromOrder={this.removeFromOrder}
                />

                <Inventory 
                    fishes={this.state.fishes}
                    addFish={this.addFish}
                    loadSamples={this.loadSamples}
                    updateFish={this.updateFish}
                    removeFish={this.removeFish}
                />
            </div>
        );
    }
}

export default App;
