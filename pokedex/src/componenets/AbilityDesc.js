import { useState, useEffect } from "react";
import pokemonAPI from "../utils/pokemonAPI";

const AbilityDesc = ({ abilityName }) => {
  console.log("ability id", abilityName);
  const [abilityDesc, setAbilityDesc] = useState();

  useEffect(() => {
    async function fetchData() {
      const { data } = await pokemonAPI.getAbility(abilityName);
      const { effect_entries } = data;
      console.log("effect_entries", effect_entries);

      const shortEffectZero = effect_entries[0].short_effect;
      const shortEffectOne = effect_entries[1].short_effect;

      if (effect_entries[0].language.name === "en") {
        setAbilityDesc(shortEffectZero);
      } else if (effect_entries[1].language.name === "en") {
        setAbilityDesc(shortEffectOne);
      } else {
        setAbilityDesc(null);
      }
    }
    fetchData();
  }, [abilityName]);

  return (
    <div>
      {abilityDesc ? (
        <p>{abilityDesc}</p>
      ) : (
        <p>No Ability Description is Available</p>
      )}
    </div>
  );
};

export default AbilityDesc;
