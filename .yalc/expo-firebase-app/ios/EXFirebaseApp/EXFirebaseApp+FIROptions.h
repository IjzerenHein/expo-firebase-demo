//  Copyright © 2020 650 Industries. All rights reserved.

#import <Foundation/Foundation.h>
#import <EXFirebaseApp/EXFirebaseApp.h>
#import <Firebase/Firebase.h>
#import <UMConstantsInterface/UMConstantsInterface.h>

@interface EXFirebaseApp (FIROptions)

+ (nonnull NSDictionary *)firOptionsToJSON:(nonnull FIROptions *)options;
+ (nullable FIROptions *)firOptionsWithJSON:(nullable NSDictionary *)json;
+ (BOOL) firOptionsIsEqualTo:(nonnull FIROptions*)firebaseOptions compareTo:(nonnull FIROptions*)compareTo;

@end
