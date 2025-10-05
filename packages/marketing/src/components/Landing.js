import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MaterialLink from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Built with "}
      <MaterialLink href="https://webpack.js.org/concepts/module-federation/" target="_blank" color="inherit">
        Webpack 5 Module Federation
      </MaterialLink>{" "}
      • {new Date().getFullYear()} •{" "}
      <MaterialLink component={Link} to="/" color="inherit">
        View Source
      </MaterialLink>
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  "@global": {
    a: {
      textDecoration: "none",
    },
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [
  {
    id: 1,
    title: "Runtime Composition",
    description: "Modules are loaded dynamically at runtime, not build time. No coordination needed between teams.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    color: "#2196f3"
  },
  {
    id: 2,
    title: "Independent Deployments",
    description: "Each micro-frontend deploys independently. Update Marketing without touching Auth or Dashboard.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400",
    color: "#4caf50"
  },
  {
    id: 3,
    title: "Shared Dependencies",
    description: "React, Vue, and other libraries are shared using singleton pattern to prevent duplication.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400",
    color: "#9c27b0"
  },
  {
    id: 4,
    title: "Framework Agnostic",
    description: "Mix React, Vue, Angular - any framework. Our Dashboard uses Vue 3 while the host uses React!",
    image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400",
    color: "#ff9800"
  },
  {
    id: 5,
    title: "CSS Isolation",
    description: "Style conflicts are prevented through CSS-in-JS and unique class name generation.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    color: "#f44336"
  },
  {
    id: 6,
    title: "Performance Benefits",
    description: "Load only what you need, when you need it. Parallel loading and caching improve performance.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
    color: "#00bcd4"
  },
  {
    id: 7,
    title: "Team Autonomy",
    description: "Teams own their micro-frontends end-to-end. Choose your own tech stack and deployment pipeline.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400",
    color: "#795548"
  },
  {
    id: 8,
    title: "Fallback Handling",
    description: "Graceful error boundaries ensure one module's failure doesn't break the entire application.",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400",
    color: "#607d8b"
  },
  {
    id: 9,
    title: "Version Management",
    description: "Webpack handles version conflicts intelligently, loading compatible versions for each module.",
    image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400",
    color: "#e91e63"
  }
];

export default function Album() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Welcome to Module Federation
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Experience the power of Webpack 5's Module Federation - where independent teams
              can build, deploy, and compose applications at runtime. This live demo showcases
              micro-frontend architecture in action with React, Vue, and seamless integration.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Link to="/auth/signin">
                    <Button variant="contained" color="primary">
                      Try Auth Module
                    </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/pricing">
                    <Button variant="outlined" color="primary">
                      Architecture Patterns
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card className={classes.card} style={{ borderTop: `4px solid ${card.color}` }}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.image}
                    title={card.title}
                    style={{ position: 'relative' }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      backgroundColor: card.color,
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}>
                      FEATURE #{card.id}
                    </div>
                  </CardMedia>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2" style={{ color: card.color }}>
                      {card.title}
                    </Typography>
                    <Typography>
                      {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" style={{ color: card.color }}>
                      Learn More
                    </Button>
                    <Button size="small" color="primary">
                      Try It
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Marketing Module (Remote)
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          This content is served from the Marketing micro-frontend, running React {React.version}.
          Notice how it seamlessly integrates with the Container host application!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
