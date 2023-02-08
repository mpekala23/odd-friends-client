export interface Answer {
  player: Player;
  value: number;
}

export interface Bet {
  player: Player;
  wager: number;
}

export interface Guess {
  player: Player;
  value: number;
  bets: Bet[];
}

export interface Player {
  name: string;
  sessionId: string;
  money: 0;
}

export interface Question {
  question: string;
  answers: Answer[];
  guesses: Guess[];
}

export type RoundState =
  | "lobby"
  | "answer"
  | "guess"
  | "bet"
  | "reveal"
  | "summary";

export interface GameState {
  leader: Player;
  players: Player[];
  gameRound: number;
  roundState: RoundState;
  timer: number;
  questions: Question[];
}
