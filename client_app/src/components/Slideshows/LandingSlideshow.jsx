import React from "react";
import useStyles from "./styles";
import {Card, CardMedia, CardActionArea, Typography, IconButton, Fade} from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const logo = process.env.PUBLIC_URL + "LandingLogo.png";
const LandingDescription1 = process.env.PUBLIC_URL + "LandingDescription1.png";
const LandingDescription2 = process.env.PUBLIC_URL + "LandingDescription2.png";
const delay = 2500;

const images = [logo, LandingDescription1, LandingDescription2];

export default function LandingSlideshow(){

  const classes = useStyles();
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }

  React.useEffect( () => {
    resetTimeout();
    timeoutRef.current = setTimeout( () =>
      setIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1),
    delay);

    return () => {
      resetTimeout();
    };
  }, [index]);


  return(

    <div>
      <Typography variant="h4" className={classes.title}>
        Rentix
      </Typography>
      <Card className={classes.root}>
        <CardActionArea>
          <Fade direction="left" in={true} key={index} timeout={4000}>
            <CardMedia
              component="img"
              alt="AppDescription"
              className={classes.cover}
              image={images[index]}
              title="Logo"/>
          </Fade>
          
        </CardActionArea>
      </Card>

      <div className={classes.dots}>
        {images.map((_, idx) => (
          <IconButton key={idx} OnClick={() => {
            setIndex(idx);
          }}>
            <FiberManualRecordIcon fontSize="small"
              color={index === idx ? "secondary" : "primary"} />
          </IconButton>
        ))}
      </div>

    </div>
    
    
  );
}

