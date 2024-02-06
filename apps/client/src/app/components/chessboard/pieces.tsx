// Pieces.tsx
import React from 'react';
import { Draggable } from './draggable';
import bbi from '../../images/bbi.png';
import bki from '../../images/bki.png';
import bkn from '../../images/bkn.png';
import bpo from '../../images/bpo.png';
import bqu from '../../images/bqu.png';
import bro from '../../images/bro.png';
import wbi from '../../images/wbi.png';
import wki from '../../images/wki.png';
import wkn from '../../images/wkn.png';
import wpo from '../../images/wpo.png';
import wqu from '../../images/wqu.png';
import wro from '../../images/wro.png';

interface PieceProps {
  id: string;
  image: string;
  alt: string;
}

const Piece: React.FC<PieceProps> = ({ id, image, alt }) => {
  return (
    <Draggable id={id}>
      <img src={image} alt={alt} style={{ width: '100%', height: '100%' }} />
    </Draggable>
  );
};

export const startingLayout: { [key: string]: string } = {
  a1: wro,
  b1: wkn,
  c1: wbi,
  d1: wqu,
  e1: wki,
  f1: wbi,
  g1: wkn,
  h1: wro,
  a2: wpo,
  b2: wpo,
  c2: wpo,
  d2: wpo,
  e2: wpo,
  f2: wpo,
  g2: wpo,
  h2: wpo,
  a7: bpo,
  b7: bpo,
  c7: bpo,
  d7: bpo,
  e7: bpo,
  f7: bpo,
  g7: bpo,
  h7: bpo,
  a8: bro,
  b8: bkn,
  c8: bbi,
  d8: bqu,
  e8: bki,
  f8: bbi,
  g8: bkn,
  h8: bro,
};

export const renderPiece = (
  tileId: string,
  layout: { [key: string]: string },
) => {
  const piece = layout[tileId];
  if (piece) {
    return <Piece id={tileId} image={piece} alt={tileId} />;
  }
  return null;
};
