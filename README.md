# 🚀 Portfolio Fullstack App on AWS EKS with GitHub Actions CI/CD

This project demonstrates a complete end-to-end deployment of a fullstack web application (React frontend + Node.js backend + MongoDB) on AWS EKS using **Terraform**, **Helm**, and **GitHub Actions**. Monitoring is set up with **Prometheus** and **Grafana** using LoadBalancer services.

---

## 🧱 Project Structure

.
├── application/
│ ├── backend/ # Node.js API backend
│ ├── frontend/ # React-based frontend
│ └── k8s/ # Kubernetes manifests (backend, frontend, ingress)
├── terraform-eks/ # Terraform to provision EKS + VPC + ECR
├── bucket/ # Terraform to create S3 backend for state
├── .github/workflows/ # GitHub Actions pipeline
└── README.md
