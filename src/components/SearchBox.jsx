import * as React from 'react';
import PropTypes from 'prop-types';

const SearchBox = ({onChange}) => (
        <input
          type='text'
          className='form-control'
          placeholder='Enter Search here'
          autoComplete={false}
          onChange={event => onChange(event.target.value)}
          />
      );

    SearchBox.propTypes = {
      onChange: PropTypes.func
    };

export default SearchBox;
