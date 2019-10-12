// jshint esversion:6
import React from 'react';
import './card.styles.scss';
import { connect } from 'react-redux';

const Card = ({ cardInfo }) => {
    // const { id, name, text, imageUrl } = cardInfo;
    return (
        <div>
        {
            cardInfo ? 
            (
            <div>
                <div className="card">
                    <p className='name' >{cardInfo.name}</p>
                    <div className='image-container'>
                        <img className='image' src={cardInfo.src} alt={cardInfo.name}/>
                    </div>
                    <div className="card-footer">
                        <span className='text' >{cardInfo.description}</span>
                    </div>
                </div>
                <div className='card-option-container'>
                    <button className='card-option'>PLAY</button>
                    <button className='card-option'>TRADE</button>
                    <button className='card-option'>DISCARD</button>
                </div>
            </div>
            ) 
            : 
            (
                null
            )
        }
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