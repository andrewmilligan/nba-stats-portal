#!/bin/bash

BUCKET="milligan.news"
PREFIX="nba"
CLOUDFRONT_DISTRIBUTION="E3VYHWQGUHITE2"

set -e

# Forcibly sync everything but the CDN assets
echo "+ Uploading non-CDN files"
aws s3 sync \
  --profile personal \
  --delete \
  --sse AES256 \
  --cache-control "max-age=30" \
  --exclude "_next/*" \
  out/ \
  "s3://${BUCKET}/${PREFIX}/"

# Forcibly sync all of the CDN assets
echo "+ Uploading CDN assets"
aws s3 sync \
  --profile personal \
  --delete \
  --sse AES256 \
  --cache-control "max-age=3153600000" \
  out/_next/ \
  "s3://${BUCKET}/${PREFIX}/_next/"

# # Clear cache
# SAFE_PREFIX=$( echo "$PREFIX" | sed 's/\//\\\//g' )
# PATHS=( $( find out -type f | grep -v '/_next/' | sed "s/^out\//\/${SAFE_PREFIX}\//" ) )
# echo "+ Clearing cache on ${#PATHS[@]} files"
# CF_STATUS=$( aws cloudfront \
#   --profile personal \
#   create-invalidation \
#   --distribution-id "$CLOUDFRONT_DISTRIBUTION" \
#   --paths "${PATHS[@]}"
# )
# if [[ $? -ne 0 ]]; then
#   exit 1
# fi
# INVALIDATION_ID=$( echo "$CF_STATUS" | jq '.Invalidation.Id' | sed 's/"//g' )
# INVALIDATION_STATUS=$( echo "$CF_STATUS" | jq '.Invalidation.Status' | sed 's/"//g' )
# echo "+ CloudFront invalidation $INVALIDATION_ID is $INVALIDATION_STATUS"
