# Mobile Spec Cloud

This is the cloud app for the Mobile Spec project.

# Group APIs

## recordTest [POST] 

Endpoint to record test result to db.

+ Request (application/json)
    + Body
              {
                'data': {
                  'reporterId': '<unique reporter id>',
                  'deviceInfo': {
                    'platform': '<platform_name>',
                    'version': '<device_os_version>',
                    'uuid': '<device_unique_id>',
                    'cordova': '<device_cordova_version>',
                    'model': '<device_model>'
                  },
                  'testInfo': [
                    {
                      'stage': '<test_stage>',
                      'order': '<info_order>',
                      'ts': '<timestamp>',
                      'data': {
                        'suiteId': '<test_suite_id>',
                        'name': '<test_suite_name>',
                        'desc': '<test_suite_desc>',
                        'passed': '<test_suite_passed>',
                        'skipped': '<test_suite_skipped>',
                        'totalCount': '<assertions_count>',
                        'passedCount': '<passed_assertions_count>',
                        'failedCount': '<failed_assertions_count>',
                        'parents': [<parent_test_suites_ids>],
                        'specs': [
                          <spec_details>
                        ]
                      }
                    }
                  ]
                }
              }

+ Response 200 (application/json)
    + Body
            {
              
            }

## listTests [GET]

Endpoint to return test results

+ Request (application/json)
    + Body
            {

            }

+ Response 200 (application/json)
    + Body
              [
                {
                  'reporterId': '<unique reporter id>',
                  'deviceInfo': {
                    'platform': '<platform_name>',
                    'version': '<device_os_version>',
                    'uuid': '<device_unique_id>',
                    'cordova': '<device_cordova_version>',
                    'model': '<device_model>'
                  },
                  'testInfo': [
                    {
                      'stage': '<test_stage>',
                      'order': '<info_order>',
                      'ts': '<timestamp>',
                      'data': {
                        'suiteId': '<test_suite_id>',
                        'name': '<test_suite_name>',
                        'desc': '<test_suite_desc>',
                        'passed': '<test_suite_passed>',
                        'skipped': '<test_suite_skipped>',
                        'totalCount': '<assertions_count>',
                        'passedCount': '<passed_assertions_count>',
                        'failedCount': '<failed_assertions_count>',
                        'parents': [<parent_test_suites_ids>],
                        'specs': [
                          <spec_details>
                        ]
                      }
                    },
                    ...
                  ]
                },
                ...
              ]
