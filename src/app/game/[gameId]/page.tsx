import Board from "src/components/Board";

interface GameProps {
  params: {
    gameId: string;
  };
}

export default function Page(props: GameProps) {
  const { params } = props;
  const { gameId } = params;

  return <Board />;
}
