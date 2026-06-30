# Atlas Architecture

## Overview

Atlas follows a layered architecture that separates presentation,
application logic and infrastructure integrations.

Frontend
        │
        ▼
React Components
        │
        ▼
Custom Hooks
        │
        ▼
Atlas Client
        │
        ▼
REST API / WebSocket
        │
        ▼
FastAPI
        │
        ▼
Services
        │
        ▼
Infrastructure

--------------------------------------------------

## Frontend

The frontend follows a component-driven architecture.

Components
- UI Components
- Dashboard Widgets
- Layout Components

Hooks
- useAtlasData
- useContainerQuery

Client
- Atlas API Client

--------------------------------------------------

## Backend

FastAPI is organized into three layers.

API

↓

Services

↓

Infrastructure

Services never communicate directly with each other through the API.
Business logic always stays inside the service layer.

--------------------------------------------------

## Widgets

Each Atlas widget follows the same structure.

Widget

↓

Toolbar

↓

Content

↓

Detail View

Widgets should be reusable and independent.

--------------------------------------------------

## Data Flow

Infrastructure

↓

Service

↓

API

↓

Atlas Client

↓

Hook

↓

Component

--------------------------------------------------

## Design Principles

- API First
- Reusable Components
- Reusable Hooks
- Service-based Backend
- Widget-driven Frontend
- Performance before Features
- Progressive Enhancement

--------------------------------------------------

## Future Platform

The Atlas Platform will introduce:

- Widget Framework
- Global State Store
- WebSocket Hub
- Metrics Cache
- Alert Engine
- Theme Engine