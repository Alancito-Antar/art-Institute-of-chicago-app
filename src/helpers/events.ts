/* eslint-disable import/no-cycle */
import { EventGroup } from '../screens/home/HomeMainScreen';
import { Event } from '../services/events/types';
import { PagedDataResponse } from '../services/types';

export const processEventsNewPage = (
  newPage: PagedDataResponse<Event[]>,
  previousData?: EventGroup[],
) => {
  // Create a new array to hold the groups
  const eventsGroups: EventGroup[] =
    previousData !== undefined ? [...previousData] : [];

  newPage.data.forEach(event => {
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

export const processFavoritesEvents = (events: Event[]) => {
  // Create a new array to hold the groups
  const eventsGroups: EventGroup[] = [];

  events.forEach(event => {
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
