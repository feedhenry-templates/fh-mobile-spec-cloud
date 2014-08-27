# FeedHenry Mobile Spec Cloud App

This cloud provides APIs for the Cordova Mobile Spec App to post test results and the Mobile Spec Web Portal to retrieve these results 

# Group Record Test API

# recordTest [/recordTest]

'Record Test' endpoint.

## recordTest [POST] 

+ Request (application/json)
    + Body
      {
        "reporterId" : "Unique Device ID",
        "deviceInfo" : {
          // Metadata about the device submitting the test results
        },
        "testInfo" : [
          // Array of Test results
        ]
      }

+ Response 200 (application/json)
    + Body
      {}

+ Response 500 (application/json)
    + Body
      {
        // Error Object
      }


# Group List Tests API

# listTests [/listTests]

'List Tests' endpoint.

## listTests [GET] 

+ Request (application/json)
    + Body
      {}

+ Response 200 (application/json)
    + Body
      {}

+ Response 500 (application/json)
    + Body
      {}
