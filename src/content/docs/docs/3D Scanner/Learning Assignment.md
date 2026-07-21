---
title: "3D Scanner Assignment"
source_id: "194i54qqa_iQznHNyoQzXdFTH-gsS9JlTBdRdOaQyMio"
modified: "2026-03-27T21:01:39.918Z"
---

3D Scanner Assignment - Cutting Board (?)[[a]](<#cmnt1>)

Machine Name: Creality Raptor Pro 3D Scanner

Location: The Fab Lab

Version: v1.0

Last Updated: 03/27/2026

Responsible Student Worker: Aidan Stewart

Linked Machine Manual: [3D Scanner (Creality Raptor Pro)](/docs/3d-scanner/3d-scanner-creality-raptor-pro/)

Assignment: Understand the use cases of a 3D scanner and scan an object.

## Part 1 – When should I use 3D scanning?

## Understanding when a 3D scanner is the right tool for the job—and when it’s not—will save you time and effort.

## 3D scanning is best used in cases where metrology using manual instruments such as calipers, micrometers, or even Coordinate Measuring Machines (CMMs) becomes impractical — particularly when dealing with complex geometries, large volumes of measurement points, or freeform surfaces. 

## An important distinction between calipers and a 3D scanner is accuracy. While even cheap calipers can reliably perform with an accuracy of 0.0005” or 0.01mm”, the Creality Raptor Pro 3D scanner has been tested to produce 0.1–0.2mm accuracy in practical scanning settings. [Unpacking the 20 Micron Accuracy Claim - Creality Scan Raptor PRO](<https://www.google.com/url?q=https://www.youtube.com/watch?v%3DUYjavPonUaE&sa=D&source=editors&ust=1776804255913668&usg=AOvVaw3iFjcS5vHsD88FUx18adbK>) For many cases, accuracy this low is unusable.

Still, there are many cases in which precise geometric tolerance is not the goal. One job where 3D scanning excels is in freeform scanning. When measuring things like automotive body panels or objects with various angles, it can often be difficult or entirely impossible to determine measurements using calipers and protractors. In these cases, 3D scanning can be quite precise. [It’s Time To Put A 3D Scanner In Your Toolbox](<https://www.google.com/url?q=https://www.youtube.com/watch?v%3DrORuE8Oyxd0&sa=D&source=editors&ust=1776804255914246&usg=AOvVaw1cbGhSkPIl1iE_SyNMElHF>)

## Below is a simple tradeoff table between calipers and 3D scanners.

Criteria| Digital Calipers| 3D Scanner  
---|---|---  
Typical Accuracy| ±0.01 mm| ±0.05–0.2 mm (Hobby-class)  
Measurement Range| 0–150 mm (typical)| ~5 mm – several meters  
Cost| $$ ($20–$500)| $$$$ ($500–$10,000)  
Freeform-Capable?| No| Yes  
Contact Required?| Yes| No  
Speed| Moderate (one point at a time)| Fast capture; slow post-processing  
Skill Required| Low–Moderate| Moderate–High  
Output| Single discrete measurements| Full 3D surface mesh  
Best For| Diameters, depths, steps, simple geometry| Organic shapes, reverse engineering, full-surface inspection  
Limitations| Cannot characterize curves or complex surfaces| Expensive; requires software; requires powerful computer; cannot measure hidden/internal features  
  
## Part 2 – Infrared vs. LASER

## The Creality Raptor Pro operates in three scanning modes: NIR (Near-Infrared) Structured Light, 7 Parallel Blue Laser Lines, and 22 Cross Blue Laser Lines. Understanding when to use each mode is important for getting a useful scan on your first attempt.

## Infrared (NIR) Structured Light works by projecting an invisible speckle pattern of infrared light onto the object. Two cameras observe how that pattern deforms across the surface, and the scanner reconstructs a 3D mesh from those deformations. Because the entire field of view is captured at once, NIR mode is fast — the Raptor Pro captures up to 3,580,000 measurements per second at 30 fps in this mode.

## Laser scanning works similarly: the scanner projects one or more lines of blue laser light across the object while cameras measure where the line bends or shifts. The Raptor Pro's blue lasers (405 nm wavelength) trace these lines across the part at up to 60 fps, building up a point cloud row by row.

## ![](../assets/images/3d_scanner_assignmen_1026f7050a.png)![](../assets/images/3d_scanner_assignmen_612c709f6a.png)

(Left) Scan using cross lines. (Right) Scan using Parallel lines.  
([https://www.reddit.com/r/3DScanning/comments/1knrtgo/metrox_cross_laser_vs_parallel/](<https://www.google.com/url?q=https://www.reddit.com/r/3DScanning/comments/1knrtgo/metrox_cross_laser_vs_parallel/&sa=D&source=editors&ust=1776804255921666&usg=AOvVaw0yh2qq59TaEG_rLQxEA_vR>))

## ![](../assets/images/3d_scanner_assignmen_e30fd343e0.png)

Structured Light 3D Scanning 

([https://bitfab.io/blog/3d-scanning-with-structured-light/](<https://www.google.com/url?q=https://bitfab.io/blog/3d-scanning-with-structured-light/&sa=D&source=editors&ust=1776804255922094&usg=AOvVaw0MUK9eqET9POdB85AOL6sz>))

Note: Both modes use structured light — they project a known pattern and measure its deformation. The difference is the light source: NIR uses a broadband infrared projector casting a dot/speckle pattern, while the laser modes use coherent blue laser diodes casting precise lines.

For the practical comparison of the three modes — accuracy, capture area, best object size, color capture — see the [manual's "Choosing scan and tracking modes" section](/docs/3d-scanner/3d-scanner-creality-raptor-pro/#choosing-scan-and-tracking-modes).

## Part 3 – Tracking Modes

The Raptor Pro supports three tracking modes in the Creality Scan software: Geometry, Texture, and Marker. Tracking mode determines how the scanner knows where it is in space relative to the object — it is a separate choice from your scanning light mode. Choosing the wrong tracking mode is one of the most common reasons a scan fails, so understanding each option is important.

All three modes — how each one tracks, what it's best for, its limitations, and marker-placement tips — are covered in the [manual's "Choosing scan and tracking modes" section](/docs/3d-scanner/3d-scanner-creality-raptor-pro/#choosing-scan-and-tracking-modes). Read it before you start Part 4: the assignment depends on choosing tracking modes deliberately.

## Part 4 – The Assignment

Generate a model of the cutting board. Use [3D Scanner (Creality Raptor Pro) manual](/docs/3d-scanner/3d-scanner-creality-raptor-pro/) to guide you through the process.

Hint: You will need more than one scan to complete this assignment, which must then be aligned to create a single model. Pay attention to what tracking mode you use for each scan.

## Questions or Help

If you have questions or need assistance at any point, ask a Fab Lab staff member. Staff are always present during operating hours.

* * *

End of Assignment

## 

[[a]](<#cmnt_ref1>)Need to make a run to goodwill and see what I can find