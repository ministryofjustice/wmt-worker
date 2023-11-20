#!/usr/bin/env bash

set -e
export TERM=ansi
export AWS_DEFAULT_REGION=eu-west-2
export PAGER=

aws --endpoint-url=http://localhost:4566 s3api create-bucket --bucket wmt-worker --region ${AWS_DEFAULT_REGION} --create-bucket-configuration LocationConstraint=${AWS_DEFAULT_REGION}
aws --endpoint-url=http://localhost:4566 sqs create-queue --queue-name s3_extract_event_queue

aws --endpoint-url=http://localhost:4566 s3api put-bucket-notification-configuration --bucket wmt-worker --notification-configuration '{"QueueConfigurations":[{"QueueArn":"arn:aws:sqs:eu-west-2:000000000000:s3_extract_event_queue","Events": ["s3:ObjectCreated:*"]}]}'

aws --endpoint-url=http://localhost:4566 s3api create-bucket --bucket wmt-worker-dashboard --region ${AWS_DEFAULT_REGION} --create-bucket-configuration LocationConstraint=${AWS_DEFAULT_REGION}

aws --endpoint-url=http://localhost:4566 sqs create-queue --queue-name audit_event_queue

aws --endpoint-url=http://localhost:4566 sns create-topic --name domain-events

aws --endpoint-url=http://localhost:4566 sqs create-queue --queue-name domain_event_queue

aws --endpoint-url=http://localhost:4566 sns subscribe --topic-arn arn:aws:sns:eu-west-2:000000000000:domain-events --protocol sqs --notification-endpoint arn:aws:sqs:eu-west-2:000000000000:domain_event_queue --attributes '{"FilterPolicy":"{\"eventType\":[\"staff.available.hours.changed\"]}", "RawMessageDelivery": "true"}'


echo "S3 created bucket"

# to put a file using command line
# aws --endpoint-url=http://localhost:4566 s3api put-object --bucket wmt-worker --key extract/WMP_PS.xlsx --body test/integration/resources/WMP_PS.xlsx