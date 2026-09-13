resource "aws_instance" "sonarqube" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"

  subnet_id = module.vpc.public_subnets[0]

  vpc_security_group_ids = [
    module.security_group.security_group_id
  ]

  associate_public_ip_address = true

  user_data = file("${path.module}/sonarqube-user-data.sh")

  root_block_device {
    volume_size = 30
    volume_type = "gp3"

    delete_on_termination = true
  }

  tags = {
    Name        = "gitdev-sonarqube"
    Environment = "dev"
    Project     = "GitDev"
  }
}