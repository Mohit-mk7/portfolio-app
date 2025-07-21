provider "aws" {
  region = var.region
}

# Only create bucket if it doesn't already exist
resource "aws_s3_bucket" "this" {
  bucket        = var.bucket_name
  force_destroy = true

  lifecycle {
    prevent_destroy = false
    ignore_changes  = [tags]
  }
}

resource "aws_s3_bucket_versioning" "this" {
  bucket = aws_s3_bucket.this.id

  versioning_configuration {
    status = "Enabled"
  }
}
