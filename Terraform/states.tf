terraform {
  backend "s3" {
    bucket         = "terraform-state-repo123"
    key            = "terraform/tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform_status_js"
    
  }
}
provider "aws" {
    region = "us-east-1"
}