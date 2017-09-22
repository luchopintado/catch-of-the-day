import React, { Component } from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends Component {

    constructor () {
        super();

        this.renderInventory = this.renderInventory.bind(this);
    }

    handleChange (e, key) {
        const fish = this.props.fishes[key];

        const updatedFish = {
            ...fish,
            [e.target.name]: e.target.value
        };

        this.props.updateFish(key, updatedFish);
    }

    renderInventory (key) {
        const { name, price, status, desc, image } = this.props.fishes[key];

        return (
            <div className="fish-edit" key={key}>
                <input type="text" value={name} name="name" placeholder="Fish Name" onChange={e => this.handleChange(e, key)} />
                <input type="text" value={price} name="price" placeholder="Fish Price" onChange={e => this.handleChange(e, key)} />
                <select name="status" value={status} onChange={e => this.handleChange(e, key)}>
                    <option value="available">Fresh !</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea name="desc" value={desc} placeholder="Fish Description" onChange={e => this.handleChange(e, key)}></textarea>
                <input type="text" value={image} name="image" placeholder="Fish Image" onChange={e => this.handleChange(e, key)} />

                <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
            </div>
        );
    }

    render() {
        return (
            <div>
                <h2>Inventory</h2>

                {Object.keys(this.props.fishes).map(this.renderInventory)}

                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
            </div>
        );
    }
}

export default Inventory;