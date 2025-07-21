variable "jump_ssh_cidr" {
  type = string
}

variable "region" {
  description = "AWS region to deploy resources in"
  type        = string
}


variable "ecr_name" {
  description = "Name of the ECR repository to create"
  type        = string
}


variable "cluster_name" {
  description = "EKS Cluster Name"
  type        = string
}


variable "public_subnet_ids" {
  type = list(string)
}
