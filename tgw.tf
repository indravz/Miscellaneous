resource "aws_ec2_transit_gateway" "tgw" {
  multicast_support = "enable"
}

resource "aws_ec2_transit_gateway_vpc_attachment" "attachment1" {
  subnet_ids         = [aws_subnet.subnet1.id, aws_subnet.subnet2.id]
  transit_gateway_id = aws_ec2_transit_gateway.tgw.id
  vpc_id             = aws_vpc.vpc1.id
}

resource "aws_ec2_transit_gateway_multicast_domain" "domain" {
  transit_gateway_id = aws_ec2_transit_gateway.tgw.id

  static_sources_support = "enable"

  tags = {
    Name = "Transit_Gateway_Multicast_Domain_Example"
  }
}

resource "aws_ec2_transit_gateway_multicast_domain_association" "association3" {
  subnet_id                           = aws_subnet.subnet3.id
  transit_gateway_attachment_id       = aws_ec2_transit_gateway_vpc_attachment.attachment2.id
  transit_gateway_multicast_domain_id = aws_ec2_transit_gateway_multicast_domain.domain.id
}

resource "aws_ec2_transit_gateway_multicast_group_source" "source" {
  group_ip_address                    = "224.0.0.1"
  network_interface_id                = aws_instance.instance3.primary_network_interface_id
  transit_gateway_multicast_domain_id = aws_ec2_transit_gateway_multicast_domain_association.association3.transit_gateway_multicast_domain_id
}
resource "aws_ec2_transit_gateway_multicast_group_member" "member1" {
  group_ip_address                    = "224.0.0.1"
  network_interface_id                = aws_instance.instance1.primary_network_interface_id
  transit_gateway_multicast_domain_id = aws_ec2_transit_gateway_multicast_domain_association.association1.transit_gateway_multicast_domain_id
}

resource "aws_ec2_transit_gateway_multicast_group_member" "member2" {
  group_ip_address                    = "224.0.0.1"
  network_interface_id                = aws_instance.instance2.primary_network_interface_id
  transit_gateway_multicast_domain_id = aws_ec2_transit_gateway_multicast_domain_association.association1.transit_gateway_multicast_domain_id
}
