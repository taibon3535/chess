import React from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';
import { toast } from 'react-toastify';
import { Timer } from './timer';

interface ChessGameState {
  fen: string;
}

interface ChessGameProps {}

class ChessGame extends React.Component<ChessGameProps, ChessGameState> {
  private game = new Chess();

  constructor(props: ChessGameProps) {
    super(props);
    this.state = {
      fen: 'start',
    };
  }

  handleMove = (move: {
    sourceSquare: string;
    targetSquare: string;
    piece: string;
  }) => {
    try {
      const result = this.game.move({
        from: move.sourceSquare,
        to: move.targetSquare,
        promotion: 'q',
      });

      if (result !== null) {
        this.setState({ fen: this.game.fen() });
      } else {
        console.error('Move was not successful.');
      }
    } catch (error) {
      console.error('An error occurred during the move:', error);
    }
  };

  handleCheck() {
    if (this.game.isCheck() && !this.game.isCheckmate()) {
      toast.warn(`Your in Chack, protect your king!`, {
        position: 'bottom-left',
      }); // Notify check
    }

    if (this.game.isCheckmate()) {
      const turn = this.game.turn();
      toast.error(`Checkmate, ${turn === 'b' ? 'White' : 'Black'} wins! `, {
        position: 'bottom-left',
      });
    }

    if (this.game.isDraw()) {
      const msg = this.game.isInsufficientMaterial();
      toast.success(
        `Draw ${
          msg
            ? 'by insufficient material, Good Game!'
            : 'by the 50 move rule, Good Game!'
        }`,
        { position: 'bottom-left' },
      );
    }

    if (
      this.game.isGameOver() &&
      !this.game.isDraw() &&
      !this.game.isCheckmate()
    ) {
      const msg = this.game.isStalemate();
      toast.success(
        `Draw ${msg ? 'by stalemate, Good Game!' : 'by agreement, Good Game!'}`,
        { position: 'bottom-left' },
      );
    }

    if (this.game.isGameOver()) {
      toast.info(`reseting is 5 seconds, GG!`, {
        position: 'bottom-right',
        autoClose: 4500,
      });
      setTimeout(() => {
        this.game.reset();
        this.setState({ fen: this.game.fen() }); // Update state to the initial FEN string after reset
      }, 4500);
    }
  }

  render() {
    return (
      <>
        <div className="absolute left-20 ml-10" style={{ top: '20rem' }}>
          <div
            className="flex items-center justify-center bg-white p-4 shadow-xl"
            style={{
              fontSize: '45px',
              width: '200px',
              height: '100px',
              color: 'black',
              borderRadius: '90px', // Added border radius
            }}
          >
            <Timer
              turn={this.game.turn()}
              type="w"
              gameActive={!this.game.isGameOver()}
            />
          </div>
        </div>

        <div
          className="flex items-center justify-center"
          style={{ paddingTop: '2rem' }}
        >
          <Chessboard
            position={this.state.fen}
            onDrop={({ sourceSquare, targetSquare, piece }) => {
              this.handleMove({ sourceSquare, targetSquare, piece }); // Process move
              this.handleCheck();
            }}
          />
        </div>

        <div className="absolute right-20 mr-10" style={{ top: '20rem' }}>
          <div
            className="flex items-center justify-center bg-black p-4 shadow-xl"
            style={{
              fontSize: '45px',
              width: '200px',
              height: '100px',
              color: 'white',
              borderRadius: '90px',
            }}
          >
            <Timer
              turn={this.game.turn()}
              type="b"
              gameActive={!this.game.isGameOver()}
            />
          </div>
        </div>
      </>
    );
  }
}

export default ChessGame;
