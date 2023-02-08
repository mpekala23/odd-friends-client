import useColyseus from "../hooks/useColyseus";
import { Player } from "../types/Game";

interface Props {
  player: Player;
  className?: string;
}

export default function PlayerChip({ player, className }: Props) {
  const { self } = useColyseus();
  return (
    <div className={`${className} flex`} key={player.sessionId}>
      <div
        className={`${
          self?.sessionId === player.sessionId ? "bg-green-300" : "bg-blue-300"
        } rounded-2xl p-1`}
      >
        {player.name}
      </div>
    </div>
  );
}
