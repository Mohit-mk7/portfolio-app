terraform {
  backend "s3" {
    bucket = "mohitbucet234567erty"  # Manually created or managed elsewhere
    key    = "portfolio-app/terraform.tfstate"
    region = "us-east-1"
  }
}
