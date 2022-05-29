import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const NumberSelector = ({ number, setNumber, min, max }) => {
  return (
    <div className='number-selector'>
      <button
        className='number-selector-left'
        onClick={() => {
          number > min && setNumber(number - 1);
        }}
      >
        <IoIosArrowBack />
      </button>
      <input
        type='number'
        className='number-selector-input'
        value={number}
        onChange={(e) => {
          if (parseInt(e.target.value) > parseInt(max)) setNumber(max);
          else if (
            parseInt(e.target.value) < parseInt(min) ||
            e.target.value === ''
          )
            setNumber(min);
          else setNumber(e.target.value);
        }}
        min={min}
        max={max}
      />
      <button
        className='number-selector-right'
        onClick={() => {
          number < max && setNumber(parseInt(number) + 1);
        }}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default NumberSelector;
