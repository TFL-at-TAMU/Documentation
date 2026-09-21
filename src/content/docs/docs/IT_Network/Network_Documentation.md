---
title: Network_Documentation.md
---

# Fabrication Lab Network Documentation

The Fabrication Lab network is available for testing and validating IoT projects, prototyping networked systems, and developing local or cloud-integrated services.

## Required Reading

Before using the network, review:

- [TAMU Network Policies](https://www.it.tamu.edu/security-and-policy/it-policy/it-policy-guides/network-access.html)
- [Prohibited Use Technologies](https://www.it.tamu.edu/security-and-policy/it-policy/laws-regulations/texas-prohibited-technologies.html)

## General Requirements

- All network use must comply with TAMU Network Policies and rules governing Prohibited Use Technologies.
- The Fabrication Lab network is intended for approved projects requiring IoT, networking, or cloud capabilities.
- Projects must follow the requirements in this document and receive approval from the Fabrication Lab IT Lead before connecting devices to the network.

> The current Fabrication Lab IT Lead is **Aden Mann**, reachable at **adenmann@tamu.edu**.

## Network Structure

The Fabrication Lab operates three networks:

| Network Name | IP Range | Intended Use |
|---|---|---|
| `TamuFabLab_MACHINES` | `10.10.2.1 - 10.10.2.255` | Fabrication equipment and machine management |
| `TamuFabLab_USER` | `10.10.1.1 - 10.10.1.255` | Student projects and devices |
| `TamuFabLab_Admin` | `192.168.1.1 - 192.168.1.255` | Staff network testing and administration |

## Project Approval

Projects are divided into three approval categories:

### 1. Prototyping Class Projects

These projects are **automatically approved**. The IT Lead will provide student teams with the required network configuration, prepared devices where applicable, and relevant documentation.

### 2. Student Organization Projects

These projects are reviewed **on a case-by-case basis** by the IT Lead.

A designated **student organization representative** will normally be responsible for ensuring the project complies with Fabrication Lab IT guidelines.

### 3. Student Personal Projects

Personal projects must be **scoped and reviewed by the IT Lead** before devices are connected to the network.

## Proposing a Project

To request project approval, email **adenmann@tamu.edu** with the subject:

> **Fab Lab Project Proposal: [Name or Student Organization Name]**

Include a brief description of the project, expected network requirements, and the devices or services that will be connected.

## Network Guidelines

1. **Follow university policy.**  
   All projects must comply with [TAMU Network Policies](https://www.it.tamu.edu/security-and-policy/it-policy/it-policy-guides/network-access.html) and [Prohibited Use Technologies](https://www.it.tamu.edu/security-and-policy/it-policy/laws-regulations/texas-prohibited-technologies.html).

2. **Use only assigned IP addresses.**  
   Each project will receive an allocated IP range. Project devices must use static IP addresses within that range. Devices operating outside their assigned range may be disconnected from the network.

3. **Assign clear hostnames.**  
   Every project device must use a descriptive and identifiable hostname.

4. **Do not expose project servers directly to the public internet.**  
   Projects may host services accessible within the Fabrication Lab network and may communicate with approved cloud infrastructure over HTTPS. Publicly accessible web servers may not be hosted on the Fabrication Lab network.

5. **Permit staff inspection.**  
   Project owners must allow Fabrication Lab staff to inspect connected equipment or network configurations with at least 24 hours' notice.

> **Projects that violate these requirements may be disconnected from the Fabrication Lab network at the discretion of the Fabrication Lab IT Lead, with or without prior notice.**