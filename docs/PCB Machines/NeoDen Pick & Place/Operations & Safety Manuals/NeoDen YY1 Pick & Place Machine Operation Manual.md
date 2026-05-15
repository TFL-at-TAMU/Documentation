---
title: "NeoDen YY1 Pick & Place Machine Operation Manual"
source_id: "1NziAJxvmAxhwgVn0cYvuTaAijBn6_zPkvphJZNzm5xQ"
modified: "2026-04-13T18:54:36.262Z"
---

NeoDen YY1 Pick & Place Machine Operations Manual

Machine Name: NeoDen YY1 Pick & Place Machine

Location: The Fab Lab

Version: v1.3

Last Updated: 04/07/2026

Responsible Student Worker: Juan Aldapa

Linked Safety Manual: [Link](<NeoDen YY1 Pick & Place Machine Safety Manual.md>)

## 1\. What This Machine Is For

Use this machine to:

  * Educational PCB assembly and training: Teaching students the full workflow of PCB design, component preparation, machine setup, and automated placement.
  * Low Volume Prototyping and Research Builds:  Assembling small batches of prototype boards for design verification, testing, and iteration
  * Rapid Proof of Concept Assembly: Quickly validating electronic designs before committing to full-scale manufacturing.



## 2\. What This Machine Is Not For

Do not use this machine for:

  * High Volume or Production Manufacturing: The YY1 is not intended for mass production, continuous operation, or industrial-scale assembly.
  * Very large PCB Assemblies: Boards exceeding 315 mm x 350 mm or requiring panelized production workflows.
  * Ultra Fine Pitch or Advanced Packaging Technologies: This includes BGA, CSP, flip-chip, or wafer-level packaging beyond the machine’s vision and placement accuracy capabilities, and beyond fiducial markings.



## 3\. What You Need Before You Start

