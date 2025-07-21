terraform {
  backend "s3" {
    bucket = "bucket"  # Manually created or managed elsewhere
    key    = "portfolio-app/terraform.tfstate"
    region = "us-east-1"
  }
}
