import { Forest, Grassland, Wetland, PlayABird } from "./";

const HabitatMat = () => {
  return (
    <div className="col-start-1 col-span-3 ">
      <PlayABird />
      <Forest />
      <Grassland />
      <Wetland />
    </div>
  );
};

export default HabitatMat;
