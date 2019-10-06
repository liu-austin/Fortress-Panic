// jshint esversion:6
import React from 'react';
import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import { Route } from 'react-router-dom';
import Category from '../category/category.component';
import { firestore, convertCollectionsSnapShotToMap } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { updateCollections } from '../../redux/collection/collection.action';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(Category);

class ShopPage extends React.Component {
    state = {
        loading: true
    };

    unsubscribeFromSnapShot = null;

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');
        // fetch('https://firestore.googleapis.com/v1/projects/crown-db-de817/databases/(default)/documents/collections')
        // .then(response => response.json())
        // .then(collections => console.log(collections));
        collectionRef.get().then(snapShot => {
            const collectionsMap = convertCollectionsSnapShotToMap(snapShot);
            updateCollections(collectionsMap);
            this.setState({ loading: false });
        });
    }

    render() {
        const { match } = this.props;
        return (<div className="shop-page">
        <Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner {...props} isLoading={this.state.loading} />} />
        <Route path={`${match.path}/:categoryId`} render={(props) => <CollectionPageWithSpinner {...props} isLoading={this.state.loading} />}/>
        </div>);
    }
}

const mapDispatchToProps = (dispatch) => {
    return({
        updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
    });
};

export default connect(null, mapDispatchToProps)(ShopPage);