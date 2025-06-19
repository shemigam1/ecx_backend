# ECX JOB PLATFORM API - v1.0

## Overview

This Job platform api is a part of ECX's 14 day Design and Code challenge.

## Features

- **Role based Authentication**
- **JWT**

## Prerequisites

- **Environment**:
  - Node.js (for JavaScript/TypeScript projects) or Python (for Python projects).

## Installation

```
git clone *git url*
```

```
cd ecx_backend
npm i
npm run dev
```

## Available Routes

# POST

- **http://localhost:8088/api/v1/auth/signup**
- **http://localhost:8088/api/v1/auth/login**
- **http://localhost:8088/api/v1/job/**

# GET

- **http://localhost:8088/api/v1/job/**
- **http://localhost:8088/api/v1/job/:id**

# PUT

- **http://localhost:8088/api/v1/job/:id**

# DELETE

- **http://localhost:8088/api/v1/job/:id**

## Response Format examples

# DELETE

```
{
  "success": true,
  "message": "job deleted successful",
  "code": 200,
  "returnStatus": "OK",
  "data": null
}
```
