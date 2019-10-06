// jshint esversion:6
import React from 'react';
import './category.styles.scss';
import CollectionItem from '../../components/collection-item/collection-item.component';
import { selectCategory } from '../../redux/collection/collection.selectors';
import { connect } from 'react-redux';

const Category = ({ category }) => {
    const {title, items} = category;
    return (
        <div className='collection-page'>
            <h2 className='title'>{title}</h2>
            <div className='items'>
                    {
                        items.map(item => 
                            <CollectionItem key={item.id} className='collection-item' item={item} />
                            )
                    }
            </div>
        </div>
    );
};

const mapStateToProps = (state, otherProps) => {
    return ({
        category: selectCategory(otherProps.match.params.categoryId)(state)
    });
};

export default connect(mapStateToProps)(Category);