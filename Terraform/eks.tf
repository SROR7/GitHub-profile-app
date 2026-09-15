module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 21.0"

  name               = "gitdev-cluster"
  kubernetes_version = "1.33"

  endpoint_public_access = true

  enable_cluster_creator_admin_permissions = true

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  eks_managed_node_groups = {
    gitdev_nodes = {
      name = "gitdev-nodes"

      instance_types = ["t3.medium"]

      capacity_type = "ON_DEMAND"

      min_size     = 1
      max_size     = 2
      desired_size = 1

      subnet_ids = module.vpc.private_subnets

      addons = {
        coredns                = {}
        kube-proxy             = {}
        vpc-cni                = {}
        eks-pod-identity-agent = {}
      }

      labels = {
        role        = "worker"
        environment = "dev"
      }

      tags = {
        Project = "gitdev"
      }
    }
  }

  tags = {
    Environment = "dev"
    Terraform   = "true"
  }
}