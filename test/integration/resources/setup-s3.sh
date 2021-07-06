#!/usr/bin/env bash
set -e
export TERM=ansi
export AWS_ACCESS_KEY_ID=foobar
export AWS_SECRET_ACCESS_KEY=foobar
export AWS_DEFAULT_REGION=eu-west-2
export PAGER=

aws --endpoint-url=http://localhost:4572 s3api create-bucket --bucket wmt-worker
aws --endpoint-url=http://localhost:4572 s3api put-object --bucket wmt-worker --key extract/etl-example.xlsx --body /docker-entrypoint-initaws.d/etl-example.xlsx
echo "S3 created bucket"