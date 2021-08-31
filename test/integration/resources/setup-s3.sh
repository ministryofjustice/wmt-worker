#!/usr/bin/env bash

set -e
export TERM=ansi
export AWS_ACCESS_KEY_ID=foobar
export AWS_SECRET_ACCESS_KEY=foobar
export AWS_DEFAULT_REGION=eu-west-2
export PAGER=

aws --endpoint-url=http://localhost:4566 s3api create-bucket --bucket wmt-worker
aws --endpoint-url=http://localhost:4566 sqs create-queue --queue-name s3_extract_event_queue

aws --endpoint-url=http://localhost:4566 s3api put-bucket-notification-configuration --bucket wmt-worker --notification-configuration '{"QueueConfigurations":[{"QueueArn":"arn:aws:sqs:eu-west-2:000000000000:s3_extract_event_queue","Events": ["s3:ObjectCreated:*"]}]}'

aws --endpoint-url=http://localhost:4566 s3api create-bucket --bucket wmt-worker-dashboard

echo "S3 created bucket"

# to put a file using command line
# aws --endpoint-url=http://localhost:4566 s3api put-object --bucket wmt-worker --key extract/WMP_CRC.xlsx --body test/integration/resources/WMP_CRC.xlsx