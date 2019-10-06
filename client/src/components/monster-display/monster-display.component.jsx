// jshint esversion:6
import React from 'react';
import './monster-display.styles.scss';
import { connect } from 'react-redux';

const MonsterDisplay = ({ monsterInfo }) => {
    // const { id, name, text, imageUrl } = cardInfo;
    return (
        <div className='monster-display-container'>
            <div className="monster-display-title">
                <p className='name' >MONSTERS SPAWNED</p>
            </div>
            <div className='monster-card'>
                <div className="monster-name">
                    <p>MONSTER NAME</p>
                </div>
                <div className='monster-type'>
                    <p>MONSTER TYPE: </p>
                </div>
                <div className='monster-effect'>
                <p className='monster-text'>MONSTER EFFECT: SS SS SS SS SS SS SS</p>
                </div>
            </div>
            <div className='monster-card'>
            <div className="monster-name">
                <p>MONSTER NAME</p>
            </div>
            <div className='monster-type'>
                <p>MONSTER TYPE: </p>
            </div>
            <div className='monster-effect'>
            <p className='monster-text'>MONSTER EFFECT: SS SS SS SS SS SS SS</p>
            </div>
        </div>
        <div className='monster-card'>
        <div className="monster-name">
            <p>MONSTER NAME</p>
        </div>
        <div className='monster-type'>
            <p>MONSTER TYPE: </p>
        </div>
        <div className='monster-effect'>
        <p className='monster-text'>MONSTER EFFECT: SS SS SS SS SS SS SS</p>
        </div>
    </div>
        </div>
       
    );
};

const mapDispatchToProps = (dispatch) => {
    return ({
        // addItem: monsterInfo => dispatch(addItem(monsterInfo))
     });
}

export default connect(null, mapDispatchToProps)(MonsterDisplay);


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