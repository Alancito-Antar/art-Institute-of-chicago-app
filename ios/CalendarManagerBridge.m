// CalendarManagerBridge.m
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CalendarManager, NSObject)

RCT_EXTERN_METHOD(addEventToCalendar:(NSString *)name location:(NSString *)location startDate:(nonnull NSString *)startDate endDate:(nonnull NSString *)endDate
                  errorCallback: (RCTResponseSenderBlock)errorCallback successCallback: (RCTResponseSenderBlock)successCallback)

@end
