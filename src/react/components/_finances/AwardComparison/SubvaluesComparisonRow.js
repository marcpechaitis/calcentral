import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import SelectedDateContext from './SelectedDateContext';
import OrangeChangedIcon from '../../Icon/OrangeChangedIcon';

import './AwardComparison.scss';

const SubvaluesComparisonRow = ({ description, current, snapshot }) => {
  const { selectedDate: selectedDate } = useContext(SelectedDateContext);

  const mergedData = (current, snapshot) => {
    const currentTerms = current ? current.map(item => item.term) : null;
    const snapshotTerms = snapshot ? snapshot.map(item => item.term) : null;

    const combinedTerms = snapshotTerms
      ? new Set(currentTerms.concat(snapshotTerms))
      : new Set(currentTerms);

    const mergedItems = [];

    Array.from(combinedTerms).map(term => {
      mergedItems.push({
        term: term,
        currentValue:
          current && current.find(item => item.term === term)
            ? current.find(item => item.term === term).value
            : 'N/A',
        snapshotValue:
          selectedDate === 'X'
            ? null
            : snapshot && snapshot.find(item => item.term === term)
            ? snapshot.find(item => item.term === term).value
            : 'N/A',
      });
    });

    return mergedItems;
  };

  const cellStyle = (x, y) => {
    return x === y
      ? 'subvalueData subvalueCell'
      : 'subvalueData subvalueCell valueCellChanged';
  };

  const cellWithIconStyle = (x, y) => {
    return x === y || selectedDate === 'X'
      ? 'subvalueData subvalueCell'
      : 'subvalueData subvalueCell valueCellChanged valueCellIcon';
  };

  return (
    <tr key={description} className="awardRow">
      <th scope="row" className="subvalueDescription">
        {description}
      </th>
      <td className="subvalue">
        <div>
          {mergedData(current, snapshot).map(item => (
            <div key={item.term} className="subvalueRow">
              <div className="subvalueData subvalueTerm">{item.term}</div>
              <div className={cellStyle(item.snapshotValue, item.currentValue)}>
                {item.snapshotValue}
              </div>
              <div
                className={cellWithIconStyle(
                  item.snapshotValue,
                  item.currentValue
                )}
              >
                {selectedDate !== 'X' &&
                  item.snapshotValue !== item.currentValue && (
                    <OrangeChangedIcon className="hideSmallFormFactor icon" />
                  )}
                {item.currentValue}
              </div>
            </div>
          ))}
        </div>
      </td>
    </tr>
  );
};

SubvaluesComparisonRow.displayName = 'SubvaluesComparisonRow';
SubvaluesComparisonRow.propTypes = {
  description: PropTypes.string.isRequired,
  current: PropTypes.array,
  snapshot: PropTypes.array,
};

export default SubvaluesComparisonRow;
