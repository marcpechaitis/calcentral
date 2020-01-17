import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from '../../Dropdown';

import './AwardComparisonDropdown.scss';

const AwardComparisonDropdown = ({ value, items, fieldLabel, onChange }) => {
  const options = [
    ...items.map(item => ({
      value: item.id,
      label: item.name,
    })),
    { selected: false },
  ];

  return (
    <div className="AwardComparisonDropdown">
      <label id={fieldLabel}>{fieldLabel}</label>
      <select className="AwardComparison__value" aria-labelledby={fieldLabel}>
        {/* className="AwardComparisonDropdown__container"> */}
        {/* <Dropdown value={value} options={options} onChange={onChange} /> */}
        {/* </div>
      <select className="AwardComparison__value"> */}
        <option value="grapefruit">Grapefruit</option>
        <option value="lime">Lime</option>
        <option selected value="coconut">
          Coconut
        </option>
        <option value="mango">Mango</option>
      </select>
    </div>
  );
};

AwardComparisonDropdown.propTypes = {
  value: PropTypes.string,
  fieldLabel: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func,
};

export default AwardComparisonDropdown;
