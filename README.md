# Module Federation

A micro-frontend architecture demonstration using Webpack 5 Module Federation. Features independent deployments, runtime composition, and shared dependencies across multiple React applications.

[View Portfolio](https://zachayers.io) | [Live Demo](https://modulefederation.zachayers.io)

## About

Module Federation showcases modern micro-frontend architecture where independent teams can develop, test, and deploy separate applications that integrate seamlessly at runtime. Built with Webpack 5, React 17, and managed as a monorepo with Yarn Workspaces.

## Built With

### Frontend
- React 17
- React Router DOM
- Material-UI

### Bundler & Tools
- Webpack 5
- Module Federation Plugin
- Yarn Workspaces
- Babel
- ESLint
- Prettier

### Deployment
- AWS S3
- CloudFront

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- Yarn 1.22.x or higher

### Installation

```bash
git clone https://github.com/N73311/modulefederation.git
cd modulefederation
yarn install
```

### Development

Start all micro-frontends:

```bash
yarn start:all
```

Or start individual applications:

```bash
yarn workspace container start    # Host application (port 8080)
yarn workspace marketing start    # Marketing app (port 8081)
yarn workspace auth start         # Auth app (port 8082)
yarn workspace dashboard start    # Dashboard app (port 8083)
```

### Build

```bash
yarn build:all
```

## Project Structure

```
modulefederation/
├── packages/
│   ├── container/      # Host application - orchestrates remotes
│   ├── marketing/      # Marketing micro-frontend
│   ├── auth/          # Authentication micro-frontend
│   └── dashboard/     # Dashboard micro-frontend
├── package.json       # Root workspace configuration
└── yarn.lock
```

## Architecture

### Micro-Frontend Components

- **Container**: Host application that loads and orchestrates remote modules
- **Marketing**: Landing page and marketing content
- **Auth**: User authentication and registration
- **Dashboard**: Authenticated user dashboard

### Module Federation Configuration

Each micro-frontend exposes components via Webpack Module Federation:

```javascript
new ModuleFederationPlugin({
  name: 'marketing',
  filename: 'remoteEntry.js',
  exposes: {
    './MarketingApp': './src/bootstrap',
  },
  shared: {
    react: { singleton: true, eager: true },
    'react-dom': { singleton: true, eager: true },
  },
})
```

### Key Features

- **Runtime Composition**: Micro-frontends loaded dynamically at runtime
- **Independent Deployments**: Each app deploys independently without coordination
- **Shared Dependencies**: React and React-DOM shared via singleton pattern
- **CSS Isolation**: Material-UI class name generators prevent style conflicts
- **Routing Synchronization**: Memory routers synchronized across micro-frontends
- **No Build Coupling**: Zero build-time dependencies between applications

## Deployment

The application uses S3 for static hosting with CloudFront for CDN:

```bash
# Deploy all micro-frontends
./deploy.sh

# Individual deployments
aws s3 sync packages/container/dist s3://bucket/container/latest/ --delete
aws s3 sync packages/marketing/dist s3://bucket/marketing/latest/ --delete
aws s3 sync packages/auth/dist s3://bucket/auth/latest/ --delete
aws s3 sync packages/dashboard/dist s3://bucket/dashboard/latest/ --delete
```

## License

Licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE) for details.

## Author

Zachariah Ayers - [zachayers.io](https://zachayers.io)