Before operating this machine, ensure:

  * Trained Fab Lab staff present
  * Safety Acknowledgment: Safety manual acknowledgment and completion of the "Machine Basics" orientation.
  * PCB Preparation: Applied lead free soldering paste through stencil to the printed circuit board. 
  * File Preparation: A compatible CSV containing X, Y, Rotation coordinates, and component location exported from an EDA software, such as Fusion 360, Altium, KiCad, etc. 
  * Component Check: Ensure all required surface mount devices (SMD) are loaded into the tape feeders in the same feeder as defined in the CSV file, if external components are added, be sure that they are placed on a free slot, consider the following [document](<https://www.google.com/url?q=https://docs.google.com/spreadsheets/d/18dMiUAIPoFiYq0AChLLP8tyWiuEx4bR4EatctU6wq48/edit?usp%3Dsharing&sa=D&source=editors&ust=1776804266925355&usg=AOvVaw0FawXzmESQrf-sBa0ZgBPU>) with the preloaded slots and available slots.  



## 4\. Machine Overview

![](../../../assets/images/neoden_yy1_pick_&_pl_8a6b90daa0.png)

  1. Placement Head: The motorized assembly that moves across the X and Y axes to pick up components and precisely place them onto the PCB.
  2. Peeler Left: An automated mechanism on the left side that strips the plastic cover tape off the component carrier tape to expose the parts for picking.
  3. Nozzle: A specialized vacuum tip attached to the placement head that physically holds and releases the electronic components during transport.
  4. Tape Feeder Left: The mounting area on the left side of the machine where reels of components (on paper or plastic tape) are loaded.
  5. Nozzle Station (ANC): The Automatic Nozzle Changer (ANC) rack where the machine stores different nozzle sizes and swaps them out automatically based on the component size.
  6. Camera Display: The visual output from the machine's "upward" and "downward" looking cameras used for component alignment and PCB fiducial recognition.
  7. Peeler Holder: The bracket or frame that secures the peeling mechanism in place, ensuring the waste cover tape is guided away from the picking area.
  8. Safety Cover: An acrylic or metal shield that protects the operator from moving parts and helps maintain a stable internal environment for the vacuum systems.
  9. Peeler Right: A secondary peeling mechanism located on the right side of the machine to handle additional tape reels.
  10. Sticker Feeder: A unique NeoDen YY1 feature that allows the machine to pick components from short, cut strips of tape rather than full reels.
  11. Touch Screen: The primary user interface where you load files, calibrate the machine, and monitor the assembly process in real-time.
  12. SD Card: The storage medium used to transfer PCB "coordinate" files (exported from CAD software) and machine backups to the internal controller.
  13. ON/OFF Switch: The main physical toggle that controls the electrical flow to the machine's internal computer and motors.
  14. Power Cord (DC 24V): The cable that connects the machine to its external power brick, providing the steady 24-volt direct current required for operation.



## 5\. Basic Operating Workflow[[a]](<#cmnt1>)

### 5.1 Start-Up

  1. Ensure that the area is clean, check for components left over. 
  2. To activate the pick and place machine, turn on the power button (13) [[b]](<#cmnt2>)located at the right corner of the machine.  



![](https://docs.google.com/drawings/d/1HRxodjdebFwFp2HxzkdCejKoMF_GlKygVyg_yDjir9SDiVT8_E6cvNFGbRXVk4HHkPKL7VZgypJh-2imB-gFEvlee-JYulHMBzfZW3v5pGKHwoaB/image?parent=1NziAJxvmAxhwgVn0cYvuTaAijBn6_zPkvphJZNzm5xQ&rev=11&drawingRevisionAccessToken=NjmJdgVMr6SEug&h=267&w=334&ac=1)

  3. After turning on the button, the machine should initialize, and the interface on the front screen should activate, along with the camera screens 



 ![](../../../assets/images/neoden_yy1_pick_&_pl_41dfc36d06.jpeg)

After the machine finished loading, it should be ready for initializing a job. If any additional SMDs were to be placed in the machine, please enter the reel through a free feeder 

![](https://docs.google.com/drawings/d/1yP0ZvRNNIbq7MGKfu5aAc_6y45LolsRnSJMaTIgn-AUhm980L4RSNp4eSV4ZrQ-TPYRzS0F5GW9gpQZVDCAIOfV2iV38w8TJRYEf1gf5Kq5zp14u/image?parent=1NziAJxvmAxhwgVn0cYvuTaAijBn6_zPkvphJZNzm5xQ&rev=25&drawingRevisionAccessToken=2axaREC6no1wrA&h=286&w=382&ac=1)

Be sure that the component is properly aligned with the internal rail 

![](https://docs.google.com/drawings/d/1jQMOsZllD1uXXLvzBfyjOXZNWOAG_kjLVYW151_xboO7ODu9ZK2j8CQvUaq6UFm-1ceLq9nSyyRjQ7wP_W3i-7FvBqQU7tdLaz-G-bptkk1ptwgd/image?parent=1NziAJxvmAxhwgVn0cYvuTaAijBn6_zPkvphJZNzm5xQ&rev=22&drawingRevisionAccessToken=HgwFrzRPd29nsA&h=286&w=382&ac=1)

To move the component, use a pair of tweezers to gently move the reel until it reaches the marked line 

### 5.2 Running a Job

  1. The first step for loading a job is to insert the SD Card with a valid CSV file. The SD card slot is located at the right hand side of the machine, on top of the power switch.



![](https://docs.google.com/drawings/d/1j3T50Jn45iOO-H28gGGzX1w_nHpWpAAcUdgN-aJswdi2C2MwjqgBPcDsxCqtwJRYaWbQzuB_3Z9gJ16D7LxCZ1R4Yx1XsW58_7_Jl2-92KpOIbf4/image?parent=1NziAJxvmAxhwgVn0cYvuTaAijBn6_zPkvphJZNzm5xQ&rev=1&drawingRevisionAccessToken=j5bbwmWnQPbzUA&h=267&w=334&ac=1)

  2. Then, make sure the SD card is pressed correctly, and there is a click sound.  Once the SD card is correctly placed, the corresponding uploaded files should appear on the screen



  3. To run the file, select it on the interface, if the CSV file is compatible, it should display “Neoden YY1 Type File” at the bottom center part of the screen.



![](https://docs.google.com/drawings/d/1C0epGWZ8s8UenQ963NfkuzXr6zm3f3w9Cx3hV5OYj0GzqQPrdTi1rEm6eaaHClyvScBUHwogfKP76Pb6vsif09T6DKuPHlvOketLtwBf50VR0PVY/image?parent=1NziAJxvmAxhwgVn0cYvuTaAijBn6_zPkvphJZNzm5xQ&rev=1&drawingRevisionAccessToken=cdt9wrbq1BeUlA&h=272&w=432&ac=1)

  4. If the CSV file were to be not compatible with the machine, it would display “File Error.”



![](https://docs.google.com/drawings/d/1uloWsTEVblLNafMs9GkVMTT4NyQyWbwCJu7OkOzUua12JH-V7V4tI1nM4lHi17PC7NaXF2d2C6qUW2k8LnZSKwqH78XyFkd30-PY9Wd_CxYGPMjb/image?parent=1NziAJxvmAxhwgVn0cYvuTaAijBn6_zPkvphJZNzm5xQ&rev=24&drawingRevisionAccessToken=-js89XXhkFFyBw&h=272&w=432&ac=1)

  5. Once the correct file has been selected and there are not any errors, the next step is to run the job by selecting “Mount” on the screen interface 



![](https://docs.google.com/drawings/d/13PBnAUSIHLm5WRGplGcrrNDcA4-wvkzzQddO33P-ocmFXcu_GBu8RsiIelcuzG5X7M2jEGX20yaToOy0FJlCRjVcEP6Ku-sM4Zw9mGaaBONF97GH/image?parent=1NziAJxvmAxhwgVn0cYvuTaAijBn6_zPkvphJZNzm5xQ&rev=68&drawingRevisionAccessToken=bqH1OG9sXP9xgQ&h=259&w=432&ac=1)

  6. Now, place the printed circuit board starting from the origin, and placing the board at the same orientation as in the fusion 360 design, the origin is defined as the screw to the bottom left. The black magnetic holder can be adjusted by just moving it, to hold the  



![](https://docs.google.com/drawings/d/1lshRi0W_mDSfaRRM16c1VODgxlZOY6O7tdDPj7e5WHG7rZkA7yUiTq3VmqEFUZeHzjpCDn4IxLbAwxDSg1LZBYE5C7oevaQa3R5xHV-GC8Lw-JMW/image?parent=1NziAJxvmAxhwgVn0cYvuTaAijBn6_zPkvphJZNzm5xQ&rev=85&drawingRevisionAccessToken=UGxig0f1ofycbg&h=233&w=408&ac=1)

  7. After placing the pcb board and pressing mount on the interface, to initialize the job, press the start button, and the job should start automatically.



![](https://docs.google.com/drawings/d/1wv0g3G8BmLyBlzFjZXT2CIJ7rkCs6uIkN6I8wsV-1zktJKcZGYIoQThHmjtIaYHmLYo4VakwsIEjG8ihBpL5nVMzKTRkzej0MUfl5q_MTBmHUvqK/image?parent=1NziAJxvmAxhwgVn0cYvuTaAijBn6_zPkvphJZNzm5xQ&rev=24&drawingRevisionAccessToken=L2zJbKqIkbpFEw&h=266&w=407&ac=1)

### 5.3 End-of-Job / Shutdown

  1. Stop or Complete Job: Once the software indicates "Placement Complete," wait for the head to return to the "Home" or "Park" position.
  2. Remove Part Safely: Carefully slide the PCB out of the rails. Handle by the edges to avoid disturbing the solder paste.
  3. Required User Cleanup: Use a brush to remove any "lost" components from the machine bed. Do not blow or use compressed air, as this can blow components into the internal lead screws.
  4. Power Down: Navigate to the "Exit" icon on the touchscreen before flipping the physical power switch at the rear.



## 6\. User Responsibilities After Use

After using this machine, you are responsible for:

  * Final Inspection: Carefully removing the PCB and performing a visual check for misaligned parts before reflow soldering.
  * Material Management: Returning unused component reels to their moisture-barrier bags or designated storage bins.
  * Reporting: Promptly reporting any broken needles (nozzles), feeder jams, or software "freezes" to the Fab Lab staff.



## 7\. Stop Conditions

Stop immediately and notify Fab Lab staff if:

  * Unexpected noise, vibration, or erratic motion occurs
  * Placement head moves outside programmed bounds
  * Smoke, sparks, or burning odors appear
  * Feeder jams or mechanical binding occurs
  * Software crashes or communication is lost
  * Power cable is damaged



Do not attempt to troubleshoot major issues yourself.

## 8\. Common Issues & What To Do

  * Issue: Component not getting picked up properly.



Action: Check if the feeder tape is properly indexed or if the nozzle size is too small for the part. If the issue persists, notify staff.

  * Issue: Vision alignment failure (Warning on screen).



Action: Ensure the upward-looking camera lens is clean and free of dust. Use a microfiber cloth to gently wipe it.

  * Issue: PCB fiducials not found.



Action: Check that the PCB is flat and that there is adequate lighting in the room, notify staff.

## 9\. External Resources

For more detailed information, refer to:

  * [NeoDen YY1 User Manual ](<https://www.google.com/url?q=https://www.neodensmt.com/Content/upload/PDF/2019436761/User-Manual-NeoDen-YY1-PNP-machine.pdf&sa=D&source=editors&ust=1776804266932777&usg=AOvVaw0uG0iIXyjDInirXqnQa6dQ>)
  * [Video Tutorial](<https://www.google.com/url?q=https://www.youtube.com/watch?v%3DDDgkHmDhd_Q&sa=D&source=editors&ust=1776804266932897&usg=AOvVaw3YvbuouzAmazRticxa2Ivm>)



## 10\. Questions or Help

If you have questions or need assistance at any point, ask a Fab Lab staff member. Staff are always present during operating hours.

* * *

End of Operations Manual

[[a]](<#cmnt_ref1>)reformat some pictures maybe if possible, if not thats fine

[[b]](<#cmnt_ref2>)numbered what and bold.