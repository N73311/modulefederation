# Module Federation - System Architecture

## Overview
A micro-frontend architecture demonstration using Webpack 5 Module Federation, featuring independent deployments, runtime composition, and shared dependencies across multiple React applications.

## High-Level Architecture

```mermaid
graph TB
    subgraph "User Access"
        Browser[Web Browser]
        User[End User]
    end

    subgraph "CDN Layer"
        CloudFront[CloudFront CDN]
        Cache[Edge Caching]
    end

    subgraph "Host Application - Container"
        Shell[Application Shell]
        Router[Main Router]
        ModuleLoader[Module Federation Loader]
        ErrorBoundary[Error Boundary]
    end

    subgraph "Remote Applications"
        Marketing[Marketing MFE]
        Auth[Authentication MFE]
        Dashboard[Dashboard MFE]
    end

    subgraph "Shared Dependencies"
        React[React 17 - Singleton]
        ReactDOM[React-DOM - Singleton]
        ReactRouter[React Router - Shared]
        MUI[Material-UI - Shared]
    end

    subgraph "Build & Deploy"
        WebpackContainer[Webpack 5 - Container]
        WebpackMarketing[Webpack 5 - Marketing]
        WebpackAuth[Webpack 5 - Auth]
        WebpackDashboard[Webpack 5 - Dashboard]
    end

    subgraph "Storage Layer"
        S3Container[S3 Bucket - Container]
        S3Marketing[S3 Bucket - Marketing]
        S3Auth[S3 Bucket - Auth]
        S3Dashboard[S3 Bucket - Dashboard]
    end

    User --> Browser
    Browser --> CloudFront
    CloudFront --> Cache

    Cache --> Shell
    Shell --> Router
    Shell --> ModuleLoader
    Shell --> ErrorBoundary

    ModuleLoader -->|Load Remote| Marketing
    ModuleLoader -->|Load Remote| Auth
    ModuleLoader -->|Load Remote| Dashboard

    Shell --> React
    Marketing --> React
    Auth --> React
    Dashboard --> React

    React --> ReactDOM
    Router --> ReactRouter
    Marketing --> MUI
    Auth --> MUI
    Dashboard --> MUI

    WebpackContainer --> S3Container
    WebpackMarketing --> S3Marketing
    WebpackAuth --> S3Auth
    WebpackDashboard --> S3Dashboard

    S3Container --> CloudFront
    S3Marketing --> CloudFront
    S3Auth --> CloudFront
    S3Dashboard --> CloudFront

    style Browser fill:#e1f5ff,stroke:#01579b,stroke-width:2px
    style Shell fill:#fff3e0,stroke:#e65100,stroke-width:3px
    style Marketing fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
    style Auth fill:#fce4ec,stroke:#880e4f,stroke-width:2px
    style Dashboard fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    style React fill:#61dafb,stroke:#20232a,stroke-width:3px
```

## Module Federation Configuration

```mermaid
graph TB
    subgraph "Container - Host Application"
        ContainerApp[Container Application]
        ContainerConfig[Module Federation Config]
        RemoteConsumer[Remote Module Consumer]
    end

    subgraph "Marketing - Remote 1"
        MarketingApp[Marketing Application]
        MarketingConfig[Module Federation Config]
        MarketingExpose[Exposed: ./MarketingApp]
        MarketingEntry[remoteEntry.js]
    end

    subgraph "Auth - Remote 2"
        AuthApp[Auth Application]
        AuthConfig[Module Federation Config]
        AuthExpose[Exposed: ./AuthApp]
        AuthEntry[remoteEntry.js]
    end

    subgraph "Dashboard - Remote 3"
        DashboardApp[Dashboard Application]
        DashboardConfig[Module Federation Config]
        DashboardExpose[Exposed: ./DashboardApp]
        DashboardEntry[remoteEntry.js]
    end

    subgraph "Shared Configuration"
        SharedReact[react: singleton, eager]
        SharedReactDOM[react-dom: singleton, eager]
        SharedRouter[react-router-dom: shared]
        SharedMUI[Material-UI: shared]
    end

    ContainerApp --> ContainerConfig
    ContainerConfig --> RemoteConsumer

    RemoteConsumer -->|Import| MarketingEntry
    RemoteConsumer -->|Import| AuthEntry
    RemoteConsumer -->|Import| DashboardEntry

    MarketingApp --> MarketingConfig
    MarketingConfig --> MarketingExpose
    MarketingExpose --> MarketingEntry

    AuthApp --> AuthConfig
    AuthConfig --> AuthExpose
    AuthExpose --> AuthEntry

    DashboardApp --> DashboardConfig
    DashboardConfig --> DashboardExpose
    DashboardExpose --> DashboardEntry

    ContainerConfig --> SharedReact
    MarketingConfig --> SharedReact
    AuthConfig --> SharedReact
    DashboardConfig --> SharedReact

    SharedReact --> SharedReactDOM
    SharedReactDOM --> SharedRouter
    SharedRouter --> SharedMUI

    style ContainerConfig fill:#ffb74d,stroke:#e65100,stroke-width:3px
    style MarketingConfig fill:#81c784,stroke:#2e7d32,stroke-width:2px
    style AuthConfig fill:#f48fb1,stroke:#880e4f,stroke-width:2px
    style DashboardConfig fill:#ce93d8,stroke:#4a148c,stroke-width:2px
    style SharedReact fill:#61dafb,stroke:#20232a,stroke-width:3px
```

