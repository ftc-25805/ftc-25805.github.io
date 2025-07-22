---
sidebar_position: 1
---

# Programming Overview

<div style={{marginBottom: '1rem'}}>
  <a href="../intro" className="button button--secondary button--sm">← Back to All Resources</a>
</div>

Robot programming is at the heart of FTC competition. Learn to control your robot with precision and intelligence.

## Programming Languages

### FTC Blocks
- **Best for beginners** - Visual programming interface
- Drag-and-drop coding environment
- Automatic code generation
- Easy to learn and understand

### Java
- **Industry-standard language** - Used in professional development
- More powerful and flexible than Blocks
- Required for advanced programming techniques
- Better performance and debugging capabilities

### OnBot Java
- Java programming in web browser
- No additional software installation required
- Good stepping stone from Blocks to Android Studio
- Real-time compilation and deployment

## Development Environments

### FTC Blocks
- Web-based programming environment
- Connect directly to Robot Controller
- Instant preview and deployment
- Built-in help and documentation

### Android Studio
- Professional IDE for Java development
- Advanced debugging and profiling tools
- Version control integration
- Complete FTC SDK access

### OnBot Java
- Browser-based Java editor
- Simpler than Android Studio
- Good for learning Java fundamentals
- Quick prototyping and testing

## Core Programming Concepts

### Robot Control System
- **Driver Station** - Controls and monitors robot
- **Robot Controller** - Executes your program
- **REV Control Hub** - Central processing unit
- **Sensors and Motors** - Robot's inputs and outputs

### Program Structure
```java
@TeleOp(name="Basic Drive", group="Linear Opmode")
public class BasicDrive extends LinearOpMode {
    @Override
    public void runOpMode() {
        // Initialize hardware
        // Wait for start
        // Main program loop
    }
}
```

### Essential Components
- **Hardware Mapping** - Connect code to physical components
- **Sensor Reading** - Get data from environment
- **Motor Control** - Drive wheels, arms, and mechanisms
- **Gamepad Input** - Process driver commands

## Programming Phases

### Autonomous (30 seconds)
- Robot operates without driver input
- Pre-programmed sequences
- Sensor-based navigation
- Scoring and positioning tasks

### TeleOp (2 minutes)
- Driver-controlled operation
- Real-time input processing
- Manual scoring and strategy
- Human-robot interface

### Test and Debug
- Iterative development process
- Hardware validation
- Performance optimization
- Competition preparation

## Learning Path

### Beginner (Blocks)
1. Basic robot movement
2. Sensor input processing
3. Simple autonomous routines
4. TeleOp controls

### Intermediate (OnBot Java)
1. Java syntax and structure
2. Object-oriented concepts
3. Advanced sensor integration
4. State machines

### Advanced (Android Studio)
1. Complex autonomous paths
2. Computer vision
3. PID control systems
4. Multi-threading

## Key Programming Resources

- [FTC Programming Resources](https://ftc-docs.firstinspires.org/) - Official documentation
- [FTC Blocks Tutorial](https://github.com/FIRST-Tech-Challenge/FtcRobotController/wiki) - Step-by-step guides
- [Java Fundamentals](https://www.codecademy.com/learn/learn-java) - Learn Java basics
- [FTC SDK](https://github.com/FIRST-Tech-Challenge/FtcRobotController) - Source code and examples

Ready to start programming? Choose your path and begin building intelligent robots!