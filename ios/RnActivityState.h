
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNRnActivityStateSpec.h"

@interface RnActivityState : NSObject <NativeRnActivityStateSpec>
#else
#import <React/RCTBridgeModule.h>

@interface RnActivityState : NSObject <RCTBridgeModule>
#endif

@end