## Runtime Module Loading

```mermaid
sequenceDiagram
    participant Browser as Browser
    participant Container as Container App
    participant Webpack as Webpack Runtime
    participant Remote1 as Marketing Remote
    participant Remote2 as Auth Remote
    participant Remote3 as Dashboard Remote
    participant CDN as CloudFront CDN

    Browser->>Container: Navigate to app
    Container->>Container: Initialize shell
    Container->>Webpack: Load shared dependencies
    Webpack->>CDN: Fetch React (singleton)
    CDN->>Webpack: Return React bundle

    Container->>Webpack: Import marketing/MarketingApp
    Webpack->>CDN: Fetch remoteEntry.js (Marketing)
    CDN->>Webpack: Return remote entry
    Webpack->>Remote1: Load marketing module
    Remote1->>Container: Mount marketing component

    Browser->>Container: Navigate to /auth
    Container->>Webpack: Import auth/AuthApp
    Webpack->>CDN: Fetch remoteEntry.js (Auth)
    CDN->>Webpack: Return remote entry
    Webpack->>Remote2: Load auth module
    Remote2->>Container: Mount auth component

    Note over Browser,Remote3: Modules loaded on-demand at runtime
```

## Routing Architecture

```mermaid
graph TB
    subgraph "Container Router"
        BrowserRouter[Browser Router]
        Routes[Route Configuration]
    end

    subgraph "Marketing Routes"
        MarketingMemoryRouter[Memory Router]
        MarketingLanding[Landing Page - /]
        MarketingPricing[Pricing Page - /pricing]
    end

    subgraph "Auth Routes"
        AuthMemoryRouter[Memory Router]
        AuthSignIn[Sign In - /auth/signin]
        AuthSignUp[Sign Up - /auth/signup]
    end

    subgraph "Dashboard Routes"
        DashboardMemoryRouter[Memory Router]
        DashboardHome[Dashboard Home - /dashboard]
        DashboardProfile[Profile - /dashboard/profile]
    end

    subgraph "Route Synchronization"
        HistoryListener[History Listener]
        RouteSync[Route Synchronizer]
    end

    BrowserRouter --> Routes
    Routes -->|Match: /| MarketingMemoryRouter
    Routes -->|Match: /pricing| MarketingMemoryRouter
    Routes -->|Match: /auth/*| AuthMemoryRouter
    Routes -->|Match: /dashboard/*| DashboardMemoryRouter

    MarketingMemoryRouter --> MarketingLanding
    MarketingMemoryRouter --> MarketingPricing

    AuthMemoryRouter --> AuthSignIn
    AuthMemoryRouter --> AuthSignUp

    DashboardMemoryRouter --> DashboardHome
    DashboardMemoryRouter --> DashboardProfile

    BrowserRouter --> HistoryListener
    HistoryListener --> RouteSync
    RouteSync --> MarketingMemoryRouter
    RouteSync --> AuthMemoryRouter
    RouteSync --> DashboardMemoryRouter

    style BrowserRouter fill:#fb8c00,stroke:#e65100,stroke-width:3px
    style MarketingMemoryRouter fill:#66bb6a,stroke:#2e7d32,stroke-width:2px
    style AuthMemoryRouter fill:#ec407a,stroke:#880e4f,stroke-width:2px
    style DashboardMemoryRouter fill:#ab47bc,stroke:#4a148c,stroke-width:2px
```

