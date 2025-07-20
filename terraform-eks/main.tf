module "vpc" {
  source = "./modules/vpc"
  region = var.region
}

module "ecr" {
  source     = "./modules/ecr"
  region     = var.region
  ecr_name   = var.ecr_name
}

module "eks" {
  source            = "./modules/eks"
  region            = var.region
  cluster_name      = var.cluster_name
  private_subnet_id = [module.vpc.private_subnet_id, module.vpc.private_subnet_b_id]
  public_subnet_id  = module.vpc.public_subnet_ids
  vpc_id            = module.vpc.vpc_id
}

resource "null_resource" "install_lb_controller" {
  provisioner "local-exec" {
    command = <<EOT
      export KUBECONFIG=~/.kube/config
      aws eks update-kubeconfig --region ${var.region} --name ${var.cluster_name}
      sleep 20
      helm repo add eks https://aws.github.io/eks-charts
      helm repo update
      helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
        -n kube-system \
        --set clusterName=${var.cluster_name} \
        --set serviceAccount.create=false \
        --set serviceAccount.name=aws-load-balancer-controller \
        --set region=${var.region} \
        --set vpcId=${module.vpc.vpc_id}
    EOT
    interpreter = ["/bin/bash", "-c"]
  }

  depends_on = [
    module.eks
  ]
}
