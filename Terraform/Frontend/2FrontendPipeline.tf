resource "aws_s3_bucket" "frontend_artifacts" {
    bucket = var.S3FrontEnd
    acl    = "private"
    policy =
  
}