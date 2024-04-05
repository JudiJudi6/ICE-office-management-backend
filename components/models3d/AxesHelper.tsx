import { Line } from "@react-three/drei";
import { Vector3 } from "three";

function AxesHelper() {
  return (
    <>
      {/* Oś X - czerwona */}
      <Line points={[new Vector3(0, 0, 0), new Vector3(10, 0, 0)]} color="red" />
      {/* Oś Y - zielona */}
      <Line
        points={[new Vector3(0, 0, 0), new Vector3(0, 10, 0)]}
        color="green"
      />
      {/* Oś Z - niebieska */}
      <Line
        points={[new Vector3(0, 0, 0), new Vector3(0, 0, 10)]}
        color="blue"
      />
    </>
  );
}

export default AxesHelper;
