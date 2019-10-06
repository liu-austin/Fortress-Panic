// jshint esversion:6
import React from 'react';
import './collection-overview.styles.scss';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionsForPreview } from '../../redux/collection/collection.selectors';
import PreviewCollection from '../preview-collection/preview-collection.component';

const CollectionOverview = ({ collections }) => {
    return (
    <div className="collections-overview">
        {
            collections.map(({ id, ...otherSectionProps}) => (
                <PreviewCollection key={id} {...otherSectionProps} />))
        }
    </div>
    );
};

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
});


export default connect(mapStateToProps)(CollectionOverview);