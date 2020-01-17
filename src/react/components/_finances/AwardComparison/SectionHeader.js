import React from 'react';
import PropTypes from 'prop-types';

import Badge from 'react/components/Badge';
import DisclosureChevron from 'react/components/DisclosureChevron';

import './AwardComparison.scss';
import WhiteChangedIcon from '../../Icon/WhiteChangedIcon';

const SectionHeader = ({ expanded, label, numberOfChanges }) => {
  return (
    <h3>
      <div className="headerContainer">
        <div className="headerLabel">
          <DisclosureChevron
            style={{ marginRight: '10px' }}
            expanded={expanded}
          />
          {label}
        </div>
        {numberOfChanges > 0 && (
          <Badge
            count={numberOfChanges}
            backgroundColor="#F1A91E"
            color="#FFFFFF"
            style={{ marginLeft: `5px` }}
          >
            {/* <Badge count={2} backgroundColor="#000000" color="#FFFFFF"> */}
            <WhiteChangedIcon className="headerIcon" />
          </Badge>
        )}
      </div>
    </h3>
  );
};

SectionHeader.displayName = 'SectionHeader';
SectionHeader.propTypes = {
  expanded: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  numberOfChanges: PropTypes.number,
};

export default SectionHeader;
