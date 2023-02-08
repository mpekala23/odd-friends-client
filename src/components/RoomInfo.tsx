import useColyseus from "../hooks/useColyseus";

export default function RoomInfo() {
  const { room } = useColyseus();

  if (!room) return null;

  return (
    <div className="flex h-16 justify-center items-center w-full bg-black fixed bottom-0">
      {room && (
        <p className="text-white">
          Room: <span className="italic">{room.id}</span>
        </p>
      )}
    </div>
  );
}
