terraform {
  backend "s3" {
    bucket         = "mohitbuc6789yy"
    key            = "terraform/state/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    use_lockfile   = true
  }
}
