import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  Chip,
  IconButton,
  Collapse,
  Grid,
  LinearProgress,
  Tooltip,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import {
  ExpandMore,
  ExpandLess,
  Code,
  Speed,
  Memory,
  Share,
  Layers,
  CheckCircle,
  Error,
  Warning,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  explorerPanel: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1200,
    backgroundColor: theme.palette.background.paper,
    borderTop: `2px solid ${theme.palette.primary.main}`,
    maxHeight: '50vh',
    overflowY: 'auto',
    transition: 'transform 0.3s ease',
  },
  explorerHeader: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  explorerContent: {
    padding: theme.spacing(3),
  },
  moduleCard: {
    marginBottom: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    position: 'relative',
    transition: 'all 0.3s ease',
    '&.react': {
      borderLeft: `4px solid #61dafb`,
    },
    '&.vue': {
      borderLeft: `4px solid #4fc08d`,
    },
    '&:hover': {
      boxShadow: theme.shadows[4],
      transform: 'translateY(-2px)',
    },
  },
  moduleHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  moduleStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  metricBox: {
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
    display: 'inline-block',
    marginRight: theme.spacing(1),
  },
  sharedDeps: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
  },
  dependencyChip: {
    margin: theme.spacing(0.5),
  },
  architectureDiagram: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
    textAlign: 'center',
  },
  moduleBox: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    textAlign: 'center',
    minWidth: 120,
    position: 'relative',
  },
  hostModule: {
    backgroundColor: '#e3f2fd',
    border: '2px solid #2196f3',
  },
  remoteModule: {
    backgroundColor: '#f3e5f5',
    border: '1px dashed #9c27b0',
  },
  connectionLine: {
    position: 'absolute',
    borderTop: '2px dashed #999',
    top: '50%',
    zIndex: -1,
  },
}));

