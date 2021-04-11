/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Button } from 'antd';
import styles from './home.module.scss';

import skyImage from '../../assets/images/sky.png';
import sadImage from '../../assets/icons/sad.svg';

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
const GET_LOCATIONS = gql`
  query {
    locations {
      results {
        id
        name
        dimension
      }
    }
  }
`;
const GET_PERSONS = gql`
  query {
    characters {
      results {
        id
        name
        image
        species
        gender
      }
    }
  }
`;
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

  function handleIsSelected(person: Person) {
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
  }
  function handleIsSelectedLocation(location: Location) {
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
  }

  useEffect(() => {
    console.log('listPersons aqui: ', listPersons);
  }, [listPersons]);

  return (
    <div className={styles.container}>
      <div className={styles.listPersonsLocations}>
        <section>
          {listPersons.map(person => (
            <div
              key={person.id}
              className={
                person.isSelected === true
                  ? styles.personIsSelect
                  : styles.person
              }
              onClick={() => handleIsSelected(person)}
            >
              <img src={person.image} alt={person.name} />
              <div className={styles.personData}>
                <p>{person.name}</p>
                <p>{person.species}</p>
                <p>{person.gender}</p>
              </div>
            </div>
          ))}
        </section>
        <section>
          {listLocations.map(location => (
            <div
              key={location.id}
              className={
                location.isSelected === true
                  ? styles.personIsSelect
                  : styles.person
              }
              onClick={() => handleIsSelectedLocation(location)}
            >
              <img src={skyImage} alt={location.name} />
              <div className={styles.locationData}>
                <p>{location.name}</p>
                <p>{location.dimension}</p>
              </div>
            </div>
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
