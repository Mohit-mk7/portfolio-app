variable "bucket_name" {}

data "aws_s3_bucket" "existing" {
  bucket = var.bucket_name
  lifecycle {
    ignore_changes = [bucket]
  }
}

locals {
  bucket_exists = can(data.aws_s3_bucket.existing.id)
}

resource "aws_s3_bucket" "this" {
  count  = local.bucket_exists ? 0 : 1
  bucket = var.bucket_name
  force_destroy = true
}

resource "aws_s3_bucket_versioning" "this" {
  count  = local.bucket_exists ? 0 : 1
  bucket = aws_s3_bucket.this[0].id

  versioning_configuration {
    status = "Enabled"
  }
}
