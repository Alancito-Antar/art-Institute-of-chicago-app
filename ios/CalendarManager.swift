// CalendarManager.swift

import EventKit

@objc(CalendarManager)
class CalendarManager: NSObject {
  
  let eventStore : EKEventStore = EKEventStore()
  
  // This will make it run on main thread
  @objc static func requiresMainQueueSetup() -> Bool { return true }
  
  @objc(addEventToCalendar:location:startDate:endDate:errorCallback:successCallback:)
  func addEventToCalendar(_ name: String, location: String, startDate: String, endDate: String, errorCallback: @escaping RCTResponseSenderBlock, successCallback: @escaping RCTResponseSenderBlock) -> Void {
    eventStore.requestAccess(to: .event) { (granted, error) in
      
      if (granted) && (error == nil) {
        print("granted \(granted)")
        
        let event:EKEvent = EKEvent(eventStore:self.eventStore)
        
        // Converting ISO8601 string date that comes from events API into NSDate
        let localISOFormatter = ISO8601DateFormatter()
        localISOFormatter.timeZone = TimeZone.current
        
        let startDateAsDate = localISOFormatter.date(from: startDate)
        let endDateAsDate = localISOFormatter.date(from: endDate)
        
        event.title = name
        event.startDate = startDateAsDate
        event.endDate = endDateAsDate
        // event.notes = "" We could add notes as well.
        event.calendar = self.eventStore.defaultCalendarForNewEvents
        do {
          try self.eventStore.save(event, span: .thisEvent)
          successCallback(["Event has been saved succesfully!"])
        } catch let error as NSError {
          errorCallback([error])
        }
      }
      else{
        errorCallback([error ?? "You need to grant calendar permissions to use this feature :)"])
      }
    }
  }
  
}
