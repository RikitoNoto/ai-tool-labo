#####################
# Welcome to Cursor #
#####################

'''
Step 1: Try generating with Cmd+K or Ctrl+K on a new line. Ask for CLI-based game of TicTacToe.
*You seem to be using an outdated version of Cursor. Please upgrade to the latest version by [downloading Cursor again from our website](https://www.cursor.com/). All your settings will be preserved.*

Step 2: Hit Cmd+L or Ctrl+L and ask the chat what the code does. 
   - Then, try running the code

Step 3: Try highlighting all the code with your mouse, then hit Cmd+k or Ctrl+K. 
   - Instruct it to change the game in some way (e.g. add colors, add a start screen, make it 4x4 instead of 3x3)

Step 4: To try out cursor on your own projects, go to the file menu (top left) and open a folder.
'''

# 色の定数定義
RED = "\033[31m"
BLUE = "\033[34m"
RESET = "\033[0m"

def print_board(board):
    for i in range(3):
        row = []
        for j in range(3):
            cell = board[i*3+j]
            if cell == "X":
                row.append(f"{RED} {cell} {RESET}")  # 赤色
            elif cell == "O": 
                row.append(f"{BLUE} {cell} {RESET}")  # 青色
            else:
                row.append(f" {cell} ")
        print("|".join(row))
        if i < 2:
            print("-----------")


def check_winner(board):
    # 横のチェック
    for i in range(0, 9, 3):
        if board[i] == board[i+1] == board[i+2] != " ":
            return board[i]
    
    # 縦のチェック 
    for i in range(3):
        if board[i] == board[i+3] == board[i+6] != " ":
            return board[i]
    
    # 斜めのチェック
    if board[0] == board[4] == board[8] != " ":
        return board[0]
    if board[2] == board[4] == board[6] != " ":
        return board[2]
    
    return None


def is_board_full(board):
    return " " not in board


def main():
    board = [" "] * 9
    current_player = "X"
    
    print("三目並べゲームを開始します!")
    print("マス目は1-9の数字で指定してください:")
    print("1 | 2 | 3")
    print("-----------")
    print("4 | 5 | 6")
    print("-----------")
    print("7 | 8 | 9")
    print(f"{RED}プレイヤーX{RESET} vs {BLUE}プレイヤーO{RESET}")
    
    while True:
        print_board(board)
        
        # プレイヤーの入力
        while True:
            try:
                color = RED if current_player == "X" else BLUE
                position = int(input(f"{color}プレイヤー{current_player}{RESET}の番です (1-9): ")) - 1
                if 0 <= position <= 8 and board[position] == " ":
                    break
                print("無効な入力です。空いているマス目を1-9で指定してください。")
            except ValueError:
                print("1-9の数字を入力してください。")
        
        # マス目を更新
        board[position] = current_player
        
        # 勝敗チェック
        winner = check_winner(board)
        if winner:
            print_board(board)
            color = RED if winner == "X" else BLUE
            print(f"{color}プレイヤー{winner}{RESET}の勝利です!")
            break
            
        # 引き分けチェック
        if is_board_full(board):
            print_board(board)
            print("引き分けです!")
            break
        
        # プレイヤーの交代
        current_player = "O" if current_player == "X" else "X"


if __name__ == "__main__":
    main()
