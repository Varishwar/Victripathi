import { ProfileData } from './types';

// This data simulates the output of the CLI extraction tool based on the provided PDF
export const RESUME_DATA: ProfileData = {
  name: "Varishwar Tripathi",
  title: "Azure Infrastructure Project Engineer / AVD Specialist",
  summary: "Azure Infrastructure Project Engineer & AVD Specialist with over 10 years of MSP experience, delivering comprehensive cloud and infrastructure solutions for UK enterprise clients. Highly skilled in architecting and deploying Azure Virtual Desktop (AVD), Hybrid Identity, Intune MDM/MAM, Azure Networking, and Microsoft 365 E5 security frameworks. Certified in AZ-104, AZ-305, AZ-700, and AZ-140.",
  contact: {
    email: "Varishwartripathi@gmail.com",
    phone: "+91 7574080069",
    location: "Vadodara, India (Open to UK Remote)",
    linkedin: "https://www.linkedin.com/in/varishwar-tripathi-19809714b/"
  },
  skills: [
    {
      category: "Core Cloud",
      skills: ["Azure Virtual Desktop (AVD)", "Microsoft Azure Infrastructure", "Shared Image Gallery (SIG)", "FSLogix Profile Containers"]
    },
    {
      category: "Networking & Security",
      skills: ["Azure Networking (VNet, VPN, NSG)", "Azure Firewall", "Private Endpoints", "ExpressRoute", "Zero Trust Architecture"]
    },
    {
      category: "Identity & Governance",
      skills: ["Entra ID (Azure AD)", "Azure AD Connect", "Conditional Access", "Managed Identities", "PIM"]
    },
    {
      category: "Automation & IaC",
      skills: ["PowerShell Automation", "Terraform", "ARM Templates", "Bicep", "Custom Script Extensions"]
    },
    {
      category: "Endpoint Management",
      skills: ["Intune MDM/MAM", "Autopilot", "Microsoft 365 Security", "Defender for Cloud"]
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
  ]
};