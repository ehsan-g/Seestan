/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/Carousel3.css';

class Carousel3 extends Component {
  render() {
    const items = [
      {
        player: {
          title: 'Efren Reyes',
          desc:
            'Known as "The Magician", Efren Reyes is well regarded by many professionals as the greatest all around player of all time.',
          image: '/media/canvas10.png',
        },
      },
      {
        player: {
          title: "Ronnie O'Sullivan",
          desc:
            "Ronald Antonio O'Sullivan is a six-time world champion and is the most successful player in the history of snooker.",
          image: '/media/canvas12.png',
        },
      },
      {
        player: {
          title: 'Shane Van Boening',
          desc:
            'The "South Dakota Kid" is hearing-impaired and uses a hearing aid, but it has not limited his ability.',
          image: '/media/canvas8.png',
        },
      },
      {
        player: {
          title: 'Mike Sigel',
          desc:
            'Mike Sigel or "Captain Hook" as many like to call him is an American professional pool player with over 108 tournament wins.',
          image: '/media/canvas6.png',
        },
      },
      {
        player: {
          title: 'Willie Mosconi',
          desc:
            'Nicknamed "Mr. Pocket Billiards," Willie Mosconi was among the first Billiard Congress of America Hall of Fame inductees.',
          image: '/media/canvas9.png',
        },
      },
      {
        player: {
          title: 'Willie Mosconi',
          desc:
            'Nicknamed "Mr. Pocket Billiards," Willie Mosconi was among the first Billiard Congress of America Hall of Fame inductees.',
          image: '/media/canvas2.png',
        },
      },
      {
        player: {
          title: 'Willie Mosconi',
          desc:
            'Nicknamed "Mr. Pocket Billiards," Willie Mosconi was among the first Billiard Congress of America Hall of Fame inductees.',
          image: '/media/canvas14.png',
        },
      },
      {
        player: {
          title: 'Willie Mosconi',
          desc:
            'Nicknamed "Mr. Pocket Billiards," Willie Mosconi was among the first Billiard Congress of America Hall of Fame inductees.',
          image: '/media/canvas11.png',
        },
      },
      {
        player: {
          title: 'Willie Mosconi',
          desc:
            'Nicknamed "Mr. Pocket Billiards," Willie Mosconi was among the first Billiard Congress of America Hall of Fame inductees.',
          image: '/media/canvas12.png',
        },
      },
    ];
    const settings = {
      dots: true,
      autoplay: true,
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
    };
    return (
      <div className="container">
        <Slider {...settings}>
          <div>
            <img
              srcSet={`${this.items[0].player.image}?w=161&fit=crop&auto=format 1x,
              ${this.items[0].player.image}?w=161&fit=crop&auto=format&dpr=2 2x`}
              alt=""
              loading="lazy"
            />
          </div>
          <div>
            <img
              srcSet={`$/media/canvas6.png?w=161&fit=crop&auto=format 1x,
               /media/canvas6.png?w=161&fit=crop&auto=format&dpr=2 2x`}
              alt=""
              loading="lazy"
            />
          </div>
          <div>
            <img
              srcSet={`$/media/canvas6.png?w=161&fit=crop&auto=format 1x,
               /media/canvas6.png?w=161&fit=crop&auto=format&dpr=2 2x`}
              alt=""
              loading="lazy"
            />
          </div>
          <div>
            <img
              srcSet={`$/media/canvas6.png?w=161&fit=crop&auto=format 1x,
               /media/canvas6.png?w=161&fit=crop&auto=format&dpr=2 2x`}
              alt=""
              loading="lazy"
            />
          </div>
          <div>
            <img
              srcSet={`$/media/canvas6.png?w=161&fit=crop&auto=format 1x,
               /media/canvas6.png?w=161&fit=crop&auto=format&dpr=2 2x`}
              alt=""
              loading="lazy"
            />
          </div>
          <div>
            <img
              srcSet={`$/media/canvas6.png?w=161&fit=crop&auto=format 1x,
               /media/canvas6.png?w=161&fit=crop&auto=format&dpr=2 2x`}
              alt=""
              loading="lazy"
            />
          </div>
        </Slider>
      </div>
    );
  }
}

export default Carousel3;
