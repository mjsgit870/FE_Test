# Project Setup Guide

Created by: [Muhammad Julian Saputra](https://www.linkedin.com/in/muhammad-julian-saputra-38313a159/)

This document will guide you through the steps needed to run this project locally.

## Prerequisites

Make sure you have the following installed on your system:

- Node.js
- Yarn (recommended) or NPM

## Installation Steps

1. Install dependencies (we recommend using Yarn for better performance and consistency):

   ```bash
   yarn
   # or yarn install
   ```

   Alternatively, if you must use npm:

   ```bash
   npm install
   ```

2. Environment Setup

   - Duplicate `.env.example` file and rename it to `.env`
   - Open `.env` file and update the `NEXT_PUBLIC_API_URL` with your API URL

   ```env
   NEXT_PUBLIC_API_URL=your_api_url_here
   ```

3. Start Development Server
   ```bash
   yarn dev
   # or if using npm:
   npm run dev
   ```

## Notes

- We recommend using Yarn as the package manager for this project
- Make sure your API server is running before starting the development server
- The application will be available at `http://localhost:3000` by default

## Need Help?

If you encounter any issues during setup, please check:

- Your Node.js version is compatible
- All dependencies were installed correctly using Yarn
- The `.env` file is properly configured
