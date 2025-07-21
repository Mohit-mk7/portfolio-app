terraform {
  backend "s3" {
    bucket         = "mohitbucet234567erty"
    key            = "terraform/state/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    use_lockfile   = true
  }
}
