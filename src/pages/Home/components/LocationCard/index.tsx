/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { HtmlHTMLAttributes } from 'react';

import skyImage from '../../../../assets/images/sky.png';
import styles from './locationCard.module.scss';

interface Location extends HtmlHTMLAttributes<HTMLDivElement> {
  name: string;
  dimension: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function LocationCard({
  name,
  dimension,
  isSelected,
  onClick,
}: Location) {
  return (
    <div
      className={isSelected === true ? styles.personIsSelect : styles.person}
      onClick={onClick}
    >
      <img src={skyImage} alt={name} />
      <div className={styles.locationData}>
        <p>{name}</p>
        <p>{dimension}</p>
      </div>
    </div>
  );
}
