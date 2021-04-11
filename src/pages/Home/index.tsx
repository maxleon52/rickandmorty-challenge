/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Button } from 'antd';
import styles from './home.module.scss';

import sadImage from '../../assets/icons/sad.svg';
import { GET_PERSONS, GET_LOCATIONS } from './querys';
import PersonCard from './components/PersonCard';
import LocationCard from './components/LocationCard';

interface Location {
  id: string;
  name: string;
  dimension: string;
  isSelected: boolean;
}
interface Person {
  id: string;
  name: string;
  species: string;
  gender: string;
  image: string;
  isSelected: boolean;
}
const listAdds = true;

function Home() {
  const [listPersons, setListPersons] = useState<Person[]>([]);
  const [listLocations, setListLocations] = useState<Location[]>([]);
  const { loading, data } = useQuery(GET_PERSONS);
  const { loading: loadingLocations, data: dataLocations } = useQuery(
    GET_LOCATIONS,
  );

  if (loading && loadingLocations) {
    <h1>Carregando...</h1>;
  }

  useEffect(() => {
    if (data) {
      const persons = data.characters.results.map((person: Person) => ({
        ...person,
        isSelected: false,
      }));
      setListPersons(persons);
    }
  }, [data]);

  useEffect(() => {
    if (dataLocations !== undefined) {
      const locations = dataLocations.locations.results.map(
        (location: Location) => ({
          ...location,
          isSelected: false,
        }),
      );
      setListLocations(locations);
    }
  }, [dataLocations]);

  const handleIsSelected = useCallback(
    (person: Person) => {
      if (person.isSelected === true) {
        const newArraPersons = listPersons.map(item =>
          item.id === person.id ? { ...item, isSelected: false } : item,
        );
        setListPersons(newArraPersons);
      } else {
        const newArraPersons = listPersons.map(item =>
          item.id === person.id ? { ...item, isSelected: true } : item,
        );
        setListPersons(newArraPersons);
      }
    },
    [listPersons],
  );

  const handleIsSelectedLocation = useCallback(
    (location: Location) => {
      if (location.isSelected === true) {
        const newArraLocations = listLocations.map(item =>
          item.id === location.id ? { ...item, isSelected: false } : item,
        );
        setListLocations(newArraLocations);
      } else {
        const newArraLocations = listLocations.map(item =>
          item.id === location.id ? { ...item, isSelected: true } : item,
        );
        setListLocations(newArraLocations);
      }
    },
    [listLocations],
  );

  // function handleIsSelectedLocation(location: Location) {
  //   if (location.isSelected === true) {
  //     const newArraLocations = listLocations.map(item =>
  //       item.id === location.id ? { ...item, isSelected: false } : item,
  //     );
  //     setListLocations(newArraLocations);
  //   } else {
  //     const newArraLocations = listLocations.map(item =>
  //       item.id === location.id ? { ...item, isSelected: true } : item,
  //     );
  //     setListLocations(newArraLocations);
  //   }
  // }

  return (
    <div className={styles.container}>
      <div className={styles.listPersonsLocations}>
        <section>
          {listPersons.map(person => (
            <PersonCard
              key={person.id}
              name={person.name}
              gender={person.gender}
              image={person.image}
              species={person.species}
              isSelected={person.isSelected}
              onClick={() => handleIsSelected(person)}
            />
          ))}
        </section>
        <section>
          {listLocations.map(location => (
            <LocationCard
              name={location.name}
              dimension={location.dimension}
              isSelected={location.isSelected}
              onClick={() => handleIsSelectedLocation(location)}
            />
          ))}
        </section>
      </div>
      <div className={styles.listCreateEpisode}>
        <div className={styles.boxAdd}>
          {listAdds ? (
            <div className={styles.cardAdd}>
              <button type="button">x</button>
              persons
            </div>
          ) : (
            <>
              <img src={sadImage} alt="icone de carinha triste" />
              <p>Você ainda não adicionou nada.</p>
            </>
          )}
        </div>
        <footer className={styles.footer}>
          <Button>Criar epísodio</Button>
        </footer>
      </div>
    </div>
  );
}

export default Home;
