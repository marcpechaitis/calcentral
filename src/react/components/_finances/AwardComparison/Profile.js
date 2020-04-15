import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import SectionHeader from './SectionHeader';
import ComparisonRow from './ComparisonRow';
import DollarComparisonRow from './DollarComparisonRow';
import SubvaluesComparisonRow from './SubvaluesComparisonRow';
import './AwardComparison.scss';

import { differencesBetween } from './Profile.module';

const snapshotValueForDescription = (snapshot, description) => {
  const { profile: { items = [] } = {} } = snapshot || {};

  const found = items.find(item => item.description === description);
  return !!found || found === 0 ? found.value : null;
};

const snapshotValuesForDescription = (snapshot, description) => {
  const { profile: { items = [] } = {} } = snapshot || {};

  const found = items.find(item => item.description === description);

  return !!found || found === 0 ? found.subvalues : null;
};

const countTheChanges = (current, snapshot) => {
  const { profile: { items: currentItems = [] } = {} } = current || {};
  const { profile: { items: snapshotItems = [] } = {} } = snapshot || {};

  if (snapshotItems.length === 0) {
    return 0;
  }

  return differencesBetween(currentItems)(snapshotItems);
};

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
            <table className="subvalues">
              {/* <thead>
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
              </thead> */}
              <tbody>
                {aidYearData.currentComparisonData.profile.items.map(item => (
                  <Fragment key={item.description}>
                    {item.subvalues && (
                      <SubvaluesComparisonRow
                        description={item.description}
                        current={item.subvalues}
                        snapshot={snapshotValuesForDescription(
                          aidYearSnapshot,
                          item.description
                        )}
                      />
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
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
                    {!item.subvalues &&
                      (typeof item.value === 'number' ? (
                        <DollarComparisonRow
                          description={item.description}
                          current={item.value}
                          snapshot={snapshotValueForDescription(
                            aidYearSnapshot,
                            item.description
                          )}
                        />
                      ) : (
                        <ComparisonRow
                          description={item.description}
                          current={item.value}
                          snapshot={snapshotValueForDescription(
                            aidYearSnapshot,
                            item.description
                          )}
                        />
                      ))}
                  </Fragment>
                ))}
              </tbody>
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
