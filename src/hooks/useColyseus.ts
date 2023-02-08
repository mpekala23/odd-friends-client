import { Room } from "colyseus.js";
import { createContext, useContext } from "react";
import { client } from "../api/colyseus";
import { RoundState, GameState, Player } from "../types/Game";
import toast from "react-hot-toast";

export type ColyseusState = {
  room: Room<GameState> | null;
  setRoom: (val: Room<GameState> | null) => void;
  gameState: GameState | null;
  setGameState: (val: GameState | null) => void;
  self: Player | null;
  setSelf: (val: Player | null) => void;
};

export const ColyseusContext = createContext<ColyseusState>({
  room: null,
  setRoom: (_) => {},
  gameState: null,
  setGameState: (_) => {},
  self: null,
  setSelf: (_) => {},
});

const useColyseus = () => {
  const { room, setRoom, gameState, setGameState, self, setSelf } =
    useContext(ColyseusContext);

  const setDummyRoom = () => {
    setRoom(new Room("dummy"));
  };

  const clearColyseus = () => {
    setRoom(null);
    setGameState(null);
    setSelf(null);
  };

  const trackRoom = (room: Room<GameState>) => {
    room.onStateChange((newState: GameState) => {
      const cleanState: GameState = JSON.parse(JSON.stringify(newState));
      if (!self) {
        cleanState.players.forEach((player) => {
          if (player.sessionId === room.sessionId) {
            setSelf(player);
          }
        });
      }
      setGameState(cleanState);
    });
    room.onError((code, message) => {
      toast.error(message || "Game error");
    });
    room.onLeave(() => {
      clearColyseus();
      toast.error("Sorry! The room was destroyed.");
    });
  };

  const createRoom = async (roomName: string) => {
    setDummyRoom();
    const newRoom: Room<GameState> = await client.create(roomName);
    setRoom(newRoom);
    setGameState(JSON.parse(JSON.stringify(newRoom.state)));
    trackRoom(newRoom);
  };

  const joinRoomById = async (roomId: string) => {
    setDummyRoom();
    const newRoom: Room<GameState> = await client.joinById(roomId);
    setRoom(newRoom);
    setGameState(JSON.parse(JSON.stringify(newRoom.state)));
    trackRoom(newRoom);
  };

  const joinRoom = async (roomName: string) => {
    setDummyRoom();
    const newRoom: Room<GameState> = await client.join(roomName);
    setRoom(newRoom);
    setGameState(JSON.parse(JSON.stringify(newRoom.state)));
    trackRoom(newRoom);
  };

  const joinOrCreateRoom = async (roomName: string) => {
    setDummyRoom();
    const newRoom: Room<GameState> = await client.joinOrCreate(roomName);
    setRoom(newRoom);
    setGameState(JSON.parse(JSON.stringify(newRoom.state)));
    trackRoom(newRoom);
  };

  const identifyPlayer = (name: string) => {
    if (!room) throw Error("No room");
    room.send("identifyPlayer", { name });
  };

  const updateRoundState = (roundState: RoundState) => {
    if (!room) throw Error("No room");
    room.send("updateRoundState", { roundState: roundState });
  };

  const submitAnswer = (answer: number) => {
    if (!room) throw Error("No room");
    try {
      room.send("answer", { answer });
    } catch (e) {}
  };

  const submitGuess = (guess: number) => {
    if (!room) throw Error("No room");
    try {
      room.send("guess", { guess });
    } catch (e) {}
  };

  return {
    client,
    gameState,
    room,
    self,
    setSelf,
    createRoom,
    joinRoomById,
    joinRoom,
    joinOrCreateRoom,
    clearColyseus,
    identifyPlayer,
    updateRoundState,
    submitAnswer,
    submitGuess,
  };
};

export default useColyseus;
