/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { HtmlHTMLAttributes } from 'react';

import styles from './personCard.module.scss';

interface Person extends HtmlHTMLAttributes<HTMLDivElement> {
  name: string;
  species: string;
  gender: string;
  image: string;
  isSelected: boolean;
  onClick: () => void;
}

function PersonCard({
  name,
  species,
  gender,
  image,
  isSelected,
  onClick,
}: Person) {
  return (
    <div
      onClick={onClick}
      className={isSelected === true ? styles.personIsSelect : styles.person}
    >
      <img src={image} alt={name} />
      <div className={styles.personData}>
        <p>{name}</p>
        <p>{species}</p>
        <p>{gender}</p>
      </div>
    </div>
  );
}

export default PersonCard;
