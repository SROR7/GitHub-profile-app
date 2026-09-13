module "security_group" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "~> 5.0"

  name        = "gitdev"
  description = "GitDev security group"

  vpc_id = module.vpc.vpc_id

  ingress_with_cidr_blocks = [
    {
      rule        = "https-443-tcp"
      cidr_blocks = "10.0.0.0/16"
      description = "HTTPS from internal"
    },
    {
      rule        = "ssh-tcp"
      cidr_blocks = "192.168.7.11/32"
      description = "SSH from my IP"
    }
  ]

  egress_rules = [
    "all-all"
  ]

  tags = {
    Environment = "dev"
  }
}