#import "Brightness.h"
#import "RCTLog.h"

@implementation Brightness
{
    NSNumber *brightness;
}

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(setBrightness:(CGFloat)newBrightness)
{
//    NSLog(@"Adjusting brightness to: %f", newBrightness);
    [[UIScreen mainScreen] setBrightness:newBrightness];
}

RCT_EXPORT_METHOD(getBrightness:(RCTResponseSenderBlock)callback)
{
    brightness = @([UIScreen mainScreen].brightness);
    callback(@[[NSNull null], brightness]);
}

@end
