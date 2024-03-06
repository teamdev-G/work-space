 document.addEventListener('DOMContentLoaded', function() {

    function tetrimino(num){

        const tetoriminos = [
            [[0,1,1,0],
            [0,1,1,0],
            [0,0,0,0],
            [0,0,0,0]],

            [[0,1,0,0],
            [0,1,1,0],
            [0,0,1,0],
            [0,0,0,0]],
            
            [[0,0,1,0],
            [0,1,1,1],
            [0,0,0,0],
            [0,0,0,0]],

            [[0,1,0,0],
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0]],

            [[0,1,1,0],
            [0,1,0,0],
            [0,1,0,0],
            [0,0,0,0]]]
            //[1, 3],   [1, 2],  [1, 1],   [2, 1]   回転前
            //x:-1,y:-2 x:0,y:-1 x:+1,y:0  x:0,y:+1
            //[[0, 1],  [1, 1],  [2, 1],   [2, 2]]　回転前の座標が回転することによりどこに移ったか（xとyの変化量をそれぞれ記憶する）

        return tetoriminos[num]

    }

/*     //position =  [[7, 3], [7, 2], [7, 1], [8, 1]]
    //              aaaaaaa
    field = [[0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,1,1,0],
            [0,0,0,0,0,0,0,1,0,0],
            [0,0,0,0,0,0,0,1,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0]]
            //回転後のposition
            //[[6, 1], [7, 1], [8, 1], [8, 2]]

    //□
    //x = , y = 
*/

    var copyField = [[0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0]] 
    
    let field = Array(20).fill().map(() => Array(10).fill(0));
    const width = 10;//fieldの横の長さ
    const height = 20;

    //横一列揃ったら一列消える
    function disapper(field, point){
        for (var i = 0; i < height; i++){
            if (field[i].indexOf(0) == -1){
                field[i].fill(0)
                //scoreを保存する
                score(point)
                //消えた分下に下がる
                down(i, field)
            }
        }
    }

    //上の段のものが一つ下に落ちる
    function down(i,field){
        for (var j = i; j > 0; j--){
            for (var k = 0; k < width; k++){
                field[i][k] = field[i-1][k]
            }
        }
        field[0].fill(0)
    }

    //指定された座標が1or0
    //衝突判定
    //衝突したらTrue
    function judge(x, y, field){
        return field[y][x] != 0
    }
    //positionはfield上
    const twidht=4
    const theight=4
    function getxy(tetorimino){
        position = []
        for (let y = 0; y < twidht; y++){
            for (let x = 0; x < theight; x++){
                if (tetorimino[y][x] == 1){
                    position.push([x+3, y])
                }
            }  
        }
        return position
    }

    //fieldに反映させる（固定）
    function updateField(field, position){
        for (let i = 0; i < position.length; i++){
            let x = position[i][0]
            let y = position[i][1]
            field[y][x] = 1
        }
        return field
    }


    //下にブロックがあるか判定
    //ブロックがあるtrue
    function underjudge(field, position){
        for(let i = 0; i < position.length; i++){
            //下にブロックがあったら
            if (position[i][1] === 19 || judge(position[i][0], position[i][1]+1, field)){
                return true
            }
        }
        return false
    }


    //下に落ちる
    function under(field, position){
        for(let i = 0; i < position.length; i++){
            //下にブロックがあったら
            if (position[i][1] === 19 || judge(position[i][0], position[i][1]+1, field)){
                return;// block(field, position)
            }
        }
        //position更新
        newPosition = []
        for (let j = 0; j < position.length; j++){
            newPosition.push([position[j][0],position[j][1]+1])
        }
        return newPosition
    }
    //右に移動
    function right(position){
        for (let i = 0; i < position.length; i++){
            let x = position[i][0]
            let y = position[i][1]
            if (x == 9 || judge(x+1, y, field)){
                return position
            }
        }
        newPosition = []
        for (let j = 0; j < position.length; j++){
            let x = position[j][0]
            let y = position[j][1]
            newPosition.push([x+1, y])
        }
        return newPosition
      }

    //左に移動
    function left(position){  
        console.log("position: ",position)
        for (let i = 0; i < position.length; i++){
            let x = position[i][0]
            let y = position[i][1]
            if (x == 0 || judge(x-1, y, field)){
                return position
            }
        }
        newPosition = []
        for (let j = 0; j < position.length; j++){
            let x = position[j][0]
            let y = position[j][1]
            newPosition.push([x-1, y])
        }
    
        return newPosition
    }

    //回転
    function rotate(position){

        newPosition = []
        let centerx = 0
        let centery = 0
        for (let i = 0; i < position.length; i++){
            centerx += position[i][0]
            centery += position[i][1]
        }
    
        for (let j = 0; j < position.length; j++){
            let x = position[j][0]-(centerx/4)
            let y = position[j][1]-(centery/4)
            let X = Math.floor(x*Math.cos(Math.PI/2) - y*Math.sin(Math.PI/2) + (centerx/4))
            let Y = Math.floor(y*Math.cos(Math.PI/2) + x*Math.sin(Math.PI/2) + (centery/4))
            newPosition.push([X,Y])
        }
        return newPosition
    }

    /* 
    //全ての関数が描くのに関係している

    //positionをcopyFieldに反映させる
    //updatecopyfiledで代用できるかも
    function startCopyField(copyField, position){
        for (let i = 0; i < position.length(); i++){
            let x = position[i][0]
            let y = position[i][1]
            copyField[y][x] = 1
        }
        return copyField
    }
    //startdopyfielddrow()
    //最初のだけ描く
    function startcopyfileddrow(copyField){

    }

    */

    //消して描いて消して描いてを考える
    //最初の描く部分は考えていない
    function updateCopyField(copyField, newposition){
        //newpositionをcopyFieldに反映させる
        for (let i = 0; i < newposition.length; i++){
            let x = newposition[i][0]
            let y = newposition[i][1]
            copyField[y][x] = 2 //テトリミノの種類によって数字を変えれば色も変えれるかも
        }

        //copyfileddrow()
        //1のところは消す2のところは描く
        //描くときについでに1は0にできるかも




        //2のままだと固定（もしくは1は一つ前のposition, 2はnewposition, 3は固定でもありかも）
        //underjudge()
        //false
        //2にしたところを1
        //true
        //2のままにして新しいテトリミノについて動作をする
        //固定のブロックは2にしておく



    }
        //copyfileddrow()
        //1のところは消す
        //固定のブロックは2にしておく
        //描くときについでに1は0にできるかも
    function copyfileddrow(copyField){
        const red = '#ff0000'
        const grey = '#CCCCCC' 

        for (let y = 0; y < copyField.length; y++){
            for (let x = 0; x < copyField[0].length; x++){
                if (copyField[y][x] == 2){//2以上にするとテトリミノの種類に応じて色変更ができるかも．hashmapを用いれば
                    draw(x, y, red)
                }
                else if(copyField[y][x] <= 1){
                    copyField[y][x] = 0
                    draw(x, y, grey)
                }
            }
        }
    }

    //分岐によって色指定をしたいがうまくいかないので描く部分だけ関数にする
    function draw(x, y, color){
        context.fillStyle = color
        const cellSize = 20;
        context.fillRect(x*cellSize, y*cellSize, cellSize, cellSize)
    }

    /* 
    function drawTetrimino(context, position, color) {
        context.fillStyle = color; // テトリミノの色
        const cellSize = 20; // テトリミノのセルのサイズ

        for (let i = 0; i < position.length; i++) {
            let x = position[i][0]
            let y = position[i][1]
            context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
    */

        //2のままだと固定（もしくは1は一つ前のposition, 2はnewposition, 3は固定でもありかも）
        //underjudge(field, position)
        //false
        //2にしたところを1
        //true
        //2のままにして新しいテトリミノについて動作をする
        //固定のブロックは2にしておく
/*     function block(field, copyField, newposition){
        if (underjudge(field, newposition)){
            //新しいテトリミノを生み出す
            //もしくは何もせず生み出す部分はunderjudgやwhileを用いてなんとかできるかも

        }
        else{
            for (let i = 0; i < newposition.length; i++){
                let x = newposition[i][0]
                let y = newposition[i][1]
                copyField[y][x] = 1
            }
        }

    } */

  //描く関数をまとめてみる
    function alldrow(copyField, position){
        //console.log('beforposition: ', position)
        updateCopyField(copyField, position)
        //console.log('aftercopyfield: ', copyField)
        copyfileddrow(copyField)
        //block(field, copyfield, position)

    }
    let hhh = true;
    //最初の地点
  // mainCanvasの呼び出し
  const mainCanvas = document.getElementById('tetrisCanvas');

  // ↓canvasで2次元描画をするために必要らしい
  const context = mainCanvas.getContext('2d');

  // 使う色
  const red = '#ff0000'
  const gray = '#CCCCCC'

  /* 0~4のランダムな整数を取得して、
     ランダムなテトリミノを１つ取得 */
  let randomNumber = Math.floor(Math.random() * 5);
  let tetriminoPattern = tetrimino(randomNumber);

  // グレーの背景を塗りつぶす
  context.fillStyle = gray; // グレー色
  context.fillRect(0, 0, mainCanvas.width, mainCanvas.height);

    // テトリミノの初期位置を取得
    let position;
    position = getxy(tetriminoPattern);
    alldrow(copyField, position)
    for (let i = 0; i < position.length; i++){
        let x = position[i][0]
        let y = position[i][1]
        copyField[y][x] = 1
    }

    //function keyindex(field, position, copyField) {}
        
        const hashmap = {
            ArrowRight: () => right(position),
            ArrowLeft: () => left(position),
            ArrowUp: () => rotate(position),
            ArrowDown: () => under(field, position)
        };
        document.addEventListener("keydown", function (event) {
            // key プロパティによってどのキーが押されたかを調べます。
            // code プロパティを使うと大文字/小文字が区別されます。
            // 何かキーボードの押して、コンソールに出力されているか確かめましょう。
            if (hashmap[event.key]) {


                for (let i = 0; i < position.length; i++){
                    let x = position[i][0]
                    let y = position[i][1]
                    copyField[y][x] = 1
                }
                position = hashmap[event.key]();
                alldrow(copyField, position)
            }
            return position
        });

    



/* 
    function control (e, position) {

        if(e.keyCode === 37) {
            console.log(left(position))
            left(position)
        } else if (e.keyCode === 38) {
            rotate(position)
        } else if (e.keyCode === 39) {
            right(position)
        } else if (e.keyCode === 40) {
            under(field, position)
        }
    }
    document.addEventListener('keydown', control(context, position)) */

  // drawTetrimino(context, position, gray);

    const intervalId = setInterval(() => {


        
        
        
        if (underjudge(field,position)){
            clearInterval(intervalId);
            //新しいテトリミノを生み出す
        }
        else{
            for (let i = 0; i < position.length; i++){
                let x = position[i][0]
                let y = position[i][1]
                copyField[y][x] = 1
            } 
            position = under(field, position)
            alldrow(copyField, position)
            
        } 

    }, 2000);


/*     //描く関数をまとめてみる
    function alldrow(field, copyField, position){
        let updatecopyfield = updateCopyField(copyField, position)
        copyfileddrow(updatecopyfield)
        if (position.length == 0){
            return updatecopyfield
        }
        block(field, updatecopyfield, position)
        return updatecopyfield
    } */

    //点数を保存
    point = 0
    function score(point){
        point += 10
        return point
    }



    /* let randomNumber = Math.floor(Math.random() * 5);
    let tetrominoPattern = tetorimino(randomNumber);
    //ゲームオーバーかどうか
    //ゲームオーバーはTrue
    //getxyで落ちてくるテトリミノの最初の座標を取得するがその取得した座標にすでにブロックがある（1が存在する）場合ゲームオーバー
    position = getxy(tetoriminoPattern) */
    function gameover(position,field){
        for (let i = 0; i < position.length; i++){
            let x = position[i][0]
            let y = position[i][1]
            if (field[y][x] == 1){
                return false
            }
        }
        return true
    }



}); 