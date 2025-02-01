from kivy.app import App
from kivy.uix.gridlayout import GridLayout
from kivy.uix.button import Button
from kivy.uix.label import Label
from kivy.core.window import Window
from kivy.graphics import Color, Line, Ellipse


class GomokuGame(GridLayout):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.cols = 1
        self.board_size = 15
        self.current_player = "black"  # 黒から開始

        # ステータス表示用のラベル
        self.status = Label(text="黒の番です", size_hint=(1, 0.1))
        self.add_widget(self.status)

        # 盤面のグリッド
        self.board = GridLayout(cols=self.board_size, spacing=1)
        self.buttons = []

        # ボタンの作成
        for i in range(self.board_size * self.board_size):
            btn = Button(
                text="",
                background_normal="",
                background_color=(0.8, 0.8, 0.6, 1),
                on_press=self.make_move,
                border=(1, 1, 1, 1),  # 境界線を追加
            )
            # ボタンのサイズを固定
            btn.size_hint = (None, None)
            btn.size = (40, 40)
            # 境界線の色を設定
            with btn.canvas.before:
                Color(0, 0, 0, 1)  # 黒色
                Line(rectangle=(btn.x, btn.y, btn.width, btn.height))

            self.buttons.append(btn)
            self.board.add_widget(btn)

        # ボードを中央に配置
        self.board.size_hint = (None, None)
        self.board.size = (self.board_size * 40, self.board_size * 40)
        self.board.pos_hint = {"center_x": 0.5}

        self.add_widget(self.board)

    def make_move(self, button):
        if not button.text:  # 空のマスの場合のみ
            button.text = " "  # スペースを設定して埋まっていることを示す

            # 石を描画
            with button.canvas:
                Color(0, 0, 0, 1) if self.current_player == "black" else Color(
                    1, 1, 1, 1
                )
                Ellipse(
                    pos=(button.x + 5, button.y + 5),
                    size=(button.width - 10, button.height - 10),
                )

                # 白石の場合は黒い縁取りを追加
                if self.current_player == "white":
                    Color(0, 0, 0, 1)
                    Line(
                        circle=(
                            button.x + button.width / 2,
                            button.y + button.height / 2,
                            (button.width - 10) / 2,
                        )
                    )

            if self.check_win(self.buttons.index(button)):
                winner = "黒" if self.current_player == "black" else "白"
                self.status.text = f"{winner}の勝利！"
                self.disable_all_buttons()
            else:
                # プレイヤーの交代
                self.current_player = (
                    "white" if self.current_player == "black" else "black"
                )
                self.status.text = (
                    "黒の番です" if self.current_player == "black" else "白の番です"
                )

    def check_win(self, last_move):
        directions = [(1, 0), (0, 1), (1, 1), (1, -1)]  # 横、縦、斜め
        row = last_move // self.board_size
        col = last_move % self.board_size

        for dx, dy in directions:
            count = 1
            current_color = self.current_player
            # 正方向のチェック
            for i in range(1, 5):
                r, c = row + dy * i, col + dx * i
                if not (0 <= r < self.board_size and 0 <= c < self.board_size):
                    break
                btn = self.buttons[r * self.board_size + c]
                if not btn.text or btn.text == "":  # 空のマスをチェック
                    break
                if (btn.canvas.get_group(None)[-1].r == 0) != (
                    current_color == "black"
                ):
                    break
                count += 1

            # 負方向のチェック
            for i in range(1, 5):
                r, c = row - dy * i, col - dx * i
                if not (0 <= r < self.board_size and 0 <= c < self.board_size):
                    break
                btn = self.buttons[r * self.board_size + c]
                if not btn.text or btn.text == "":  # 空のマスをチェック
                    break
                if (btn.canvas.get_group(None)[-1].r == 0) != (
                    current_color == "black"
                ):
                    break
                count += 1

            if count >= 5:
                return True
        return False

    def disable_all_buttons(self):
        for button in self.buttons:
            button.disabled = True


class GomokuApp(App):
    def build(self):
        Window.size = (800, 850)  # ウィンドウサイズを大きくする
        return GomokuGame()


if __name__ == "__main__":
    GomokuApp().run()
