import { ProfileData } from './types';

// This data simulates the output of the CLI extraction tool based on the provided PDF
export const RESUME_DATA: ProfileData = {
  name: "Varishwar Tripathi",
  title: "Azure Infrastructure Engineer | Cloud Solutions Architect & AVD Specialist",
  summary: "Azure Infrastructure Engineer | Cloud Solutions Architect & AVD Specialist with over 10 years of MSP experience, delivering comprehensive cloud and infrastructure solutions for UK enterprise clients. Highly skilled in architecting and deploying Azure Virtual Desktop (AVD), Hybrid Identity, Intune MDM/MAM, Azure Networking, and Microsoft 365 E5 security frameworks. Certified in AZ-104, AZ-305, AZ-700, and AZ-140.",
  contact: {
    email: "Varishwartripathi@gmail.com",
    phone: "+91 7574080069",
    location: "Vadodara, India (Open to UK Remote)",
    linkedin: "https://www.linkedin.com/in/varishwar-tripathi-19809714b/"
  },
  skills: [
    {
      category: "Core Cloud & Virtualization",
      skills: ["Azure Virtual Desktop (AVD)", "Azure Infrastructure", "Shared Image Gallery (SIG)", "FSLogix Profile Containers", "Azure VMs", "VM Scale Sets", "Availability Zones"]
    },
    {
      category: "Infrastructure as Code (IaC)",
      skills: ["Terraform (5000+ user deployments)", "ARM Templates", "Bicep", "PowerShell DSC", "Azure Blueprints", "Policy as Code"]
    },
    {
      category: "Networking & Connectivity",
      skills: ["Azure VNet & Subnets", "VPN Gateway", "ExpressRoute", "Azure Firewall", "NSG & ASG", "Private Endpoints", "Hub-Spoke Topology", "Azure Front Door", "Load Balancer"]
    },
    {
      category: "Security & Compliance",
      skills: ["Zero Trust Architecture", "Microsoft Sentinel (SIEM)", "Defender for Cloud", "Azure Key Vault", "Conditional Access", "PIM", "ISO 27001", "Cyber Essentials"]
    },
    {
      category: "Identity & Access Management",
      skills: ["Entra ID (Azure AD)", "Azure AD Connect", "Hybrid Identity", "ADFS", "PHS/PTA", "Managed Identities", "SSO & MFA"]
    },
    {
      category: "Monitoring & Operations",
      skills: ["Azure Monitor", "Log Analytics", "Application Insights", "Azure Backup", "Site Recovery (DR)", "Cost Management & Optimization", "Azure Advisor"]
    },
    {
      category: "DevOps & Automation",
      skills: ["Azure DevOps Pipelines", "PowerShell Automation", "Git/GitHub", "CI/CD", "Custom Script Extensions", "Runbooks"]
    },
    {
      category: "Endpoint & Device Management",
      skills: ["Intune MDM/MAM", "Autopilot", "Windows 365", "Microsoft 365 E5", "Compliance Policies", "App Deployment"]
    }
  ],
  certifications: [
    { name: "Azure Solutions Architect Expert", level: "Expert", badgeColor: "bg-blue-600" },
    { name: "Azure Virtual Desktop Specialty", level: "Specialty", badgeColor: "bg-purple-600" },
    { name: "Azure Administrator Associate", level: "Associate", badgeColor: "bg-sky-500" },
    { name: "Azure Network Engineer Associate", level: "Associate", badgeColor: "bg-sky-500" },
    { name: "Azure Fundamentals", level: "Fundamentals", badgeColor: "bg-gray-500" }
  ],
  experience: [
    {
      company: "TwentyFour IT Services",
      role: "Azure Infrastructure Engineer",
      period: "Nov 2025 - Present (Current)", 
      details: [
        "Overseeing complete Azure infrastructure: VNets, NSGs, ASGs, routing, VPN, ExpressRoute.",
        "Designing Azure load-balancing with Front Door, App Gateway, and Layer-4 Load Balancer.",
        "Delivering Azure migration initiatives: On-prem to Azure (DCs, App servers, File servers).",
        "Facilitating VDI to AVD transitions with profile migration and cutover strategies."
      ]
    },
    {
      company: "TwentyFour IT Services",
      role: "Project Engineer",
      period: "Sep 2024 - Nov 2025",
      details: [
        "Delivered Azure infrastructure and migration projects across UK clients (SMB to enterprise).",
        "Built AVD environments using SIG and domain join automation.",
        "Migrated workloads: Exchange to EXO, SharePoint to SPO, File servers to Azure Files.",
        "Implemented Intune device management, Autopilot, and compliance policies."
      ]
    },
    {
      company: "TwentyFour IT Services",
      role: "2nd Line Support Engineer",
      period: "May 2021 - Sep 2024",
      details: [
        "Provided L2–L3 support for Windows, networking, virtualization, and Office 365.",
        "Troubleshot AVD/WVD session issues, FSLogix profiles, and storage latency.",
        "Administered O365 tenant, security, compliance, and hybrid Exchange setups.",
        "Assisted in early Azure adoption projects: VM creation and VNet setup."
      ]
    },
    {
      company: "Multiple Organizations",
      role: "Systems / Infrastructure Engineer",
      period: "Jan 2015 - Apr 2021",
      details: [
        "Managed on-prem servers, Active Directory, DNS, DHCP, and virtualization (Hyper-V/VMware).",
        "Performed Office 365 and Exchange migrations and hybrid identity setups.",
        "Provided L1–L2 support for networking (VLANs, routing, VPN) and firewalls."
      ]
    }
  ],
  keyProjects: [
    {
      title: "Enterprise AVD Deployment",
      client: "UK Education Sector",
      scope: "Deployed Azure Virtual Desktop for 5000+ users with Terraform automation, FSLogix profile management, and hybrid identity integration.",
      technologies: ["Terraform", "AVD", "FSLogix", "Azure AD Connect", "SIG", "Azure Files"],
      metrics: ["5000+ Users", "99.9% Uptime", "40% Cost Reduction", "2-week Deployment"],
      icon: "Monitor"
    },
    {
      title: "Azure Landing Zone Architecture",
      client: "Multi-National Enterprise",
      scope: "Designed and implemented Hub-Spoke network topology with ExpressRoute, Azure Firewall, and centralized governance using Azure Blueprints.",
      technologies: ["Hub-Spoke", "ExpressRoute", "Azure Firewall", "Blueprints", "Policy", "VNet Peering"],
      metrics: ["10+ Subscriptions", "Multi-Region HA", "Zero Trust Security", "£500K+ Project"],
      icon: "Network"
    },
    {
      title: "Cloud Migration Program",
      client: "UK Financial Services",
      scope: "Executed lift-and-shift migration of 200+ servers including Domain Controllers, SQL databases, and file servers with zero downtime.",
      technologies: ["Azure Migrate", "Site Recovery", "Azure Backup", "PowerShell", "DMS", "Azure Files"],
      metrics: ["200+ Servers", "Zero Downtime", "30% Cost Savings", "3-month Timeline"],
      icon: "CloudUpload"
    },
    {
      title: "Security & Compliance Overhaul",
      client: "Healthcare Organization",
      scope: "Implemented Microsoft Sentinel SIEM, Azure Security Center, and achieved ISO 27001 and Cyber Essentials Plus certification.",
      technologies: ["Sentinel", "Defender for Cloud", "Key Vault", "Conditional Access", "PIM", "Compliance Manager"],
      metrics: ["ISO 27001 Certified", "100% Compliance", "Threat Detection", "24/7 Monitoring"],
      icon: "Shield"
    }
  ],
  impactMetrics: [
    {
      value: "5000+",
      label: "Users Deployed",
      icon: "Users",
      color: "from-azure-500 to-cyan-500"
    },
    {
      value: "50+",
      label: "Azure Migrations",
      icon: "CloudUpload",
      color: "from-teal-500 to-emerald-500"
    },
    {
      value: "10+",
      label: "Years MSP Experience",
      icon: "Award",
      color: "from-purple-500 to-pink-500"
    },
    {
      value: "99.9%",
      label: "Uptime SLA",
      icon: "TrendingUp",
      color: "from-orange-500 to-red-500"
    },
    {
      value: "40%",
      label: "Average Cost Savings",
      icon: "DollarSign",
      color: "from-green-500 to-teal-500"
    },
    {
      value: "100+",
      label: "Clients Managed",
      icon: "Briefcase",
      color: "from-indigo-500 to-blue-500"
    }
  ]
};