## CSS Isolation Strategy

```mermaid
graph LR
    subgraph "Container Styles"
        ContainerMUI[Material-UI Theme]
        ContainerClassNames[generateClassName: 'c']
    end

    subgraph "Marketing Styles"
        MarketingMUI[Material-UI Theme]
        MarketingClassNames[generateClassName: 'mk']
        MarketingScoped[Scoped CSS Modules]
    end

    subgraph "Auth Styles"
        AuthMUI[Material-UI Theme]
        AuthClassNames[generateClassName: 'au']
        AuthScoped[Scoped CSS Modules]
    end

    subgraph "Dashboard Styles"
        DashboardMUI[Material-UI Theme]
        DashboardClassNames[generateClassName: 'db']
        DashboardScoped[Scoped CSS Modules]
    end

    ContainerMUI --> ContainerClassNames
    MarketingMUI --> MarketingClassNames
    AuthMUI --> AuthClassNames
    DashboardMUI --> DashboardClassNames

    MarketingClassNames --> MarketingScoped
    AuthClassNames --> AuthScoped
    DashboardClassNames --> DashboardScoped

    style ContainerMUI fill:#ffecb3,stroke:#f57c00,stroke-width:2px
    style MarketingMUI fill:#c8e6c9,stroke:#388e3c,stroke-width:2px
    style AuthMUI fill:#f8bbd0,stroke:#c2185b,stroke-width:2px
    style DashboardMUI fill:#e1bee7,stroke:#7b1fa2,stroke-width:2px
```

## Deployment Pipeline

```mermaid
graph TB
    subgraph "Development"
        Dev[Developer]
        YarnWorkspace[Yarn Workspace]
        LocalDev[Local Development]
    end

    subgraph "Build Process"
        BuildContainer[Build Container]
        BuildMarketing[Build Marketing]
        BuildAuth[Build Auth]
        BuildDashboard[Build Dashboard]
    end

    subgraph "Webpack Process"
        WebpackConfig[Webpack 5 Config]
        ModuleFedPlugin[ModuleFederationPlugin]
        TreeShake[Tree Shaking]
        CodeSplit[Code Splitting]
        Minify[Terser Minification]
    end

    subgraph "Deployment"
        S3Deploy[S3 Sync]
        CloudFrontInvalidation[CloudFront Invalidation]
    end

    subgraph "Production"
        ProdContainer[Container - Latest]
        ProdMarketing[Marketing - Latest]
        ProdAuth[Auth - Latest]
        ProdDashboard[Dashboard - Latest]
    end

    Dev --> YarnWorkspace
    YarnWorkspace --> LocalDev

    Dev -->|yarn build:all| BuildContainer
    Dev -->|yarn build:all| BuildMarketing
    Dev -->|yarn build:all| BuildAuth
    Dev -->|yarn build:all| BuildDashboard

    BuildContainer --> WebpackConfig
    BuildMarketing --> WebpackConfig
    BuildAuth --> WebpackConfig
    BuildDashboard --> WebpackConfig

    WebpackConfig --> ModuleFedPlugin
    ModuleFedPlugin --> TreeShake
    TreeShake --> CodeSplit
    CodeSplit --> Minify

    Minify --> S3Deploy
    S3Deploy --> CloudFrontInvalidation

    CloudFrontInvalidation --> ProdContainer
    CloudFrontInvalidation --> ProdMarketing
    CloudFrontInvalidation --> ProdAuth
    CloudFrontInvalidation --> ProdDashboard

    style Dev fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style WebpackConfig fill:#fff3e0,stroke:#ef6c00,stroke-width:2px
    style S3Deploy fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
    style ProdContainer fill:#fce4ec,stroke:#880e4f,stroke-width:2px
```

## Monorepo Structure

