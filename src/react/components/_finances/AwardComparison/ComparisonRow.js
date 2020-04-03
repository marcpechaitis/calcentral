import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import SelectedDateContext from './SelectedDateContext';
import OrangeChangedIcon from '../../Icon/OrangeChangedIcon';

import './AwardComparison.scss';

const ComparisonRow = ({ description, current, snapshot }) => {
  const { selectedDate: selectedDate } = useContext(SelectedDateContext);
  const sameValues =
    (snapshot === null && selectedDate === 'X') || current === snapshot
      ? true
      : false;
  const cellStyle = sameValues ? 'valueCell' : 'valueCell valueCellChanged';
  const cellWithIconStyle = sameValues
    ? 'valueCell'
    : 'valueCell valueCellChanged valueCellIcon';

  // console.log(description, current, snapshot);

  return (
    <tr key={description} className="awardRow">
      <th scope="row" className="valueDescription">
        {description}
      </th>
      <td className={cellStyle}>
        {snapshot || selectedDate === 'X' ? snapshot : 'N/A'}
      </td>
      <td className={cellWithIconStyle}>
        {!sameValues && (
          <OrangeChangedIcon className="hideSmallFormFactor icon" />
        )}
        {current ? current : 'N/A'}
      </td>
    </tr>
  );
};

ComparisonRow.displayName = 'AwardComparisonComparisonRow';
ComparisonRow.propTypes = {
  description: PropTypes.string.isRequired,
  current: PropTypes.string,
  snapshot: PropTypes.string,
};

export default ComparisonRow;
