<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# PlayWise Music Platform Development Instructions

This is a TypeScript Express.js backend for a music platform focusing on data structures and algorithms implementation.

## Key Principles
- All core functions must include time and space complexity annotations
- Use custom data structure implementations (no built-in collections for core features)
- Document algorithm choices and trade-offs
- Maintain modular, clean, and well-documented code
- Focus on performance optimization and memory efficiency

## Core Data Structures
- **DoublyLinkedList**: For playlist management with O(1) insertions/deletions
- **Stack**: For playback history with LIFO behavior
- **BinarySearchTree**: For rating-based song indexing with O(log n) operations
- **HashMap**: For instant song lookup with O(1) average access
- **Custom Sorting**: Implement merge/quick sort algorithms

## Architecture Patterns
- Use dependency injection for data structure components
- Implement proper error handling and validation
- Create comprehensive API documentation
- Include performance benchmarks and complexity analysis
- Design for real-time operations and live dashboard updates

## Code Quality
- Follow TypeScript best practices
- Use proper interfaces and type definitions
- Include comprehensive error handling
- Write modular and testable code
- Document all public methods with JSDoc