```mermaid
graph TB
    subgraph "Root Level"
        RootPackage[package.json - Root]
        YarnLock[yarn.lock]
        YarnWorkspaces[Yarn Workspaces Config]
    end

    subgraph "Packages Directory"
        PackagesDir[packages/]
    end

    subgraph "Container Package"
        ContainerPkg[container/package.json]
        ContainerSrc[container/src/]
        ContainerPublic[container/public/]
        ContainerWebpack[container/webpack.config.js]
    end

    subgraph "Marketing Package"
        MarketingPkg[marketing/package.json]
        MarketingSrc[marketing/src/]
        MarketingPublic[marketing/public/]
        MarketingWebpack[marketing/webpack.config.js]
    end

    subgraph "Auth Package"
        AuthPkg[auth/package.json]
        AuthSrc[auth/src/]
        AuthPublic[auth/public/]
        AuthWebpack[auth/webpack.config.js]
    end

    subgraph "Dashboard Package"
        DashboardPkg[dashboard/package.json]
        DashboardSrc[dashboard/src/]
        DashboardPublic[dashboard/public/]
        DashboardWebpack[dashboard/webpack.config.js]
    end

    RootPackage --> YarnWorkspaces
    YarnWorkspaces --> PackagesDir

    PackagesDir --> ContainerPkg
    PackagesDir --> MarketingPkg
    PackagesDir --> AuthPkg
    PackagesDir --> DashboardPkg

    ContainerPkg --> ContainerSrc
    ContainerPkg --> ContainerPublic
    ContainerPkg --> ContainerWebpack

    MarketingPkg --> MarketingSrc
    MarketingPkg --> MarketingPublic
    MarketingPkg --> MarketingWebpack

    AuthPkg --> AuthSrc
    AuthPkg --> AuthPublic
    AuthPkg --> AuthWebpack

    DashboardPkg --> DashboardSrc
    DashboardPkg --> DashboardPublic
    DashboardPkg --> DashboardWebpack

    style RootPackage fill:#fff3e0,stroke:#e65100,stroke-width:3px
    style ContainerPkg fill:#ffecb3,stroke:#f57c00,stroke-width:2px
    style MarketingPkg fill:#c8e6c9,stroke:#388e3c,stroke-width:2px
    style AuthPkg fill:#f8bbd0,stroke:#c2185b,stroke-width:2px
    style DashboardPkg fill:#e1bee7,stroke:#7b1fa2,stroke-width:2px
```

## Technology Stack

### Core Technologies
- **Webpack 5**: Module bundler with Federation plugin
- **React 17**: UI library (singleton shared)
- **React Router DOM**: Client-side routing
- **Material-UI**: Component library
- **Yarn Workspaces**: Monorepo management

### Build Tools
- **Webpack Module Federation Plugin**: Runtime module sharing
- **Babel**: JavaScript transpilation
- **ESLint**: Code quality
- **Prettier**: Code formatting

### Deployment
- **AWS S3**: Static file hosting
- **CloudFront**: Global CDN distribution
- **GitHub Actions**: CI/CD pipeline

## Key Features

### Independent Deployments
Each micro-frontend can be:
- Developed independently
- Tested independently
- Deployed independently
- Versioned independently

### Runtime Composition
- Modules loaded dynamically at runtime
- No build-time coupling between applications
- Shared dependencies deduplicated automatically
- Graceful fallback on load failures

### Shared Dependencies
- React and React-DOM as singletons
- Version consistency enforced
- Lazy loading for optimal performance
- Automatic deduplication

### CSS Isolation
- Scoped Material-UI class names
- No global style conflicts
- Independent theme management
- CSS modules support

## Performance Optimizations

### Bundle Splitting
- Vendor chunks separated
- Shared modules deduplicated
- Lazy loading for routes
- Dynamic imports for heavy components

### Caching Strategy
- Long-term caching for versioned assets
- Invalidation only when changed
- Edge caching via CloudFront
- Browser cache leveraging

### Code Optimization
- Tree shaking unused code
- Minification with Terser
- Gzip/Brotli compression
- Source map generation for debugging

## Benefits of Module Federation

1. **Team Autonomy**: Independent team ownership
2. **Technology Flexibility**: Different tech stacks per MFE
3. **Faster Deployments**: Deploy only changed apps
4. **Scalable Architecture**: Add new MFEs easily
5. **Code Sharing**: Share common libraries efficiently
6. **Independent Scaling**: Scale MFEs based on traffic
7. **Incremental Updates**: Update apps independently
8. **Fault Isolation**: Failures contained to single MFE

## Security Considerations

- CORS configuration for remote modules
- Content Security Policy (CSP) headers
- Subresource Integrity (SRI) for remotes
- HTTPS-only communication
- Token-based authentication across MFEs
- Shared authentication state
