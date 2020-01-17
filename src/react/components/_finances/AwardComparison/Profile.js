import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import SectionHeader from './SectionHeader';
import DollarComparisonCell from './DollarComparisonCell';
import aidYearShape from './aidYearShape';
import './AwardComparison.scss';

const snapshotValueForDescription = (snapshot, description) => {
  const { cost: { items = [] } = {} } = snapshot || {};

  const found = items.find(item => item.description === description);
  return !!found || found === 0 ? found.value : null;
};

const itemsInOneArrayButNotTheOther = (current, snapshot) => {
  const { cost: { items: snapshotItems = [] } = {} } = snapshot || {};
  const { cost: { items: currentItems = [] } = {} } = current || {};

  const currentSet = new Set(currentItems.map(item => item.description));
  const snapshotSet = new Set(snapshotItems.map(item => item.description));
  const difference = new Set([...snapshotSet].filter(x => !currentSet.has(x)));
  return Array.from(difference);
};

const comparer = otherArray => {
  return function(current) {
    return (
      otherArray.filter(function(other) {
        return other.value == current.value;
      }).length == 0
    );
  };
};

const countTheChanges = (current, snapshot) => {
  const { cost: { items: currentItems = [] } = {} } = current || {};
  const { cost: { items: snapshotItems = [] } = {} } = snapshot || {};

  if (snapshotItems.length === 0) {
    return 0;
  }

  // identify current items that are different or not in the snapshot
  const onlyInA = currentItems.filter(comparer(snapshotItems));
  const onlyInB = itemsInOneArrayButNotTheOther(
    currentItems,
    snapshotItems
  ).filter(comparer(currentItems));
  const currentVsSnapshot = onlyInA.concat(onlyInB);

  // identify snapshot items that are different or not in the current
  const onlyInA2 = snapshotItems.filter(comparer(currentItems));
  const onlyInB2 = itemsInOneArrayButNotTheOther(
    snapshotItems,
    currentItems
  ).filter(comparer(snapshotItems));

  const snapshotVsCurrent = onlyInB2.concat(onlyInA2);

  // the following takes the two sets of differences, combines them
  // and removes duplicates (remember, Sets contain unique values)
  const combined = new Set(
    currentVsSnapshot.concat(snapshotVsCurrent).map(item => item.description)
  );
  return combined.size;
};

const ifLoaded = (dataObj, callback) =>
  dataObj && dataObj.loaded ? callback() : null;

const Profile = ({
  expanded,
  onExpand,
  setExpand,
  aidYearData,
  aidYearSnapshot,
}) => {
  const [numberOfChanges, setNumberOfChanges] = useState(0);

  useEffect(() => {
    if (aidYearSnapshot) {
      setNumberOfChanges(
        countTheChanges(
          aidYearData.currentComparisonData,
          aidYearSnapshot ? aidYearSnapshot : null
        )
      );
    }
  }, [aidYearSnapshot]);

  aidYearData.currentComparisonData.profile.items.map(
    item => item
    // console.log(item)
  );

  return (
    <div>
      <div className="clickable" onClick={() => onExpand(setExpand, expanded)}>
        <SectionHeader
          expanded={expanded}
          label="Profile"
          numberOfChanges={numberOfChanges}
        />
      </div>
      {expanded ? (
        <div>
          <div className="container">
            <table>
              <thead>
                <tr>
                  <th scope="col" className="columnBig">
                    Description
                  </th>
                  <th scope="col" className="columnSmall">
                    Prior Value
                  </th>
                  <th scope="col" className="columnSmall">
                    Current Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {aidYearData.currentComparisonData.profile.items.map(item => (
                  <Fragment key={item.description}>
                    <DollarComparisonCell
                      description={item.description}
                      current={item.value}
                      snapshot={snapshotValueForDescription(
                        aidYearSnapshot,
                        item.description
                      )}
                    />
                  </Fragment>
                ))}
                {aidYearSnapshot
                  ? itemsInOneArrayButNotTheOther(
                      aidYearData.currentComparisonData,
                      aidYearSnapshot ? aidYearSnapshot : null
                    ).map(item => (
                      <Fragment key={item}>
                        <DollarComparisonCell
                          description={item}
                          current={null}
                          snapshot={snapshotValueForDescription(
                            aidYearSnapshot,
                            item
                          )}
                        />
                      </Fragment>
                    ))
                  : null}
              </tbody>
              {/* <tfoot>
                <DollarComparisonCell
                  description="Estimated Cost of Attendance"
                  current={aidYearData.currentComparisonData.cost.total}
                  snapshot={ifLoaded(
                    aidYearSnapshot,
                    () => aidYearSnapshot.cost.total
                  )}
                />
              </tfoot> */}
            </table>
          </div>
        </div>
      ) : (
        <hr />
      )}
    </div>
  );
};

Profile.displayName = 'Profile';
Profile.propTypes = {
  expanded: PropTypes.bool.isRequired,
  onExpand: PropTypes.func.isRequired,
  setExpand: PropTypes.func.isRequired,
  // TODO
  aidYearData: PropTypes.object.isRequired,
  aidYearSnapshot: PropTypes.object,
};

export default Profile;
