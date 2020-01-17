import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import SelectedDateContext from './SelectedDateContext';
import OrangeChangedIcon from '../../Icon/OrangeChangedIcon';

import './AwardComparison.scss';

const ComparisonCell = ({ description, current, snapshot }) => {
  const { selectedDate: selectedDate } = useContext(SelectedDateContext);
  const sameValues =
    (snapshot === null && selectedDate === 'X') || current === snapshot
      ? true
      : false;
  const cellStyle = sameValues ? 'valueCell' : 'valueCell valueCellChanged';
  const cellWithIconStyle = sameValues
    ? 'valueCell'
    : 'valueCell valueCellChanged valueCellIcon';

  return (
    <tr key={description}>
      <th scope="row">{description}</th>
      <td className={cellStyle}>{snapshot}</td>
      <td className={cellWithIconStyle}>
        {!sameValues && (
          <OrangeChangedIcon className="hideSmallFormFactor icon" />
        )}
        {current}
      </td>
    </tr>
  );
};

ComparisonCell.displayName = 'AwardComparisonComparisonCell';
ComparisonCell.propTypes = {
  description: PropTypes.string.isRequired,
  current: PropTypes.string,
  snapshot: PropTypes.string,
};

export default ComparisonCell;
