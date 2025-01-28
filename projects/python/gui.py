import tkinter as tk
from tkinter import messagebox

class TicTacToe:
    def __init__(self):
        self.window = tk.Tk()
        self.window.title("三目並べ")
        
        # ゲーム状態の初期化
        self.current_player = "X"
        self.board = [" "] * 9
        
        # ボタンの作成
        self.buttons = []
        for i in range(3):
            for j in range(3):
                button = tk.Button(
                    self.window,
                    text="",
                    font=('Arial', 20),
                    width=5,
                    height=2,
                    command=lambda row=i, col=j: self.button_click(row, col)
                )
                button.grid(row=i, column=j)
                self.buttons.append(button)
        
        # プレイヤー表示ラベル
        self.player_label = tk.Label(
            self.window,
            text=f"プレイヤー{self.current_player}の番です",
            font=('Arial', 12)
        )
        self.player_label.grid(row=3, column=0, columnspan=3)

    def button_click(self, row, col):
        index = row * 3 + col
        
        # 空のマスのみクリック可能
        if self.board[index] == " ":
            self.board[index] = self.current_player
            self.buttons[index].config(
                text=self.current_player,
                fg="red" if self.current_player == "X" else "blue"
            )
            
            # 勝敗チェック
            winner = self.check_winner()
            if winner:
                messagebox.showinfo("ゲーム終了", f"プレイヤー{winner}の勝利です!")
                self.reset_game()
                return
            
            # 引き分けチェック
            if self.is_board_full():
                messagebox.showinfo("ゲーム終了", "引き分けです!")
                self.reset_game()
                return
            
            # プレイヤーの交代
            self.current_player = "O" if self.current_player == "X" else "X"
            self.player_label.config(text=f"プレイヤー{self.current_player}の番です")

    def check_winner(self):
        # 横のチェック
        for i in range(0, 9, 3):
            if self.board[i] == self.board[i+1] == self.board[i+2] != " ":
                return self.board[i]
        
        # 縦のチェック
        for i in range(3):
            if self.board[i] == self.board[i+3] == self.board[i+6] != " ":
                return self.board[i]
        
        # 斜めのチェック
        if self.board[0] == self.board[4] == self.board[8] != " ":
            return self.board[0]
        if self.board[2] == self.board[4] == self.board[6] != " ":
            return self.board[2]
        
        return None

    def is_board_full(self):
        return " " not in self.board

    def reset_game(self):
        # ゲーム状態のリセット
        self.current_player = "X"
        self.board = [" "] * 9
        
        # ボタンのリセット
        for button in self.buttons:
            button.config(text="", fg="black")
        
        # ラベルのリセット
        self.player_label.config(text=f"プレイヤー{self.current_player}の番です")

    def run(self):
        self.window.mainloop()

if __name__ == "__main__":
    game = TicTacToe()
    game.run()
