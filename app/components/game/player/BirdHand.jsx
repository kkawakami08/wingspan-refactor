import { useAtom } from "jotai";
import { birdHandAtom } from "../../../utils/jotaiStore";
import { BirdCard } from "../individual";

const BirdHand = () => {
  //get states from jotai
  const [birdHand] = useAtom(birdHandAtom);

  //mapping over birdhand
  const birdHandContent = birdHand.map((bird) => (
    <BirdCard key={bird.common_name} bird={bird} />
  ));

  return (
    <div>
      <div className="flex gap-5">
        <p>Player bird hand</p>
      </div>
      <div className="flex gap-3 flex-wrap">{birdHandContent}</div>
    </div>
  );
};

export default BirdHand;
