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

## Pod

- Description: Namespace with one or more containers

### Pod Manifest

- apiVersion: v1
- kind: Pod
- metadata:
  - name: pod_name
  - labels:
    - label_tag: label_name
- spec:
  - containers:
    - name:
    - image: image_name
    - command: []
    - args: []
    - ports:
      - containerPorts:
    - imagePullPolicy: Always | IfNotPresent
    - resources:
      - limits:
        - memory:
      - request:
        - memory:
    - livenessProbe:
      - exec:
        - command:
      - tcpSocket:
        - port:
      - httpGet:
        - path:
        - port:
        - httpHeaders:
          - name:
          - value:
      - initialDelaySeconds:
      - periodSeconds:
    - readinessProbe:
    - env:
      - name:
      - value:
      - name:
      - valueFrom:
        - fieldRef:
          - fieldPath:
        - configMapKeyRef:
          - name:
          - key:
      - name:
      - valueFrom:
        - secretKeyREf:
          - name:
          - key:
    - volumeMounts:
      - name:
      - mountPath:
  - volumes:
    - name:
      - configMap:
        - name:
        - items:
          - key:
          - path:
    - name:
      - secret:
        - secretName:
        - items:
          - key:
          - path:
    - name:
      - emptyDir: {}
    - name:
    - persistentVolumeClaim:
      - claimName:
  - restartPolicy
  - serviceAccountName:

## ReplicaSets

- Description: Allow to maintain a number of active pods. Use Labels and Owner Reference in pods

### ReplicaSet Manifest

- apiVersion: apps/v1
- kind: ReplicaSet
- metadata:
  - name: rs_name
  - labels:
    - label_tag: label_name
- spec:
  - replicas:
  - selector:
    - matchLabels
      - app: pod_label
    - template:
      - metadata:
        - labels: pod_label
      - spec:
        - containers:
          - name:
          - image:

## Deployment

- Description: Allow to deploy a new version of a pod. Use max unavailable and max surge to decide how to deploy

### Deployment Manifest

- apiVersion: apps/v1
- kind: Deployment
- metadata:
  - name: dp_name
  - namespace: ns_name
  - labels:
    - label_tag: label_name
  - annotations:
    - kubernetes.io/change-cause:
- spec:
  - replicas:
  - selector:
    - matchLabels
      - app: pod_label
    - template:
      - metadata:
        - labels: pod_label
      - spec:
        - containers:
          - name:
          - image:

## Services

- Description: Allow to expose a service with a single IP
- Endpoint
  - List of Pod's IP
  - Populated by the Service
- A DNS entry is created with the service name
- Types
  - ClusterIP: Virtual IP
  - NodePort
    - Create an internet ClusterIP
    - Open a port in the Node
  - LoadBalancer
    - Enable load balancing in NodePorts
    - Use with cloud providers

### Service Manifest

- apiVersion: v1
- kind: Service
- metadata:
  - name: svc_name
  - labels:
    - label_tag: label_name
- spec:
  - type:
  - selector:
    - app: app_name
  - ports:
    - protocol: TCP | UDP
    - port: #
    - targetPort: #

## Namespaces

