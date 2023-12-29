/* eslint-disable import/no-cycle */
import { EventGroup } from '../screens/home/HomeMainScreen';
import { Event } from '../services/events/types';

export const processEventsNewPage = (
  newPage: Event[],
  previousData?: EventGroup[],
) => {
  // Create a new array to hold the groups
  const eventsGroups: EventGroup[] =
    previousData !== undefined ? [...previousData] : [];

  newPage.forEach(event => {
    // First we check if we already have a group for this event date
    const lastGroup =
      eventsGroups.length > 0
        ? eventsGroups[eventsGroups.length - 1]
        : undefined;

    if (lastGroup && lastGroup.groupDate === event.start_date) {
      // Add to previous group
      lastGroup.data.push(event);
    } else {
      // Create a new group
      const newGroup: EventGroup = {
        groupDate: event.start_date,
        data: [event],
      };

      eventsGroups.push(newGroup);
    }
  });

  return eventsGroups;
};

export default { processEventsNewPage };
