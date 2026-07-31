export const projects = [
  {
    id: "ec2-terraform-docker-flask",
    status: "DEPLOYED",
    title: "Flask on AWS EC2 — Terraform & Docker",
    description:
      "End-to-end deployment pipeline for a Flask app: Terraform provisions the EC2 instance and security group, then a Dockerized Flask container is built and run on it, live on port 5000.",
    stack: ["Terraform", "AWS EC2", "Docker", "Flask", "Ubuntu 22.04"],
    repoUrl:
      "https://github.com/chahatcodes00/EC2-using-Terraform-and-Docker-Flask-Web-App-Launch",
    liveUrl: null,
  },
  {
    id: "custom-vpc-aws",
    status: "DEPLOYED",
    title: "Custom VPC AWS Infrastructure",
    description:
      "A full network build-out from scratch in Terraform: custom VPC with public and private subnets, an Internet Gateway, route tables, and security groups, serving a live NGINX site from EC2 alongside an S3 bucket.",
    stack: ["Terraform", "AWS VPC", "EC2", "S3", "NGINX"],
    repoUrl:
      "https://github.com/chahatcodes00/Terraform-AWS-Deployment-with-Custom-VPC-EC2-S3",
    liveUrl: null,
  },
  {
    id: "portfolio-website",
    status: "LIVE",
    title: "Personal Portfolio Website",
    description:
      "The source behind this site's earlier version — designed, built, and shipped independently to its own domain.",
    stack: ["Web Development"],
    repoUrl: "https://github.com/chahatcodes00/portfolio-website",
    liveUrl: "https://chahatrsrathour.com.np/",
  },
];
