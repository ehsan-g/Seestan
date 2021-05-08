/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import '../styles/Carousel2.scss';

/** **********************************
1. If you want to add or remove items you will need to change a variable called $slide-count in the CSS *minimum 3 slides

2. if you want to change the dimensions of the slides you will need to edit the slideWidth variable here 👇 and the $slide-width variable in the CSS.
*********************************** */
const slideWidth = 25;

const _items = [
  {
    player: {
      title: 'Efren Reyes',
      desc:
        'Known as "The Magician", Efren Reyes is well regarded by many professionals as the greatest all around player of all time.',
      image: '/media/canvas10.jpg',
    },
  },
  {
    player: {
      title: "Ronnie O'Sullivan",
      desc:
        "Ronald Antonio O'Sullivan is a six-time world champion and is the most successful player in the history of snooker.",
      image: '/media/canvas12.jpg',
    },
  },
  {
    player: {
      title: 'Shane Van Boening',
      desc:
        'The "South Dakota Kid" is hearing-impaired and uses a hearing aid, but it has not limited his ability.',
      image: '/media/canvas8.jpg',
    },
  },
  {
    player: {
      title: 'Mike Sigel',
      desc:
        'Mike Sigel or "Captain Hook" as many like to call him is an American professional pool player with over 108 tournament wins.',
      image: '/media/canvas6.jpg',
    },
  },
  {
    player: {
      title: 'Willie Mosconi',
      desc:
        'Nicknamed "Mr. Pocket Billiards," Willie Mosconi was among the first Billiard Congress of America Hall of Fame inductees.',
      image: '/media/canvas9.jpg',
    },
  },
  {
    player: {
      title: 'Willie Mosconi',
      desc:
        'Nicknamed "Mr. Pocket Billiards," Willie Mosconi was among the first Billiard Congress of America Hall of Fame inductees.',
      image: '/media/canvas3.jpg',
    },
  },
  {
    player: {
      title: 'Willie Mosconi',
      desc:
        'Nicknamed "Mr. Pocket Billiards," Willie Mosconi was among the first Billiard Congress of America Hall of Fame inductees.',
      image: '/media/canvas19.jpg',
    },
  },
  {
    player: {
      title: 'Willie Mosconi',
      desc:
        'Nicknamed "Mr. Pocket Billiards," Willie Mosconi was among the first Billiard Congress of America Hall of Fame inductees.',
      image: '/media/canvas11.jpg',
    },
  },
  {
    player: {
      title: 'Willie Mosconi',
      desc:
        'Nicknamed "Mr. Pocket Billiards," Willie Mosconi was among the first Billiard Congress of America Hall of Fame inductees.',
      image: '/media/canvas12.jpg',
    },
  },
];

const { length } = _items;
_items.push(..._items);

const sleep = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));

const createItem = (position, idx) => {
  const item = {
    styles: {
      transform: `translateX(${position * slideWidth}rem)`,
    },
    player: _items[idx].player,
  };

  switch (position) {
    case length - 1:
    case length + 1:
      item.styles = { ...item.styles, filter: 'grayscale(1)' };
      break;
    case length:
      break;
    default:
      item.styles = { ...item.styles, opacity: 0 };
      break;
  }

  return item;
};

const CarouselSlideItem = ({ pos, idx, activeIdx }) => {
  const item = createItem(pos, idx, activeIdx);

  return (
    <li className="carousel__slide-item" style={item.styles}>
      <div className="carousel__slide-item-img-link">
        {/* <img src={item.player.image} alt={item.player.title} /> */}
        <img
          srcSet={`${item.player.image}?w=161&fit=crop&auto=format 1x,
                  ${item.player.image}?w=161&fit=crop&auto=format&dpr=2 2x`}
          alt={item.player.title}
          loading="lazy"
        />
      </div>
      <div className="carousel-slide-item__body">
        <h4>{item.player.title}</h4>
        <p>{item.player.desc}</p>
      </div>
    </li>
  );
};

const keys = Array.from(Array(_items.length).keys());

export default function Carousel() {
  const [items, setItems] = useState(keys);
  const [isTicking, setIsTicking] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const bigLength = items.length;

  const prevClick = (jump = 1) => {
    if (!isTicking) {
      setIsTicking(true);
      setItems((prev) => prev.map((_, i) => prev[(i + jump) % bigLength]));
    }
  };

  const nextClick = (jump = 1) => {
    if (!isTicking) {
      setIsTicking(true);
      setItems((prev) =>
        prev.map((_, i) => prev[(i - jump + bigLength) % bigLength])
      );
    }
  };

  // const handleDotClick = (idx) => {
  //   if (idx < activeIdx) prevClick(activeIdx - idx);
  //   if (idx > activeIdx) nextClick(idx - activeIdx);
  // };

  useEffect(() => {
    if (isTicking) sleep(300).then(() => setIsTicking(false));
  }, [isTicking]);

  useEffect(() => {
    setActiveIdx((length - (items[0] % length)) % length) // prettier-ignore
  }, [items]);

  return (
    <div className="carousel__wrap">
      <div className="carousel__inner">
        <button
          className="carousel__btn carousel__btn--prev"
          onClick={() => prevClick()}
        >
          <i className="carousel__btn-arrow carousel__btn-arrow--left" />
        </button>
        <div className="carousel__container">
          <ul className="carousel__slide-list">
            {items.map((pos, i) => (
              <CarouselSlideItem
                key={i}
                idx={i}
                pos={pos}
                activeIdx={activeIdx}
              />
            ))}
          </ul>
        </div>
        <button
          className="carousel__btn carousel__btn--next"
          onClick={() => nextClick()}
        >
          <i className="carousel__btn-arrow carousel__btn-arrow--right" />
        </button>
        {/* <div className="carousel__dots">
          {items.slice(0, length).map((pos, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={i === activeIdx ? 'dot active' : 'dot'}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
}
