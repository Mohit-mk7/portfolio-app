output "cluster_name" {
  value = aws_eks_cluster.this.name
}

output "node_group_name" {
  value = aws_eks_node_group.private_nodes.node_group_name
}


output "public_node_group_name" {
  value = aws_eks_node_group.public_nodes.node_group_name
}
