# FeedHenry Mobile Spec Cloud App

This cloud provides APIs for the Cordova Mobile Spec App to post test results and the Mobile Spec Web Portal to retrieve these results 

# Group Record Test API

# recordTest [/recordTest]

'Record Test' endpoint.

## recordTest [POST] 

'Record Test' endpoint.

+ Request (application/json)
    + Body
            {
              "hello": "world"
            }

+ Response 200 (application/json)
    + Body
            {
              "msg": "Hello world"
            }
