# SRE Toolkit

A lightweight, browser-based toolkit for Site Reliability Engineers with useful utilities for daily operations.

## Features

- **JSON ⇄ YAML** - Convert between JSON and YAML formats
- **Cron Helper** - Parse and explain cron expressions
- **Base64** - Encode and decode Base64 strings
- **CIDR Calculator** - Calculate IP address ranges for CIDR notation

## Getting Started

Simply open `index.html` in your browser. No installation or build process required.

## Usage

### JSON ⇄ YAML

Paste JSON or YAML content and click the corresponding button to convert.

### Cron Helper

Enter a cron expression (e.g., `*/5 * * * *`) and click "Explain" to see what it means.

### Base64

Enter text and click "Encode" to convert to Base64 or "Decode" to convert from Base64.

### CIDR Calculator

Enter a CIDR block (e.g., `192.168.1.0/24`) and click "Calculate" to see the IP range.

## Theme

Click the moon icon in the header to toggle between dark and light themes.

## Tech Stack

- Vanilla JavaScript
- CSS Grid for responsive layout
- External libraries:
  - [js-yaml](https://github.com/nodeca/js-yaml) - YAML parsing
  - [ip-cidr](https://www.npmjs.com/package/ip-cidr) - CIDR calculations
