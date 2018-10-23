const canonicalProducts = {
  flagships: [
    {
      title: 'Canonical',
      url: 'https://www.canonical.com/',
      logoUrl: 'https://assets.ubuntu.com/v1/47ba7e44-picto-canonical-white.svg',
      description: 'Canonical is the global software company behind Ubuntu and is the number-one Ubuntu services provider',
    }, {
      title: 'Ubuntu',
      url: 'https://www.ubuntu.com/',
      logoUrl: 'https://assets.ubuntu.com/v1/c5cb0f8e-picto-ubuntu.svg',
      description: 'The world’s most popular Linux for servers, desktops and things, with enterprise support and enhanced security by Canonical',
    }, {
      title: 'MAAS',
      url: 'https://maas.io/',
      logoUrl: 'https://assets.ubuntu.com/v1/0de4fcd5-logo-maas-icon.svg',
      description: 'Create a bare-metal cloud with Metal as a Service for IPAM and provisioning',
    }, {
      title: 'Landscape',
      url: 'https://landscape.canonical.com/',
      logoUrl: 'https://assets.ubuntu.com/v1/4964d639-landscape-logo.svg',
      description: 'Systems management for Ubuntu - updates, package management, repositories, security, and regulatory compliance dashboards',
    }, {
      title: 'Juju',
      url: 'https://jujucharms.com/',
      logoUrl: 'https://assets.ubuntu.com/v1/31c507a5-logo-juju-icon.svg',
      description: 'Model-driven multi-cloud operations for applications. On-premise or on-cloud SAAS app store, with big data, k8s and openstack solutions',
    }, {
      title: 'LXD',
      url: 'https://linuxcontainers.org/',
      logoUrl: 'https://assets.ubuntu.com/v1/425efe3a-lxd.svg',
      description: 'A pure-container hypervisor. Replace legacy app VMs with containers for speed and density',
    }, {
      title: 'Snaps',
      url: 'https://snapcraft.io/',
      logoUrl: 'https://assets.ubuntu.com/v1/82dc2022-snapcraft-primary-icon.svg',
      description: 'A single secure package and auto-update system for Ubuntu, Debian, Arch, Centos, Amazon Linux',
    }, {
      title: 'OpenStack',
      url: 'https://mongoose.ubuntu.com/openstack',
      logoUrl: 'https://assets.ubuntu.com/v1/a7916513-picto-openstack.svg',
      description: 'The world’s first choice for OpenStack - the leader in density and cost per VM',
    }, {
      title: 'Kubernetes',
      url: 'https://mongoose.ubuntu.com/kubernetes',
      logoUrl: 'https://assets.ubuntu.com/v1/b81a45e4-kubernetes.svg',
      description: 'Canonical works with Google GKE and Azure AKS for app portability between private and public infrastructure',
    },
  ],
  others: [
    {
      title: 'Enterprise Support',
      url: 'http://www.ubuntu.com/support',
      description: 'Canonical supports Ubuntu for clouds, data centers and devices',
    }, {
      title: 'Image Service',
      url: 'https://cloud-images.ubuntu.com/',
      description: 'Hardened Ubuntu images on AWS, Google, KVM, VMware, MAAS, LXD',
    }, {
      title: 'Cloud-init',
      url: 'https://cloud-init.io/',
      description: 'Apply user data to your instances automatically',
    }, {
      title: 'Mir',
      url: 'https://wiki.ubuntu.com/Mir',
      description: 'Ultra-fast and light Wayland compositor for secure device display management',
    }, {
      title: 'Conjure-up',
      url: 'https://conjure-up.io/',
      description: 'Summon up a big-software stack as a “spell” using conjure-up to get you a fully installed and usable stack',
    }, {
      title: 'Netplan',
      url: 'http://www.netplan.io/',
      description: 'Easily configure your networks using Netplan, a YAML network configuration abstraction for various backends',
    },
  ],
  resources: [
    {
      title: 'Webinars',
      url: 'https://blog.ubuntu.com/?category=webinars#posts-list',
    }, {
      title: 'Tutorials',
      url: 'https://tutorials.ubuntu.com/',
    }, {
      title: 'Videos',
      url: 'https://blog.ubuntu.com/?category=videos#posts-list',
    }, {
      title: 'Case studies',
      url: 'https://blog.ubuntu.com/?category=case-studies#posts-list',
    }, {
      title: 'White papers',
      url: 'https://blog.ubuntu.com/?category=white-papers#posts-list',
    }, {
      title: 'Docs',
      url: 'https://docs.ubuntu.com/',
    }, {
      title: 'Training',
      url: 'https://mongoose.ubuntu.com/cloud/training',
    }, {
      title: 'Blog',
      url: 'https://blog.ubuntu.com/',
    }, {
      title: 'Developer',
      url: 'https://developer.ubuntu.com/',
    }, {
      title: 'Install',
      url: 'https://mongoose.ubuntu.com/download/cloud',
    }, {
      title: 'Download',
      url: 'https://mongoose.ubuntu.com/download',
    },
  ],
  abouts: [
    {
      title: 'Ubuntu',
      url: 'https://www.ubuntu.com/',
    }, {
      title: 'Canonical',
      url: 'https://www.canonical.com/',
    }, {
      title: 'Press centre',
      url: 'https://blog.ubuntu.com/press-centre',
    }, {
      title: 'Partners',
      url: 'https://partners.ubuntu.com/',
    }, {
      title: 'Merchandise',
      url: 'https://shop.canonical.com/',
    }, {
      title: 'Contact',
      url: 'https://mongoose.ubuntu.com/about/contact-us',
    },
  ],
};

const canonicalLogins = [
  {
    title: 'Ubuntu Advantage',
    logoUrl: 'https://assets.ubuntu.com/v1/c5cb0f8e-picto-ubuntu.svg',
    description: 'Enterprise support service to manage and add value to your Ubuntu deployment',
    login: 'http://support.canonical.com/',
    signup: 'https://buy.ubuntu.com/',
  }, {
    title: 'Landscape',
    logoUrl: 'https://assets.ubuntu.com/v1/4964d639-landscape-logo.svg',
    description: 'Manage, deploy, and monitor your Ubuntu servers',
    login: 'https://landscape.canonical.com/login/authenticate',
  }, {
    title: 'Livepatch',
    logoUrl: 'https://assets.ubuntu.com/v1/47ba7e44-picto-canonical-white.svg',
    description: 'Apply critical kernel security fixes without rebooting',
    login: 'https://auth.livepatch.canonical.com/',
    signup: 'https://auth.livepatch.canonical.com/',
  }, {
    title: 'Launchpad.net',
    logoUrl: 'https://assets.ubuntu.com/v1/6b318257-launchpad-icon.png',
    description: 'The software collaboration platform behind Ubuntu',
    login: 'https://launchpad.net/+login',
  }, {
    title: 'Snapcraft.io',
    logoUrl: 'https://assets.ubuntu.com/v1/82dc2022-snapcraft-primary-icon.svg',
    description: 'Manage your snaps and snap store(s)',
    login: 'https://snapcraft.io/account',
  }, {
    title: 'JAAS',
    logoUrl: 'https://assets.ubuntu.com/v1/31c507a5-logo-juju-icon.svg',
    description: 'Deploy, configure, scale and operate your software on public and private clouds',
    login: 'https://jujucharms.com/login/',
  },
];

export { canonicalProducts, canonicalLogins };
