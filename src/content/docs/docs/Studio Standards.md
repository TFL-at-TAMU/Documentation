---
title: "Studio Standards"
source_id: "18tCTlU0UNB3uQKCUchyYrwePzmDXr_XogTUdvFe06ws"
modified: "2026-04-07T15:24:29.204Z"
---

# Shop Standards & SOP

Document Purpose:  
This SOP defines the software, hardware, and workflow standards for the shop. It ensures consistency, quality, and safety across all operations.

Scope:  
Applies to anyone who uses the shop’s machines, software, and file management systems.

Responsibilities:  
Staff are responsible for ensuring compliance, maintenance, and training.

* * *

## 1\. Software Standards

### 1.1 3D Modeling (CAD)

  * Primary Software: Fusion 360  

  * Secondary / Legacy Software: SolidWorks  

  * File Formats: .f3d, .step, .iges  

  * Modeling Standards:  



  * Units: [mm/in]
  * Naming convention: [LastName/ProjectName_Part_Version]  




### 1.2 3D Printing – FDM

  * Slicer:


  * Bambu Studio for Bambu Lab printers
  * IdeaMaker for Raise3D E2 printer  



  * Filament Standards: 


  * Approved brands only, confirm with staff if using personal filament  



  * Print Approval Process: 


  * Printers available on first come first serve basis
  * FOR THE FUTURE: long prints started to go over night



  * Filament Inventory: 


  * [3dfilamentprofiles.com](<https://www.google.com/url?q=http://3dfilamentprofiles.com&sa=D&source=editors&ust=1776804143932700&usg=AOvVaw0Tmdx7npIib8ckCjqIdfJk>)  
(set to custom link - staff)  




### 1.3 3D Printing – SLA / Resin 

  * Slicer Software:


  * Elegoo SatelLite for Elegoo Printer 
  * PreForm for Formlabs 3  



  * Supported Printers: 


  * Elegoo Saturn 4 Ultra 16k 
  * Formlabs 3  



  * Resin Types: 


  * Elegoo Standard Density 1.150 (unsure of the other approved resins; this is what is currently in the printer)
  * Formlabs official resins - tough, durable, clear, and flexible on lab stock  



  * Post-Processing: Wash → Cure → Remove Supports → Sand → Finish/Paint  

  * PPE Requirements: Gloves, goggles, ventilation, etc.



### 1.4 3D Scanning

  * Scanner software: Creality Scan 4  

  * Post-Processing Software: Any mesh processor/editor (Ex. Blender)  

  * File Formats: .OBJ, .STL, .3MF  

  * Accuracy Standards: Smallest listed tolerance: 0.2mm   




### 1.5 CNC (Mill / Router / Lathe)

  * CAM Software: Autodesk Fusion 360 (Manufacturing Extension optional), CarveraCAM
  *   * Control Software: Carvera Controller Community Edition  

  * Supported Machines: Carvera  

  * File Formats: Carvera only processes .nc files  

  * Tool Library Standards: Download from [@ CNC Mill Folder]  




### 1.6 Laser Cutter

  * Design Software: [Name]  

  * File Formats: [Accepted formats]  

  * Materials: [Approved / prohibited]  

  * Focus & Power Presets: [Values per material]  

  * Ventilation & Safety Rules: [Requirements]  




### 1.7 Pick-and-Place / Part Placer

  * Control Software: N/A  

  * File Formats: CSV  

  * Feeder Standards: Placing component on the origin the same as in the design  

  * PCB Setup: [Fiducials, alignment]  




### 1.8 Solder Reflow Oven

  * Control Software: [Name]  

  * Reflow Profiles: [Temperature and time]  

  * Supported Paste Types: [Lead-free, etc.]  

  * PCB Size Limitations: [Max/min dimensions]  




### 1.9 Electronics Design

  * Schematic / PCB Software: [Name]  

  * Library Management: [Standards for symbols & footprints]  

  * Naming & Revision: [Rules for versioning]  

  * DRC / ERC Requirements: [Checks before manufacturing]  




* * *

## 2\. File Management & Documentation

### 2.1 File Sharing & Storage

  * Platform: Google Drive  

  * Access Permissions: Staff can edit, users can view, upload and export to machines  

  * External Sharing Rules: check with staff for method  




### 2.2 File Naming Conventions

  * Project folders: [ProjectName]  

  * CAD files: [ProjectName_Part_Version.f3d]  

  * CAM files: [ProjectName_Machine_Version.nc]  

  * Documentation: [ProjectName_DocType_Dates



* * *

## 3\. Hardware & Machine Standards

### 3.1 Machine Booking / Usage

  * Reservation System: [Tool / calendar]  

  * Time Limits: [Max per user per day]  

  * Cleanup Requirements: [Remove scraps, wipe surfaces]  




### 3.2 Maintenance & Calibration

  * Responsible Party: [Name / Role]  

  * Schedule: [Weekly, monthly, quarterly]  

  * Logging: [Form / software]  




### 3.3 Consumables Management

  * Filament: Free to grab (report when empty)  

  * Resin: Free to grab (if you are comfortable with SLA printing and handling Resin)  

  * End mills / bits: Free to grab (Report if broken)  

  * Laser materials: Check out from staff  

  * Solder paste: Free to grab  

  * Anything on the open rack is free to grab, otherwise it must be checked out with staff  




* * *

## 4\. [Safety Standards](<Fab Lab Safety & Emergency Manual.md>)

### 4.1 General Shop Safety

  * General PPE Required: close-toed shoes, non-loose fitting clothing and jewelry  

  * Laser PPE Required: [idk guys can yall fill this in]  

  * Emergency Procedures: [Exits, fire extinguishers, first aid]  




### 4.2 Machine-Specific Safety

  * CNC: [Hazard zones, interlocks]  

  * Laser Cutter: [Eye protection, ventilation] (Add more here)  

  * SLA Printing: [Gloves, respirator, resin handling]  

  * Soldering / Reflow: [Fume extraction, heat hazards]  




### 4.3 Chemical Handling

  * Resins / Solvents: [Storage, handling]  

  * Flux / Cleaners: [Disposal, PPE]   

  * Waste Disposal: [Hazardous / non-hazardous procedures]  




* * *

### 5.1 Measurement Tools

  * Calipers, micrometers, gauges (micrometers not available rn)  

  * Calibration frequency: [Weekly / monthly] (once a semester maybe, I mean we don't have gauge blocks…)  




### 5.2 Training & Onboarding

  * Not needed at the moment