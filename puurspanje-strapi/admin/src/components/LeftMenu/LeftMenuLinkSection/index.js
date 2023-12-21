import React, { useState } from 'react';
import PropTypes from 'prop-types';
import matchSorter from 'match-sorter';
import { sortBy, groupBy } from 'lodash';
import { FormattedMessage } from 'react-intl';

import LeftMenuLink from '../LeftMenuLink';
import LeftMenuLinkHeader from '../LeftMenuLinkHeader';
import LeftMenuListLink from './LeftMenuListLink';
import EmptyLinksList from 'strapi-admin/admin/src/components/LeftMenu/LeftMenuLinkSection/EmptyLinksList';
import EmptyLinksListWrapper from 'strapi-admin/admin/src/components/LeftMenu/LeftMenuLinkSection/EmptyLinksListWrapper';
import LeftMenuListLinkGroup from './LeftMenuListLinkGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LeftMenuLinksSection = ({
  section,
  searchable,
  location,
  links,
  emptyLinksListMessage,
  shrink,
}) => {
  const [search, setSearch] = useState('');
  const [showGroup, setShowGroup] = useState({});

  const filteredList = sortBy(
    matchSorter(links, search, {
      keys: ['label'],
    }),
    'label'
  ).map(item => {
    let label = item.label;
    let group = 'general';
    
    if (typeof label === 'string') {
      const groups = label.split(' / ');
      if (groups.length === 2) {
        group = groups[0];
        label = groups[1];
      }
    }

    return {
      ...item,
      label,
      group,
    };
  })
  
  const { general = [], ...rest } = groupBy(filteredList, 'group');

  const toggleGroup = (group) => {
    setShowGroup(state => ({
      ...state,
      [group]: !state[group],
    }))
  }

  return (
    <>
      <LeftMenuLinkHeader
        section={section}
        searchable={searchable}
        setSearch={setSearch}
        search={search}
      />
      <LeftMenuListLink shrink={shrink}>
        {Object.keys(rest).map((group, index) => (
          <LeftMenuListLinkGroup key={index}>
            <span onClick={() => toggleGroup(group)}>{group} <FontAwesomeIcon icon={'chevron-down'}/></span>
            {showGroup[group] && rest[group].map((link, index) => (
              <LeftMenuLink
                location={location}
                // There is no id or unique value in the link object for the moment.
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                iconName={link.icon}
                label={link.label}
                destination={link.destination}
                notificationsCount={link.notificationsCount || 0}
              />
            ))}
          </LeftMenuListLinkGroup>
        ))}
        {general.map((link, index) => {
          return (
            <LeftMenuLink
              location={location}
              // There is no id or unique value in the link object for the moment.
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              iconName={link.icon}
              label={link.label}
              destination={link.destination}
              notificationsCount={link.notificationsCount || 0}
            />
        )})}
        {filteredList.length === 0 && (
          <EmptyLinksListWrapper>
            <FormattedMessage id={emptyLinksListMessage} defaultMessage="No plugins installed yet">
              {msg => <EmptyLinksList>{msg}</EmptyLinksList>}
            </FormattedMessage>
          </EmptyLinksListWrapper>
        )}
      </LeftMenuListLink>
    </>
  );
};

LeftMenuLinksSection.defaultProps = {
  shrink: false,
};

LeftMenuLinksSection.propTypes = {
  section: PropTypes.string.isRequired,
  searchable: PropTypes.bool.isRequired,
  shrink: PropTypes.bool,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
  emptyLinksListMessage: PropTypes.string,
};

LeftMenuLinksSection.defaultProps = {
  emptyLinksListMessage: 'components.ListRow.empty',
};

export default LeftMenuLinksSection;
