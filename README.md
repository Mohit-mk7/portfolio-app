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


---

## ⚙️ CI/CD Workflow (GitHub Actions)

The workflow performs the following:

1. **Provision Infrastructure**
   - Creates backend S3 bucket if not exists
   - Provisions EKS cluster, VPC, subnets, and ECR
   - Tags subnets for AWS Load Balancer Controller

2. **Kubernetes Setup**
   - Configures `kubectl`
   - Installs Prometheus + Grafana (via Helm with LoadBalancers)
   - Installs AWS Load Balancer Controller

3. **Build & Push Docker Images**
   - Backend and frontend Docker images built with run-number tags
   - Pushed to AWS ECR

4. **Kubernetes Deployment**
   - Replaces image placeholders in `deployment.yaml`
   - Applies backend, frontend, and ingress manifests

5. **DNS Fetch**
   - Waits for ALB Ingress DNS to be assigned and prints the public URL

---

## 🛠️ Technologies Used

- **AWS EKS** (Elastic Kubernetes Service)
- **Terraform** (for provisioning infra)
- **GitHub Actions** (CI/CD automation)
- **Helm** (for Prometheus/Grafana deployments)
- **React** frontend and **Node.js** backend
- **Prometheus & Grafana** for monitoring

---

## 🚦 Pre-Requisites

- AWS CLI and IAM credentials
- ECR Repository Created
- GitHub Secrets:
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`
  - `AWS_REGION`
  - `AWS_ACCOUNT_ID`
  - `CLUSTER_NAME`
  - `TF_BUCKET_NAME`
  - `ECR_REPO_NAME`

---

## 🚀 Deployment Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/portfolio-app.git
cd portfolio-app



2. Commit & Push to main Branch
Every push to main triggers the workflow automatically via GitHub Actions.

3. Monitor Deployment
Watch the progress under GitHub Actions > deploy. It provisions infrastructure, builds and pushes Docker images, and deploys Kubernetes manifests.

🌐 Access the App


After successful deployment, you will see an output similar to:

Ingress DNS: a1b2c3d4e5f6g7h8.elb.amazonaws.com

Visit: http://<Ingress-DNS> in your browser.


📊 Monitoring
Prometheus and Grafana are installed via Helm and exposed using LoadBalancer services:

Grafana: http://<grafana-lb-dns>

Default credentials: admin / admin123

Prometheus: http://<prometheus-lb-dns>

🧩 Troubleshooting
EKS Node Group Fails to Join Cluster?

Ensure subnets are public with IGW or private with NAT Gateway

IAM Role must have AmazonEKSWorkerNodePolicy, AmazonEKS_CNI_Policy, AmazonEC2ContainerRegistryReadOnly

Use ami_type = "AL2_x86_64" if not using custom launch templates

Ingress Not Showing DNS?

Make sure AWS Load Balancer Controller is installed

Ensure subnets are tagged correctly

Confirm IngressClassName: alb is used in the ingress manifest


