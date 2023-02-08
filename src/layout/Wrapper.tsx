import { Room } from "colyseus.js";
import { createRef, useEffect, useState } from "react";
import { ColyseusContext } from "../hooks/useColyseus";
import { GameState, Player } from "../types/Game";
import WAVES from "../components/Vanta/vanta.waves";
import * as THREE from "three";
import RoomInfo from "../components/RoomInfo";

interface Props {
  children?: JSX.Element | JSX.Element[];
}

export default function Wrapper({ children }: Props) {
  const [room, setRoom] = useState<Room<GameState> | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [self, setSelf] = useState<Player | null>(null);

  const vantaRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const vantaEff = (WAVES as any)({
      el: vantaRef.current,
      mouseControls: false,
      touchControls: false,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0xa6cfb6,
      shininess: 1.0,
      waveHeight: 6.5,
      waveSpeed: 0.9,
      zoom: 0.7,
      THREE: THREE,
    });
    return () => {
      vantaEff.destroy();
    };
  }, []);

  return (
    <ColyseusContext.Provider
      value={{
        room,
        setRoom,
        gameState,
        setGameState,
        self,
        setSelf,
      }}
    >
      <div className="relative z-10 w-screen h-screen">
        <div className="absolute top-1/2 -translate-y-1/2 w-full max-h-full">
          <div className="h-full overflow-auto p-8 pb-24">{children}</div>
        </div>

        <RoomInfo />
      </div>
      <div
        ref={vantaRef}
        id="test"
        className="fixed top-0 left-0 z-0 w-screen h-screen"
      />
    </ColyseusContext.Provider>
  );
}
