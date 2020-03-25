# Udemy Kubernetes (k8s)

## Support

- Service Discovery
- Rollouts & Rollbacks
- Optimization
- Self-healing
- Secrets
- Horizontal scaling

## Architecture

- Master-Node
- Components
  - kube-apiserver
    - Receive API calls
  - kubectl
    - Console command
    - Talks to API using JSON
  - kube-scheduler
    - Decides where to run a container
  - kube-controller-manager
    - Node Controller
    - Replication Controller
    - Endpoint Controller
    - Service Accounts Controller
    - Token Controller
  - etcd
    - BD with all status of cluster (value-key pair)
  - kubelet
    - Service in Nodes
    - Interact with Master
  - kube-proxy
    - Manages networking
  - Container Runtime
    - Install in Node (For example Docker)

## Instalation

- Minikube (light version)
- [Git Hub Documents](https://github.com/ricardoandre97/k8s-resources)
- Execute with Docker as a driver
  - minikube start --vm-driver=none
