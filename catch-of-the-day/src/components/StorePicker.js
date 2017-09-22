import React from 'react';
import { getFunName } from '../helpers';


class StorePicker extends React.Component {
    
    goToStore (event) {
        event.preventDefault();
        console.log('You change the URL');

        // First grab the text from the box
        const storeId = this.storeInput.value;
        console.log(`Going to ${storeId}`);
        
        // second: we're goint to transition from /yo /store/:storeId
        this.context.router.transitionTo(`/store/${storeId}`);
    }
    
    render () {
        return (
            <form className="store-selector" onSubmit={e => this.goToStore(e)}>
                <h2>Please Enter a Store</h2>
                <input ref={input => {this.storeInput = input}} type="text" required placeholder="Store Name" defaultValue={getFunName()} />
                <button type="submit">Visit Store </button>
            </form>
        );
    }
}

StorePicker.contextTypes = {
    router: React.PropTypes.object
};

export default StorePicker;
