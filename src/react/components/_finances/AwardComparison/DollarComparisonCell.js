import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ComparisonCell from './ComparisonCell';
import formatCurrency from 'functions/formatCurrency';

import SelectedDateContext from './SelectedDateContext';

import './AwardComparison.scss';

const DollarComparisonCell = ({ description, current, snapshot }) => {
  const { selectedDate: selectedDate } = useContext(SelectedDateContext);
  const formattedCurrentValue =
    current || current === 0 ? formatCurrency(current) : 'N/A';
  const formattedSnapshotValue =
    snapshot || snapshot === 0
      ? formatCurrency(snapshot)
      : selectedDate === 'X'
      ? null
      : 'N/A';

  // console.log(snapshot);

  return (
    <ComparisonCell
      description={description}
      current={formattedCurrentValue}
      snapshot={formattedSnapshotValue}
    />
  );
};

DollarComparisonCell.displayName = 'AwardComparisonDollarComparisonCell';
DollarComparisonCell.propTypes = {
  description: PropTypes.string.isRequired,
  current: PropTypes.number,
  snapshot: PropTypes.number,
};

export default DollarComparisonCell;
