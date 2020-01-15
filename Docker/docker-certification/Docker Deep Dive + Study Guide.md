# Ebook Docker Deep Dive - Summary

- [Ebook Docker Deep Dive - Summary](#ebook-docker-deep-dive---summary)
  - [Storage](#storage)
  - [Engine](#engine)
  - [Logs](#logs)
  - [Images](#images)
  - [Containers](#containers)
  - [Compose](#compose)
  - [Swarm](#swarm)
  - [Networking](#networking)
  - [Volumes](#volumes)
  - [Stacks](#stacks)
  - [Security](#security)
  - [Enterprise](#enterprise)
  - [Commands](#commands)
    - [General](#general)
    - [Docker Container](#docker-container)
    - [Docker Images](#docker-images)
    - [Docker Compose](#docker-compose)
    - [Docker Swarm](#docker-swarm)
    - [Docker Service](#docker-service)
    - [Docker Network](#docker-network)
    - [Docker Volume](#docker-volume)
    - [Docker Stack](#docker-stack)

## Storage

- Use Storage Drivers
- Per Node selection
- Config in /etc/docker/daemon.json
- Location /var/lib/docker/storage-driver/
- __storage-driver__ types
  - aufs
    - Use for older versions of Ubuntu
  - overlay2
    - Use for recents version of Ubuntu/RedHat
  - devicemapper
    - loopback mounted sparse files: Default (No suitable for PROD)
    - direct-lvm: Config using __storage_opts__
    - Use for olders version of RedHat
  - btrfs
    - Use for SUSE
  - zfs
  - windowsfilter

## Engine

- Docker Engine
  - Components
    - Docker Client
      - CLI
      - Talks to daemon using IPC/Unix socket at /var/run/docker.sock
      - Optional use network TCP Ports 2375 (unencrypted) & 2376 (encrypted)
    - Docker Deamon
      - REST API
      - Image management
      - Image build
      - Authentication
      - Security
      - Core networking
      - Orchestation
    - containerd
      - Container supervisor, manage lifecycle (start | stop | pause)
      - Image management (push | pull)
    - shim
      - Enable daemonless containers
      - Container parent process
      - Keep STDIN/STDOUT streams open
      - Report container exit status to the daemon
    - runc
      - Container runtime (interface to kernel)
      - Create containers
  - Docker Engine on Linux
    - dockerd
    - docker-containerd
    - docker-containerd-shim
    - docker-runc

## Logs

- Config in daemon.json
- Verbosity
  - debug=true
  - log-level
    - debug
    - info
    - warn
    - error
    - fatal
- Drivers (log-driver)
  - Types
    - json-file (default)
    - journald (linux only with systemd)
    - syslog
    - splunk
    - gelf
  - Requires
    - Process in container running with PID 1
    - Using STDOUT/STDERR

## Images

- Registries
  - Repositories of images
  - Types: Official and Unofficial
- Naming
  - __repository__:__tag__
  - latest is not always the most updated
- Filters
  - dangling: untagged image
  - before: requires image id and return images created before
  - since:  requires image id and return images created after
  - label
- Layers
  - snapshooter: responsible for stacking layers and presenting as a unified FS
  - Has its own distributed hash
- Multi-architecture
  - Registry API supports manifest list and manifest
    - manifest list: architecture
    - manifest: layers

## Containers

- Restart Policies
  - always: start again when daemon is restarted
  - unless-stopped: do not start when daemon is restarted
  - on-failure: restart if exist with a non-zero exit code. Start again with daemon
- Containerizing
- Build context is the directory containing the app
- Dockerfile
  - ARG: Defines Variable. Metadata
  - FROM: Base image. Layer
  - LABEL: Metadata (eg. maintainer)
  - RUN: Execute commands. Layer
  - COPY: Copy app files. Layer
  - WORKDIR: Set working directory. Metadata
  - EXPOSE: Documentacion about networking ports. Do not expose. Metadata
  - ADD: Add files. Layer
  - USER: UID/GID
  - CMD: Provide defaults. Only one per Dockerfile. Metadata
  - ENTRYPOINT: Set main app, run as executable. Metadata
  - HEALTCHECK: How test container. Metadata
  - #: Use for comments
- Required info to upload to Docker Hub
  - Registry
  - Repository
  - Tag
- Multi-Stage
  - Best practice for making smaller and secure images
  - Use multiple FROM statements
    - FROM image AS layer_name
-Best practices
  - Cache
    - Use cache to speed up process time
    - If a layer doesn't exist in cache, all the rest instructions won't use it
    - Use flag --no-cache=true to ignore cache
  - Squash
    - Use when a 1-layer image is needed to reuse later
    - Use flag --squash
    - Push/Pull requires the entire image to be transferred
  - Linux APK
    - Use the no-install-recommends to avoid unwanted packages
- Facts
  - Docker daemon have a priority to avoid kernel kill it when there's a memory issue
  - Docker containers doesn't have that priority
  - Limits can be set at Memory, CPUs or GPUs

## Compose

- Top Level keys
  - version: mandatory
  - services: apps
  - networks
    - default bridge
    - use driver to specify different network types
    - if apps share same network, they can resolve each other by name
  - volumes
  - secrets
  - configs

## Swarm

- Quorum
  - Raft consensus
    - Failure tolerance: (N-1)/2
    - Quorum: (N/2)+1
- Node Types
  - managers
    - One is the Leader
    - The rest proxies the commands to the Leader
    - Deploy odd number of managers, 3 or 5 is enough
    - Interconect them using high speed reliable networks
  - workers
- TCP Ports
  - 2377 tcp: client to daemon communication
  - 7646 tcp/upd: control plane gossip
  - 4789 udp: VXLAN-based overlay networks
- Replication mode
  - replicated: distributed evently accross the cluster
  - global: single instance in every node
- Networks
  - ingress mode
    - Redirect traffic to any host to replicas
    - Uses a layer 4 routing called Service Mesh
  - host mode: Publish service only in the node running replicas
- Facts
  - Pending service are services that can't be started (all nodes down, too much memory required, replicas=0)

## Networking

- Components
  - Container Network Model (CNM)
    - Sandboxes: Isolated stacks. Ethernet interfaces, port, routes, dns
    - Endpoints: Virtual interfaces. Connect Sandbox to Network
    - Networks: Software 802.1d bridge (switch)
  - libnetwork: CNM docker implemenentation written on Go
    - service discovery
    - network control plane
    - management plane
    - ingress-based container load balacing
  - Drivers: extend capabilities such as VXLAN
    - Responsible for data plane
    - Use driver_opts (encrypted: 'yes') for data plane
    - Control plane is encrypted by default
    - Encryption bring 10% of overhead in traffic
    - Types
      - Linux built-in
        - bridge
        - overlay
        - MACVLAN
      - Windows built-in
        - nat (bridge)
        - overlay
        - transparent (vlans)
        - l2bridge
      - Third Party (remote drivers)
        - calico
        - contiv
        - kuryr
        - weave
- Network Types
  - Single-host bridge
    - Default network for Docker Engine
    - Allow only connection in the host
    - Default bridge network don't support DNS
    - User-created bridge networks support DNS
    - Port Mapping: Doesn't scale, use for development or small applications
  - Multi-host overlay
    - Enable layer2 connection over multiple hosts
    - Network is only available to workers nodes when there's a container attached to it
    - Uses VXLAN primer tunnels
    - A virtual switch (Br0) is created inside the sandbox
    - Each end of the tunnel is terminated by VXLAN Tunnel Endpoint (VTEP). UDP 4789
    - Each container gets its own virtual ethernet (veth)
    - veth --> Bro --> VTEP
    - Supports Layer 3 routing when using the --subnet option in the network creation
      - This creates a new virtual switch (Br1)
  - MACVLAN
    - Allow connection to non-containers apps or existing networks VLANS
    - Give MAC & Address to each containers
    - Supports VLAN trunking
    - Requires
      - Promiscuous mode in the NIC which isn't allowed in cloud
      - subnet, ip-range, gateway, parent interface
- Service Discovery
  - Allows containers and swarm services locate containers by name in the same network
  - Uses an internal DNS service
  - Custom dns with --dns and -dns-search flags
- Ingress Load Balancing

## Volumes

- Allows persist data
- Volumes are created with default local driver
- Main drivers
  - Block Storage
    - Examples: HPE 3PAR, Amazon EBS, OpenStack Block Storage
  - File Storage
    - Examples: NetApp FAS, Azure File Storage, Amazon EFS
  - Object Storage
    - Examples: Amazon S3, Ceph, Minio

## Stacks

- Use docker-compose.yml files
- Can define secrets
  - For previoulsy created passwords use external: true
  - For inline passwords use file: filename
- Docker Stack doesn't support building images, Docker Compose does
- Every service need a network to be attached, otherwise a default is created
- Re-deploying the stack will only update changed components
- Components
  - version
  - services
    - service
      - image
      - ports
        - "outside_port:inside_port"
      - secrets
        - source
        - target
      - networks
      - environments
      - stop_grace_period : 10s*
      - volumes
      - deploy
        - placements
          - constraints
            - node.id | node.hostname | node.role | engine.labels.operatingsystem | node.labels.zone
        - replicas
        - update_config
          - parallelism
          - failure_action: rollback | pause* | continue
        - restart_policy
          - condition: on-failure | always
          - delay
          - max_attempts
          - window
  - networks
    - network
      - driver
      - driver_opts
        - encrypted
  - secrets
    - secret
      - external | file

## Security

- Layers
  - Docker
    - Secrets Management
    - Docker Content Trust (DCT)
      - Allows sign images and verify integrity
      - In Docker Universal Control Plane (Docker Enterprise)
        - Can be enabled running only signed images by an specific company team
    - Security Scanning
      - Analyze image vulnerabilities and provides reports
      - Available for private repos in Docker Hub and Docker Trusted Registry
    - Swarm Mode
      - Cryptographic node ID's
      - Mutual authentication via TLS
        - Certificate --> Signature --> Subjet
          - O: Swarm ID
          - OU: Swarm Role
          - CN: Node ID
      - Secure join tokens
        - PREFIX + VERSION + SWARM ID + TOKEN
        - SWMTKN-1-1-dmtwusdcdercrertu-dhwcehcxzpojlan
      - CA configuration with automatic certificate rotation
      - Encrypted cluster store
        - Cluster config and state
        - Based on etcd implementation
        - Replicated to all managers
      - Encrypted networks
  - Linux
    - seccomp
      - Default (customizable) profile to limit syscall to the kernel
    - Mandatory Access Control (MAC)
      - Default (customizable) profile for AppArmor/SELinux
    - Capabilities
      - Set limits when acting as root users
    - Control Groups (cgroups)
      - Set limits for CPU, RAM and Disk I/O
    - Kernel namespaces
      - Allows to isolate networks and libraries
        - pid: Process
        - net: Network
        - mnt: Mount Filesystem
        - ipc: Inter-Process Communication (Shared memory access)
        - uts: Hostname
        - users: Optional
- Daemon
  - Deamon Mode: Daemon accepts only authenticated clients
  - Client Mode: Client connect only to Daemon with valid certificates

## Enterprise

- Docker Enterprise Edition (EE)
  - Components
    - Docker Trusted Registry (DTR)
      - Infrastructure
        - Recommended 3 Instances
        - Backup/Restore DTR info using container
    - Docker Universal Control Plane (UCP)
      - Infrastructure
        - Recommended 3 or 5 Managers
        - Backup/Restore swarm info using tar
        - Backup/Restore UCP info using container
    - Docker EE
  - Features
    - Role-based access control (RBAC)
      - UCP and DTR use the database for principals
      - Subject + Role + Collection (resources: Eg DEV, TEST, PROD) + Grant
      - Grant: Who, What, Which
      - Manages also nodes, allowing DEV deploy only in DEV machines
    - Active Directory integration
      - Sync against an external LDAP database
    - Docker Content Trust (DCT)
      - Enabled using export DOCKER_CONTENT_TRUST=1
      - Keys (~/.docker/trust)
        - Root Key
        - Repository Key
    - Docker Trusted Registry
    - Image Promotion
      - Policy-based promotion to other repos
    - HTTP Routing Mesh (HRM)
      - Application load balancer

## Commands

### General

- docker version
- docker system info
- docker system prune
- docker attach container_id

### Docker Container

- docker container run -it image_name /bin/bash
  - Ctrl + PQ (exit without terminating container)
- docker container ls
- docker container exec -it container_id /bin/bash
  - Attach terminal to container
- docker container run image_name app
- docker container run
  - -d: Daemon mode
  - --name container_name
  - --publish outside_port:inside_port
  - --net-alias dns_name
  - --mount source=container_dir,target=host_dir
  - --cidfile="": Write container ID to a file
  - --rm -v: Remove volume
  - --network network_name: Only one
  - image_name
  - command
- docker container stop container_id
- docker container rm container_id
- docker container rm -f container_id
- docker container ls -a
- docker container pause container_id
- docker container unpause container_id
- docker container inspect container_id
  - --format='{{range.NetworkSettings.Network}}{{.IPAddress}}{{end}}'
- docker container logs container_id

### Docker Images

- docker image pull image_name
- docker image pull -a image_name
  - Pull all tags
- docker image pull image_name@digests
- docker image ls
- docker image ls --filter dangling=true
- docker image ls --filter=reference="*:latest"
- docker image ls --format "{{.Repository}}: {{.Tag}}: {{.Size}}
- docker image ls --digests image:name
- docker image build -t image_name .
- docker image rm image_id
- docker image rm $(docker image ls -q) -f
- docker image prune
  - option -a: unused images
- docker image inspect image_name
- docker image history image_name
- docker search image_name
- docker search image_name --filter "is-official=true"
- docker search image_name --filter "is-automated=true" --limit=5
- docker image build -t image:tag .
  - -f to specify a Dockerfile location
- docker login
- docker image tag current_tag new_tag
- docker image tag image:tag repository/image:tag
- docker image push image:tag
- docker image save
- docker image load

### Docker Compose

- docker-compose up
  - -f specify a different compose file
  - -d daemon mode
  - & foreground
- docker-compose down
- docker-compose ps
- docker-compose top
- docker-compose stop
- docker-compose rm
- docker-compose restart

### Docker Swarm

- docker swarm init
  - --advertise-addr IP: nodes should be connect to this IP
  - --listen-addr IP: ip use to listen for swarm traffic
  - --autolock: initialize with lock feature
- docker node ls
- docker node update
  - --label-add-xxx=
  - --label-rm
  - --role
  - node
- docker node inspect
- docker node ps
- docker node rm
- docker node demote | promote
- docker swarm join-token manager | worker
- docker swarm join --token token
  - --advertise-addr: nodes should be connect to this IP
  - --listen-addr: ip use to listen for swarm traffic
- docker swarm update
  - --autolock=true | false
  - --cert-expiry
- docker swarm unlock-key
  - --rotate
- docker swarm unlock
  - after prompt provide unlock key
- docker swarm join-token --rotate manager | worker

### Docker Service

- docker service create
  - --name app_name
  - --p outside_port:inside_port
  - --publish=outside_port,target:inside_port,mode=host
  - --replicas #replicas
  - --network network_name
  - --log-driver driver
  - --log-opts opts
  - --secret
  - --mount
  - image
- docker service ls
- docker service ps service_name
- docker service inspect service_name
  - --pretty
  - --mode global
- docker service scale service_name=#replicas
- docker service rm service_name
- docker service update
  - --image image_name
  - --update-parallelism 2
  - --update-delay 20s
  - --replicas
  - service_name
- docker service logs service_name | replica_id
  - --tail #lines
  - --follow
  - --tail
- docker service rollback

### Docker Network

- docker network ls
- docker network inspect network_name
- docker network create
  - --driver type
  - --subnet
  - ip-range
  - --gateway
  - -o encrypted (to encript data plane)
  - -o parent=host_interface
  - network_name
- docker network prune
- docker network rm network_name
- docker port container_id
- docker network connect network_name container_id

### Docker Volume

- docker volume create volume_name
- docker volume ls
- docker volume inspect volume_name
- docker volume prune
- docker volume rm

### Docker Stack

- docker stack deploy
  - -c docker-compose.yml
  - stack_name
- secrets
  - openssl req -newkey rsa:4090 -nodes -sha -keyout domain.key -x509 -days 365 -out domain.crt
- docker secret create secret_name domain.crt
- echo staging | docker secret creat staging_token -
- docker secret ls
- docker stack deploy -c docker-file.yml stack_name
- docker stack ls
- docker stack ps stack_name
- docker stack services stack_name
- docker stack rm stack_name