- Logic separation of Cluster
- Limits can be set by namespaces (#Pods,RAM Memory, User Authorization)
- DNS Names
  - FQDN: svcName + nsName + svc.cluster.local: eg:. backend-on.ci.svc.cluster.local
- Context help to move between namespaces
  - file .kube/config

### Namespace manifest

- apiVersion: v1
- kind: Namespace
- metadata:
  - name: ns_name
  - labels:
    - label_tag: label_name

## Limits & Requests

- Allows to define limits to a Pod level
- CPU
  - If the pod reach the maximun the pod stays alive with the limit
  - 1 CPU = 1000 milicores
- RAM
  - If the server reach the maximun the pod got restarted
- Options
  - Requests
    - How much resources are reserved per pod
  - Limits
    - How much resources are the maximum (not guarantee) per pod
- QoS
  - Guarantee: Requests equals to Limits
  - urstable: Limits greater than Requests
  - Best-efforts: No limits defined
- LimitRange
  - Allow to create a default limit to a pod when any limit was set
  - Allow to create a limit (min-max) to a pod

### LimitRange Manifest

- apiVersion: v1
- kind: LimitRange
- metadata:
  - name: lr_name
  - namespace: ns_name
- spec:
  - limits:
    - default:
      - memory:
      - cpu:
    - defaultRequest:
      - memory
      - cpu:
    - max:
      - memory:
      - cpu:
    - min
      - memory:
      - cpu:
    - type: Container

## ResourceQuota

- Allows to define limits to a namespace level

### ResourceQuota Manifest

- apiVersion: v1
- kind: ResourceQuota
- metadata:
  - name: rq_name
  - namespace: ns_name
- spec:
  - hard:
    - requests.cpu:
    - requests.memory:
    - limits.cpu:
    - limits.memory:
    - pods: #

## Probes

- Diagnostic tool in each node using Kubelet
- Methods
  - command expecting 0
  - Port TCP check
  - HTTP reply code 200-399
- Types
  - Liveness: If fails container inside pod is restarted
  - Readiness: If fails the pod is unregistered from the service endpoint
  - Startup: Liveness and Readiness got paused meanwhile Startup is executing. Useful for apps with large load times

## ConfigMap

- Object to store configurations using key-value
- Options for loading in Pod
  - Environment variable
  - Volume

### ConfigMap Manifest

- apiVersion: v1
- kind: ConfigMap
- metadata:
  - name: cm_name
- data:
  - key: value
  - key: value

## Secrets

- Allow to store sensitive data
- Secrets are coded by default using base64 (not encrypted)
- TIP. Use envsubst Tool to replace env variables in files
  - Exambple: envsubst < secure.yaml > tmp.yaml

### Secrets Manifest

- apiVersion: v1
- kind: Secret
- metadata:
  - name: secret_name
- type: Opaque
- data:
  - key: base64string
- stringdata:
  - key: string

## Volumes

- Allow to store persistent data
- Types:
  - emtpyDir
    - Volume at pod level, instead of container
  - hostPath
    - Volume at node level
  - Cloud
    - Uses volumes in cloud providers
  - PV
    - Persistent Volume
    - Uses PVC (Persistent Volume Claim)
    - Pod -> PVC -> PV -> Cloud
    - Reclaim Policy
      - After PVC is deleted
        - Retain: Store data and disk
        - Recycle: Delete data but disk is mantained
        - Delete: Delete data and disk
- PVC tries to connect to a PV with capacity and class
- PVC can connect to an specific PV using Selectors
- Provisioning classes
  - manual: A PV is created by the admin
  - standard: A PV is created by Kubernetes

### PV Manifest

- apiVersion: v1
- kind: PersistentVolume
- metadata:
  - name: pv_name
  - labels
    - type: local
- spec:
  - storageClassName: manual | standard
  - capacity:
    - storage:
  - accessNodes:
    - ReadWriteOnce
  - hostPath:
    - path:

### PVC Manifest

- apiVersion: v1
- kind: PersistentVolumeClaim
- metadata:
  - name: pvc_name
- spec:
  - storageClassName: manual
  - accessNodes:
    - ReadWriteOnce
  - resources:
    - requests:
      - storage:
  - selector:
    - matchLabels:
      - key: value
      - key: value

## RBAC

- Role Based Access Control
- Types
  - Role: Resource + Verb applied to an specific namespace
  - ClusterRole: Resorce + Verb applied to all namespaces
- Binding: Subject + Role
  - RoleBinding
  - ClusterRoleBinding
- Authentication using Certificates
  - Uses a CA (Certificate Authority) to sign certificates
  - Process: Generate Certificate, Generate CSR (Signing Request), Sign Certificate
  - CSR: CN=user, O=group
- Admin users should be assigned to ClusterRole named cluster-admin

### Role Manifest

- apiVersion: rbac.authorization.k8s.io/v1
- kind: Role
- metadata:
  - name:
  - namespace: default
- rules:
  - apiGroups: [""]
  - resources: ["pods"]
  - verbs: ["get", "watch", "list", ...]
  - apiGroups: ["apps"]
  - resources: ["deployments"]
  - verbs: ["*"]

### ClusterRole Manifest

- apiVersion: rbac.authorization.k8s.io/v1
- kind: ClusterRole
- metadata:
  - name:
- rules:
  - apiGroups: [""]
  - resources: ["pods"]
  - verbs: ["get", "watch", "list", ...]
  - apiGroups: ["apps"]
  - resources: ["deployments"]
  - verbs: ["get", "watch", "list", ...]

### RoleBinding Manifest

- apiVersion: rbac.authorization.k8s.io/v1
- kind: RoleBinding
- metadata:
  - name:
  - namespace: default
- subjects:
  - kind: User
  - name:
  - apiGroup: rbac.authorization.k8s.io
  - kind: Group
  - name:
  - apiGroup: rbac.authorization.k8s.io
  - kind: ServiceAccount
  - name:
  - apiGroup: ""
- roleRef:
  - kind: Role
  - name:
  - apiGroup: rbac.authorization.k8s.io

## Service Accounts

- Allow communication from a pod to the cluster
- Every pod is assigned to a Service Account
- Every namespace have its own serviceaccount by default

### Service Accounts Manifest

- apiVersion: v1
- kind: ServiceAccount
- metadata:
  - name:

## Ingress

- Simplify process to expose services
- Use subdomain (web.domain.com) or path (domain.com/web)
- Ingress
  - Where the rules are defined
- IngressController
  - Where the rules are applied

### Ingress Manifest

- apiVersion: networking.k8s.io/v1beta1
- kind: Ingress
- metadata:
  - name:
  - annotations:
- spec:
  - rules:
    - http:
      - paths:
        - path:
        - backend:
          - serviceName:
          - servicePort:
    - host:
    - http:
      - paths:
        - backend:
          - serviceName:
          - servicePort:

## Commands

- minikube start
- kubectl get pods
  - -l label_tag: label_name
- kubectl get pod pod_name
- kubectl get pod pod_name
  - -o yaml
  - -o wide
  - --watch
  - -n n_name
- kubectl run
  - --generator=run-pod/v1 pod_name
  - --image image_name
  - --namespace ns_name
- kubectl describe pod pod_name
- kubectl api-resources
- kubectl api-versions
- kubectl delete pod pod_name
- kubectl exec -it pod_name -- sh
- kubectl label pods pod_name new-label=label_name
- kubectl logs pod_name
  - -f tail
  - -c container_name
- kubectl apply -f yaml
  - --record (save CHANGE-CAUSE in deployments)
- kubectl delete -f file.yaml
- kubectl get replicaset
- kubectl get replicaset -o yaml
- kubectl describe replicaset rs_name
- kubectl describe replicaset rs_name
- kubectl get deployment
- kubectl get deployment --show-labels
- kubectl rollout status deployment dp_name
- kubectl rollout history deployment dp_name
  - revision=number
- kubectl rollout undo deployment dp_name --to-revision=number
- kubectl get services
- kubectl describe services svc_name
- kubectl get endpoints
- kubectl get namespaces
- kubectl get all -n ns
- kubectl create namespace ns_name
- kubectl describe namespaces ns_name
- kubectl config current-context
- kubectl config view
- kubectl config set-context context_name --namespace=ns_name --cluster= --user=
- kubectl config use-context context_name
- kubectl get nodes
- kubectl describe node node_name
- kubectl get limitrange
- kubectl describe limitrange lr_ame
- kubectl describe resourcesquotas rq_name
- kubectl create configmap cm_name --from-file=file_path
- kubectl get configmap cm_name
- kubectl create secret type secret_name --from-file=file_path
- kubectl get secrets
  - secret_name
  - -o yaml
- kubectl describe secrets secret_name
- kubectl get pv
    -- show-labels
- kubectl describe pv pv_name
- kubectl get storageclass
- kubectl edit
- kubectl config view
- kubectl config set-cluster cluster_name --server=http --certificate-authority=/ca.crt
- kubectl cluster-info
  - dump
- kubectl config set-credentials user
  - --client-certificate=
  - --cliente-key=
- kubectl config set-context ctx_name
  - --cluster=
  - --user=
- kubectl config use-context ctx_name
- kubectl get roles
- kubectl describe roles role_name
- kubectl get rolebinding
- kubectl describe rolebinding rb_name
- kubectl get clusterroles
- kubectl get serviceaccount
- kubectl describe serviceaccount sa_name
- kubectl get secret
- kubectl get secrets se_name
  - -o yaml