const ModuleFederationExplorer = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(true);
  const [showDebugMode, setShowDebugMode] = useState(false);
  const [modules, setModules] = useState([
    {
      name: 'Container',
      type: 'Host',
      framework: 'React 17',
      status: 'loaded',
      loadTime: 45,
      bundleSize: '234 KB',
      version: '1.0.0',
      path: '/',
      color: 'react',
      dependencies: ['react', 'react-dom', 'react-router-dom', '@material-ui/core'],
    },
    {
      name: 'Marketing',
      type: 'Remote',
      framework: 'React 17',
      status: 'loaded',
      loadTime: 120,
      bundleSize: '156 KB',
      version: '1.0.0',
      path: '/marketing/remoteEntry.js',
      color: 'react',
      dependencies: ['react', 'react-dom', '@material-ui/core'],
    },
    {
      name: 'Auth',
      type: 'Remote',
      framework: 'React 17',
      status: 'standby',
      loadTime: null,
      bundleSize: '98 KB',
      version: '1.0.0',
      path: '/auth/remoteEntry.js',
      color: 'react',
      dependencies: ['react', 'react-dom', '@material-ui/core'],
    },
    {
      name: 'Dashboard',
      type: 'Remote',
      framework: 'Vue 3',
      status: 'standby',
      loadTime: null,
      bundleSize: '189 KB',
      version: '1.0.0',
      path: '/dashboard/remoteEntry.js',
      color: 'vue',
      dependencies: ['vue', 'primevue', 'chart.js'],
    },
  ]);

  const sharedDependencies = [
    { name: 'react', version: '17.0.1', singleton: true, eager: false },
    { name: 'react-dom', version: '17.0.1', singleton: true, eager: false },
    { name: 'react-router-dom', version: '5.2.0', singleton: false, eager: false },
  ];

  useEffect(() => {
    // Simulate module loading updates
    const handleModuleLoad = (moduleName) => {
      setModules((prevModules) =>
        prevModules.map((m) =>
          m.name === moduleName
            ? { ...m, status: 'loaded', loadTime: Math.floor(Math.random() * 200) + 50 }
            : m
        )
      );
    };

    // Listen for route changes to update module status
    const checkActiveModules = () => {
      const path = window.location.pathname;
      setModules((prevModules) =>
        prevModules.map((m) => {
          if (path.includes('/auth') && m.name === 'Auth') {
            return { ...m, status: 'loaded', loadTime: m.loadTime || 95 };
          }
          if (path.includes('/dashboard') && m.name === 'Dashboard') {
            return { ...m, status: 'loaded', loadTime: m.loadTime || 145 };
          }
          return m;
        })
      );
    };

    checkActiveModules();
    window.addEventListener('popstate', checkActiveModules);

    return () => {
      window.removeEventListener('popstate', checkActiveModules);
    };
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'loaded':
        return <CheckCircle style={{ color: '#4caf50' }} />;
      case 'loading':
        return <Warning style={{ color: '#ff9800' }} />;
      case 'error':
        return <Error style={{ color: '#f44336' }} />;
      default:
        return <Memory style={{ color: '#9e9e9e' }} />;
    }
  };

  const getFrameworkColor = (framework) => {
    if (framework.includes('React')) return '#61dafb';
    if (framework.includes('Vue')) return '#4fc08d';
    return '#999';
  };

  return (
    <Paper className={classes.explorerPanel} elevation={8}>
      <Box className={classes.explorerHeader} onClick={() => setIsOpen(!isOpen)}>
        <Box display="flex" alignItems="center" gap={2}>
          <Layers />
          <Typography variant="h6">Module Federation Explorer</Typography>
          <Chip
            size="small"
            label="Developer Mode"
            color="secondary"
            icon={<Code />}
          />
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <FormControlLabel
            control={
              <Switch
                checked={showDebugMode}
                onChange={(e) => {
                  e.stopPropagation();
                  setShowDebugMode(e.target.checked);
                }}
                color="secondary"
              />
            }
            label="Debug"
            onClick={(e) => e.stopPropagation()}
          />
          <IconButton color="inherit" size="small">
            {isOpen ? <ExpandMore /> : <ExpandLess />}
          </IconButton>
        </Box>
      </Box>

      <Collapse in={isOpen}>
        <Box className={classes.explorerContent}>
          {/* Architecture Diagram */}
          <Box className={classes.architectureDiagram}>
            <Typography variant="subtitle2" gutterBottom>
              Runtime Module Federation Architecture
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Box className={`${classes.moduleBox} ${classes.hostModule}`}>
                <Typography variant="subtitle2">Container</Typography>
                <Typography variant="caption">(Host)</Typography>
              </Box>
              <Box display="flex" flexDirection="column" gap={1}>
                {['Marketing', 'Auth', 'Dashboard'].map((name) => (
                  <Box key={name} className={`${classes.moduleBox} ${classes.remoteModule}`}>
                    <Typography variant="caption">{name}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          {/* Module Cards */}
          <Grid container spacing={3}>
            {modules.map((module) => (
              <Grid item xs={12} md={6} lg={3} key={module.name}>
                <Card className={`${classes.moduleCard} ${module.color}`}>
                  <CardContent>
                    <Box className={classes.moduleHeader}>
                      <Box>
                        <Typography variant="h6">{module.name}</Typography>
                        <Typography variant="caption" style={{ color: getFrameworkColor(module.framework) }}>
                          {module.framework}
                        </Typography>
                      </Box>
                      <Box className={classes.moduleStatus}>
                        {getStatusIcon(module.status)}
                        <Chip
                          size="small"
                          label={module.type}
                          variant={module.type === 'Host' ? 'default' : 'outlined'}
                          color={module.type === 'Host' ? 'primary' : 'default'}
                        />
                      </Box>
                    </Box>

                    <Box mt={2}>
                      <Box className={classes.metricBox}>
                        <Speed fontSize="small" />
                        <Typography variant="caption" component="span" ml={1}>
                          {module.loadTime ? `${module.loadTime}ms` : 'Not loaded'}
                        </Typography>
                      </Box>
                      <Box className={classes.metricBox}>
                        <Memory fontSize="small" />
                        <Typography variant="caption" component="span" ml={1}>
                          {module.bundleSize}
                        </Typography>
                      </Box>
                    </Box>

                    {showDebugMode && (
                      <Box mt={2}>
                        <Typography variant="caption" display="block">
                          Version: {module.version}
                        </Typography>
                        <Typography variant="caption" display="block" style={{ fontFamily: 'monospace' }}>
                          Path: {module.path}
                        </Typography>
                        <Typography variant="caption" display="block">
                          Status: {module.status}
                        </Typography>
                      </Box>
                    )}

                    {module.status === 'loaded' && module.loadTime && (
                      <Box mt={2}>
                        <LinearProgress
                          variant="determinate"
                          value={Math.min((200 - module.loadTime) / 2, 100)}
                          color={module.loadTime < 100 ? 'primary' : 'secondary'}
                        />
                        <Typography variant="caption">
                          Load Performance: {module.loadTime < 100 ? 'Excellent' : 'Good'}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Shared Dependencies */}
          <Box className={classes.sharedDeps}>
            <Typography variant="subtitle1" gutterBottom>
              <Share fontSize="small" /> Shared Dependencies (Singleton Pattern)
            </Typography>
            <Box>
              {sharedDependencies.map((dep) => (
                <Tooltip
                  key={dep.name}
                  title={`Version: ${dep.version} | Singleton: ${dep.singleton} | Eager: ${dep.eager}`}
                >
                  <Chip
                    className={classes.dependencyChip}
                    label={`${dep.name}@${dep.version}`}
                    size="small"
                    icon={dep.singleton ? <CheckCircle /> : null}
                    color={dep.singleton ? 'primary' : 'default'}
                    variant={dep.singleton ? 'default' : 'outlined'}
                  />
                </Tooltip>
              ))}
            </Box>
            <Typography variant="caption" display="block" mt={1}>
              Shared dependencies prevent duplication and ensure consistency across micro-frontends
            </Typography>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default ModuleFederationExplorer;