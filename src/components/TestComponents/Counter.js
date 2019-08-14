import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {increment, decrement} from '../../store/actions';

const style = {
  display: "flex",
  justifyContent: "center",
  fontSize: "30px"
};

function Counter(props) {
    return (
      <>
          <div style={style}>
            <Link to='/'>Home</Link>
          </div>
          <div style={style}>
            {props.count}
          </div>
          <div style={style}>
            <button onClick={props.increment}>+</button>
            <button onClick={props.decrement}>-</button>
          </div>
      </>
    );
}


const mapStateToProps = state => {
  return {count: state.count}
};
const mapDispatchToProps = {
  increment,
  decrement
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Counter);