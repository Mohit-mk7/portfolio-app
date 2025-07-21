
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
  source          = "./modules/eks"
  region          = var.region
  cluster_name    = var.cluster_name
  private_subnet_ids = [
    module.vpc.private_subnet_id,
    module.vpc.private_subnet_b_id
  ]
  vpc_id          = module.vpc.vpc_id
}
