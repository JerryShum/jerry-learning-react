import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";

function CountryList({ cities, isLoading }) {
   if (isLoading) return <Spinner />;

   if (!cities.length)
      return <Message message="Add your first city by clicking on the map." />;

   const countries = cities.reduce((array, currentCity) => {
      if (!array.map((el) => el.country).includes(currentCity.country)) {
         return [
            ...array,
            { country: currentCity.country, emoji: currentCity.emoji },
         ];
      } else {
         return array;
      }
   }, []);
   return (
      <ul className={styles.countryList}>
         {countries.map((country) => (
            <CountryItem country={country} key={country.country} />
         ))}
      </ul>
   );
}

export default CountryList;
