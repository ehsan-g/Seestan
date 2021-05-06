/* eslint-disable no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import autoBind from 'auto-bind';
import '../styles/Carousel.scss';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Slider,
} from '@material-ui/core';

function Banner(props) {
  if (props.newProp) console.log(props.newProp);
  const contentPosition = props.contentPosition
    ? props.contentPosition
    : 'left';
  const totalItems = props.length ? props.length : 3;
  const mediaLength = totalItems - 1;

  let items = [];
  const content = (
    <Grid item xs={12 / totalItems} key="content">
      <CardContent className="Content">
        <Typography className="Title">{props.item.Name}</Typography>

        <Typography className="Caption">{props.item.Caption}</Typography>

        <Button variant="outlined" className="ViewButton">
          View Now
        </Button>
      </CardContent>
    </Grid>
  );

  for (let i = 0; i < mediaLength; i++) {
    const item = props.item.Items[i];

    const media = (
      <Grid item xs={12 / totalItems} key={item.Name}>
        <CardMedia className="Media" image={item.Image} title={item.Name}>
          <Typography className="MediaCaption">{item.Name}</Typography>
        </CardMedia>
      </Grid>
    );

    items.push(media);
  }

  if (contentPosition === 'left') {
    items.unshift(content);
  } else if (contentPosition === 'right') {
    items.push(content);
  } else if (contentPosition === 'middle') {
    items.splice(items.length / 2, 0, content);
  }

  return (
    <Card raised className="Banner">
      <Grid container spacing={0} className="BannerGrid">
        {items}
      </Grid>
    </Card>
  );
}

const items = [
  {
    Name: 'Electronics',
    Caption: 'Electrify your friends!',
    contentPosition: 'left',
    Items: [
      {
        title: 'شب‌های روشن',
        subtitle: 'Peru',
        description: 'Adventure is never far away',
        Image: '/media/canvas17.png',
      },
      {
        title: 'شب‌های روشن',
        subtitle: 'Peru',
        description: 'Adventure is never far away',
        Image: '/media/canvas17.png',
      },
    ],
  },
  {
    Name: 'Home Appliances',
    Caption: 'Say no to manual home labour!',
    contentPosition: 'middle',
    Items: [
      {
        title: 'مشهد دو نفر',
        subtitle: 'Australia',
        description: 'A piece of heaven',
        Image: '/media/canvas4.png',
      },
      {
        title: 'مشهد دو نفر',
        subtitle: 'Australia',
        description: 'A piece of heaven',
        Image: '/media/canvas4.png',
      },
    ],
  },
  {
    Name: 'Decoratives',
    Caption: 'Give style and color to your living room!',
    contentPosition: 'right',
    Items: [
      {
        Name: 'Living Room Lamp',
        Image: 'https://source.unsplash.com/featured/?lamp',
      },
      {
        Name: 'Floral Vase',
        Image: 'https://source.unsplash.com/featured/?vase',
      },
    ],
  },
];

class BannerExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      autoPlay: true,
      animation: 'fade',
      indicators: true,
      timeout: 500,
      navButtonsAlwaysVisible: false,
      navButtonsAlwaysInvisible: false,
      cycleNavigation: true,
    };

    autoBind(this);
  }

  toggleAutoPlay() {
    this.setState({
      autoPlay: !this.state.autoPlay,
    });
  }

  toggleIndicators() {
    this.setState({
      indicators: !this.state.indicators,
    });
  }

  toggleNavButtonsAlwaysVisible() {
    this.setState({
      navButtonsAlwaysVisible: !this.state.navButtonsAlwaysVisible,
    });
  }

  toggleNavButtonsAlwaysInvisible() {
    this.setState({
      navButtonsAlwaysInvisible: !this.state.navButtonsAlwaysInvisible,
    });
  }

  toggleCycleNavigation() {
    this.setState({
      cycleNavigation: !this.state.cycleNavigation,
    });
  }

  changeAnimation(event) {
    this.setState({
      animation: event.target.value,
    });
  }

  changeTimeout(event, value) {
    this.setState({
      timeout: value,
    });
  }

  render() {
    return (
      <div style={{ marginTop: '50px', color: '#494949' }}>
        <Carousel
          className="Example"
          autoPlay={this.state.autoPlay}
          animation={this.state.animation}
          indicators={this.state.indicators}
          timeout={this.state.timeout}
          cycleNavigation={this.state.cycleNavigation}
          navButtonsAlwaysVisible={this.state.navButtonsAlwaysVisible}
          navButtonsAlwaysInvisible={this.state.navButtonsAlwaysInvisible}
          next={(now, previous) =>
            console.log(
              `Next User Callback: Now displaying child${now}. Previously displayed child${previous}`
            )
          }
          prev={(now, previous) =>
            console.log(
              `Prev User Callback: Now displaying child${now}. Previously displayed child${previous}`
            )
          }
          onChange={(now, previous) =>
            console.log(
              `OnChange User Callback: Now displaying child${now}. Previously displayed child${previous}`
            )
          }
          fullHeightHover={false}
          navButtonsProps={{
            style: { backgroundColor: 'cornflowerblue', borderRadius: 0 },
          }}
          navButtonsWrapperProps={{ style: { bottom: '0', top: 'unset' } }}
          indicatorContainerProps={{ style: { margin: '20px' } }}
          NextIcon="next"
        >
          {items.map((item, index) => (
            <Banner
              item={item}
              key={index}
              contentPosition={item.contentPosition}
            />
          ))}
        </Carousel>

        <FormLabel component="legend">Options</FormLabel>
        <FormControlLabel
          control={
            <Checkbox
              onChange={this.toggleAutoPlay}
              checked={this.state.autoPlay}
              value="autoplay"
              color="primary"
            />
          }
          label="Auto-play"
        />
        <FormControlLabel
          control={
            <Checkbox
              onChange={this.toggleIndicators}
              checked={this.state.indicators}
              value="indicators"
              color="primary"
            />
          }
          label="Indicators"
        />
        <FormControlLabel
          control={
            <Checkbox
              onChange={this.toggleNavButtonsAlwaysVisible}
              checked={this.state.navButtonsAlwaysVisible}
              value="NavButtonsAlwaysVisible"
              color="primary"
            />
          }
          label="NavButtonsAlwaysVisible"
        />

        <FormControlLabel
          control={
            <Checkbox
              onChange={this.toggleNavButtonsAlwaysInvisible}
              checked={this.state.navButtonsAlwaysInvisible}
              value="NavButtonsAlwaysInvisible"
              color="primary"
            />
          }
          label="NavButtonsAlwaysInvisible"
        />
        <FormControlLabel
          control={
            <Checkbox
              onChange={this.toggleCycleNavigation}
              checked={this.state.cycleNavigation}
              value="CycleNavigation"
              color="primary"
            />
          }
          label="CycleNavigation"
        />

        <FormControlLabel
          control={
            <RadioGroup
              name="animation"
              value={this.state.animation}
              onChange={this.changeAnimation}
              row
              style={{ marginLeft: '10px' }}
            >
              <FormControlLabel
                value="fade"
                control={<Radio color="primary" />}
                label="Fade"
              />
              <FormControlLabel
                value="slide"
                control={<Radio color="primary" />}
                label="Slide"
              />
            </RadioGroup>
          }
        />

        <FormControlLabel
          control={
            <div style={{ width: 300 }}>
              <Typography id="discrete-slider" gutterBottom>
                Animation Duration (Timeout) in ms
              </Typography>
              <Slider
                defaultValue={500}
                getAriaValueText={() => `${this.state.timeout}ms`}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={100}
                marks
                min={100}
                max={2000}
                onChange={this.changeTimeout}
              />
            </div>
          }
        />
      </div>
    );
  }
}

export default BannerExample;
