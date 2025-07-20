variable "region" {
  type = string
}

variable "cluster_name" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "private_subnet_id" {
  type = list(string)
}

variable "public_subnet_id" {
  type = list(string)
}
