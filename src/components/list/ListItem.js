import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSpring, animated } from 'react-spring';
import { month } from '../../utils/functions';

const ListItem = ({ item, removeAction, displayKeys }) => {
  const dispatch = useDispatch();
  const [animate, setAnimate] = useState(false);

  const slideIn = useSpring({
    opacity: animate ? 1 : 0,
    transform: animate ? 'translateX(0%)' : 'translateX(100%)',
    config: { duration: 200, mass: 5, friction: 20, tension: 120 }
  });

  useEffect(() => setAnimate(true), []);

  return (
    <animated.tr className='list-item' style={slideIn}>
      <td>
        <button
          className='remove-item-btn'
          onClick={() => dispatch(removeAction(item))}
        >
          X
        </button>
      </td>
      {Object.keys(displayKeys).map((key, index) => {
        switch (displayKeys[key].type) {
          case 'Currency':
            return (
              <td key={index} className='item-text'>
                ${parseFloat(item[key]).toFixed(2)}
              </td>
            );
          case 'String':
            return (
              <td key={index} className='item-text'>
                {item[key]}
              </td>
            );
          case 'Duration':
            return (
              <td key={index} className='item-text'>
                {Math.floor(item[key] / (1000 * 60 * 60))}:
                {(Math.floor(item[key] / (1000 * 60)) % 60)
                  .toString()
                  .padStart(2, '0')}
                :
                {(Math.floor(item[key] / 1000) % 60)
                  .toString()
                  .padStart(2, '0')}
              </td>
            );
          case 'Date':
            const taskDate = new Date(item[key]);
            return (
              <td key={index} className='item-text'>
                {taskDate.getHours()}:
                {taskDate.getMinutes().toString().padStart(2, '0')}
              </td>
            );
          default:
            return (
              <td key={index} className='item-text'>
                {item[key]}
              </td>
            );
        }
      })}
    </animated.tr>
  );
};

export default ListItem;
