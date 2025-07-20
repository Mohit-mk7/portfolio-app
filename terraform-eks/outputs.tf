output "eks_cluster_name" {
  value = module.eks.cluster_name
}

output "eks_node_group_name" {
  value = module.eks.node_group_name
}

output "vpc_id" {
  value = aws_vpc.main.id
}

output "public_subnet_ids" {
  value = [aws_subnet.public.id, aws_subnet.public_b.id]
}
