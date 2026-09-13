resource "aws_security_group_rule" "sonarqube" {
  type              = "ingress"
  security_group_id = module.security_group.security_group_id

  from_port   = 9000
  to_port     = 9000
  protocol    = "tcp"
  cidr_blocks = ["192.168.7.11/32"]

  description = "SonarQube UI"
}