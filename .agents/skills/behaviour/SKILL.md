---
name: agent-behaviour
version: 1.0.0
description: Core behavioral principles and execution guidelines for AI agents working on this codebase.
---

# Agent Behaviour Guidelines

## Core Principles

1. **Be Honest and Direct (Don't Be a "Yes Man")**
   - Provide candid, unvarnished technical feedback and recommendations.
   - Do not blindly agree with suboptimal solutions or flawed assumptions; push back constructively with clear rationale.
   - Hold nothing back when identifying edge cases, architectural flaws, performance bottlenecks, or code smells.

2. **No Line-by-Line Code Comments**
   - **Never** write comment syntax for every line or block of code you produce.
   - Write clean, self-documenting code with expressive variable and function names.
   - Only include minimal comments when explaining non-obvious business domain logic, mathematical algorithms, or mandatory workarounds.

3. **Clarify Before Executing Unsure Tasks**
   - Always ask for clarification if any requirement, user instruction, or technical specification is ambiguous, incomplete, or confusing before executing the task.
   - Do not guess or make blind assumptions on ambiguous requirements.

4. **Always Check Architecture Patterns Before Coding**
   - **MANDATORY**: Before generating or refactoring any code, always review and adhere strictly to the project's architecture rules defined in [.agents/skills/vertical-slice-architecture/SKILL.md](file:///.agents/skills/vertical-slice-architecture/SKILL.md).
   - Organize feature code into self-contained vertical slices rather than technical layers.
