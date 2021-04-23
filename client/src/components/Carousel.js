/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef, useReducer } from 'react';
import { Grid, Button } from '@material-ui/core';
import '../styles/carousel.scss';

const slides = [
  {
    title: 'شب‌های روشن',
    subtitle: 'Peru',
    description: 'Adventure is never far away',
    image:
      'https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
  },
  {
    title: 'پروانه‌های خاموش',
    subtitle: 'France',
    description: 'Let your dreams come true',
    image:
      'https://images.unsplash.com/photo-1581836499506-4a660b39478a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
  },
  {
    title: 'ستاره‌های سربی',
    subtitle: 'Australia',
    description: 'A piece of heaven',
    image:
      'https://images.unsplash.com/photo-1566522650166-bd8b3e3a2b4b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
  },
  {
    title: 'مشهد دو نفر',
    subtitle: 'Australia',
    description: 'A piece of heaven',
    image:
      'https://images.unsplash.com/flagged/photo-1564918031455-72f4e35ba7a6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
  },
  {
    title: 'خدحافظی',
    subtitle: 'Australia',
    description: 'A piece of heaven',
    image:
      'https://images.unsplash.com/photo-1579130781921-76e18892b57b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
  },
];

function useTilt(active) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || !active) {
      return;
    }

    const state = {
      rect: undefined,
      mouseX: undefined,
      mouseY: undefined,
    };

    const el = ref.current;

    const handleMouseMove = (e) => {
      if (!el) {
        return;
      }
      if (!state.rect) {
        state.rect = el.getBoundingClientRect();
      }
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
      const px = (state.mouseX - state.rect.left) / state.rect.width;
      const py = (state.mouseY - state.rect.top) / state.rect.height;

      el.style.setProperty('--px', px);
      el.style.setProperty('--py', py);
    };

    el.addEventListener('mousemove', handleMouseMove);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
    };
  }, [active]);

  return ref;
}

const initialState = {
  slideIndex: 0,
};

const slidesReducer = (state, event) => {
  if (event.type === 'NEXT') {
    return {
      ...state,
      slideIndex: (state.slideIndex + 1) % slides.length,
    };
  }
  if (event.type === 'PREV') {
    return {
      ...state,
      slideIndex:
        state.slideIndex === 0 ? slides.length - 1 : state.slideIndex - 1,
    };
  }
};

function Slide({ slide, offset }) {
  const active = offset === 0 ? true : null;
  const ref = useTilt(active);

  return (
    <Grid
      ref={ref}
      className="slide"
      data-active={active}
      style={{
        '--offset': offset,
        '--dir': offset === 0 ? 0 : offset > 0 ? 1 : -1,
      }}
    >
      <Grid
        className="slideBackground"
        style={{
          backgroundImage: `url('${slide.image}')`,
        }}
      />
      <Grid
        className="slideContent"
        style={{
          backgroundImage: `url('${slide.image}')`,
        }}
      >
        <Grid className="slideContentInner">
          <h2 className="slideTitle">{slide.title}</h2>
          <h3 className="slideSubtitle">{slide.subtitle}</h3>
          <p className="slideDescription">{slide.description}</p>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default function App() {
  const [state, dispatch] = useReducer(slidesReducer, initialState);

  return (
    <Grid className="slides">
      <Button onClick={() => dispatch({ type: 'PREV' })}>‹</Button>

      {[...slides, ...slides, ...slides].map((slide, i) => {
        const offset = slides.length + (state.slideIndex - i);
        return <Slide slide={slide} offset={offset} key={i} />;
      })}
      <Button onClick={() => dispatch({ type: 'NEXT' })}>›</Button>
    </Grid>
  );
}
