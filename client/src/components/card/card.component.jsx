// jshint esversion:6
import React from 'react';
import './card.styles.scss';
import { connect } from 'react-redux';

const Card = ({ cardInfo }) => {
    // const { id, name, text, imageUrl } = cardInfo;
    return (
        <div>
            <div className="card" key='1'>
                <p className='name' >GREEN KNIGHT</p>
                <div className='image-container'>
                    <img className='image' src={require('../../assets/images/card-art/green-knight.jpg')} alt='green-knight'/>
                </div>
                <div className="card-footer">
                    <span className='text' >HIT ONE MONSTER IN A GREEN KNIGHT RING.</span>
                </div>
            </div>
            <div className='card-option-container'>
                <button className='card-option'>PLAY</button>
                <button className='card-option'>TRADE</button>
                <button className='card-option'>DISCARD</button>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return ({
        // addItem: cardInfo => dispatch(addItem(cardInfo))
     });
}

export default connect(null, mapDispatchToProps)(Card);


// const Card = ({ cardInfo }) => {
//     const { id, name, text, imageUrl } = cardInfo;
//     return (
//         <div className="card" key={id}>
//             <span className='name' >{name}</span>
//             <div className='image' style={{backgroundImage: `url(${imageUrl})`}} />
//             <div className="card-footer">
//                 <span className='text' >{text}</span>
//             </div>
//         </div>
//     );
// };