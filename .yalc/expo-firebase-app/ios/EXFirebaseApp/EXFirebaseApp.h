//  Copyright © 2018 650 Industries. All rights reserved.

#import <UMCore/UMExportedModule.h>
#import <UMCore/UMModuleRegistryConsumer.h>
#import <Firebase/Firebase.h>

@interface EXFirebaseApp : UMExportedModule <UMModuleRegistryConsumer>

- (instancetype) init;
- (instancetype) initWithAppName:(NSString*)name options:(FIROptions*)options;

- (BOOL) isAppAccessible:(nonnull NSString*)name;

@end
