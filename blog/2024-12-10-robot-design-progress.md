---
slug: robot-design-progress-december-2024
title: Robot Design Progress - Meet "Phoenix" Our 2024-25 Competition Robot
authors: [mechanical-lead, programming-lead]
tags: [robot-design, engineering, cad, programming, build-progress]
image: /img/blog/phoenix-robot-2024.jpg
---

Exciting update from our engineering team! We're thrilled to introduce "Phoenix," our 2024-25 competition robot that's taking shape in our workshop.

<!-- truncate -->

## Design Philosophy

This year, we focused on three core principles for Phoenix:

1. **Reliability**: Every mechanism designed for consistent performance
2. **Precision**: Accurate scoring with minimal human error
3. **Versatility**: Adaptable strategy for different alliance partners

## Mechanical Systems Overview

### Drive Base
- **Configuration**: 6-wheel drive with center drop
- **Motors**: 4x REV HD Hex Motors with 3:1 gearing
- **Speed**: 4.5 ft/sec maximum, 3.2 ft/sec operational
- **Maneuverability**: Tank drive with arcade control option

### Scoring Mechanism
Our main innovation this year is our precision scoring system:
- **Intake**: Custom-designed roller system with compliant wheels
- **Lift System**: Linear slide elevator with 30-inch extension
- **Placement**: Servo-controlled placement mechanism with fine adjustment
- **Accuracy**: ±2cm placement precision in testing

### Autonomous Systems
- **Navigation**: Dead wheel odometry with IMU fusion
- **Vision**: Camera-based detection for game elements
- **Sensors**: 4x distance sensors, 2x color sensors for field navigation

## Programming Architecture

### Control System
```java
public class Phoenix extends OpMode {
    // Main robot class with modular subsystem design
    private DriveBase driveBase;
    private ScoringSystem scorer;
    private AutonomousController auto;
    
    @Override
    public void init() {
        // Initialize all subsystems
        driveBase = new DriveBase(hardwareMap);
        scorer = new ScoringSystem(hardwareMap);
        auto = new AutonomousController(this);
    }
}
```

### Autonomous Capabilities
- **Multi-path Planning**: 5 different autonomous routines
- **Alliance Adaptation**: Automatically adjusts based on alliance color
- **Scoring Optimization**: Prioritizes highest-value targets
- **Reliability**: Failsafe mechanisms for all critical operations

## Current Build Status

### ✅ Completed
- Drive base assembly and testing
- Basic intake mechanism
- Programming framework setup
- Initial autonomous testing

### 🔄 In Progress  
- Elevator system installation
- Precision placement mechanism
- Advanced autonomous programming
- Wiring and electronics integration

### 📋 Upcoming
- System integration testing
- Competition practice runs
- Driver training
- Final tuning and optimization

## Testing Results

Our initial testing has been very promising:

### Drive Performance
- **Speed Test**: Achieved target 4.5 ft/sec maximum speed
- **Agility Test**: 180° turn in 1.2 seconds
- **Endurance Test**: No mechanical issues after 2-hour continuous operation

### Autonomous Testing
- **Consistency**: 95% success rate in basic navigation
- **Accuracy**: Average placement error of 1.8cm
- **Speed**: Complete autonomous routine in 28 seconds

## Design Challenges & Solutions

### Challenge: Weight Distribution
**Problem**: Initial design was front-heavy, affecting turning
**Solution**: Relocated battery and control hub to center-rear position
**Result**: Improved balance and maneuverability

### Challenge: Intake Reliability  
**Problem**: Game elements occasionally jammed in prototype
**Solution**: Redesigned with variable-speed rollers and wider intake
**Result**: 99% pickup success rate in testing

### Challenge: Programming Complexity
**Problem**: Multiple subsystems creating complex interaction
**Solution**: Implemented modular architecture with clear interfaces
**Result**: Easier debugging and more reliable operation

## Team Collaboration

This robot is truly a team effort:

- **Mechanical Team**: 8 members working on CAD, fabrication, and assembly
- **Programming Team**: 4 members developing autonomous and teleop code  
- **Integration Team**: 3 members ensuring mechanical and software work together
- **Testing Team**: All members participating in validation and improvement

## Looking Ahead

With our first competition just 6 weeks away, we're focused on:

1. **Integration**: Bringing all systems together seamlessly
2. **Optimization**: Fine-tuning performance for maximum efficiency
3. **Practice**: Driver training and strategy development
4. **Documentation**: Completing our engineering notebook

## Behind the Scenes

Want to see Phoenix in action? Follow our social media for:
- Daily build progress photos
- Testing videos and demos
- Time-lapse assembly footage
- Engineering challenge solutions

## Special Thanks

Huge appreciation to our mentors and sponsors who made Phoenix possible:
- **Mr. Anderson**: Mechanical design guidance
- **Ms. Rodriguez**: Programming mentorship  
- **Local Machine Shop**: Precision part manufacturing
- **Title Sponsor**: Materials and components funding

We can't wait to see Phoenix compete! Stay tuned for more updates as we approach our first tournament.

---

*Posted by the FTC Team 25805 Engineering Team*