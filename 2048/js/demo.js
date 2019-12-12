//一加载就直接执行自调用函数
(function(window,document,$){
		//把传递过来的参数进行保存.
	function Game2048(opt){
		var score = 0;
		var winNum = 2048;
		var isGameOver = false;
		var prefix = opt.prefix, len = opt.len, size = opt.size, margin = opt.margin;
		var view = new View(prefix,len,size,margin);
		var board = new Board(len);
		board.onGenerate = function(e){
			view.addNum(e.x, e.y, e.num);
		};
		function start(){
			score = 0;
			isGameOver = false;
			view.updateScore(0);
			view.init();//调用view函数的init函数创建len*len的格子
			board.init();//调用board函数的init函数创建len*len的数组
			board.generate();
			board.generate();
			board.generate();
		}
		start();
		$(".redly").click(function(){
			$(".Game_win").css({
				display:"none"
			});
			$(".Game_lose").css({
				display:"none"
			});
			start();
		})
		board.onMove = function(e){
			if(e.to.num >= winNum){
				isGameOver = true;
				setTimeout(function(){
					$(".Game_win").css({
						display:"flex"
					});
					var a = $("#game_score").text();
					$(".score").text(a);
				},500)
			}
			if (e.to.num > e.from.num){
				score += e.to.num;
				view.updateScore(score);
			}
			//当单元格移动的时候,调用控制单元格移动
			view.move(e.from,e.to);
		};
		board.onMoveComplete = function(e){
			if(e.moved){
				setTimeout(function(){board.generate();},200);
			}
			if(!board.canMove()){
				isGameOver = true;
				setTimeout(function(){
					$(".Game_lose").css({
						display:"flex"
					});
					var b = $("#game_score").text();
					$(".score").text(b);
				},500);
			}
		};
		$(document).keydown(function(e) {
			if (isGameOver){
				return false;
			}
		  switch (e.which) {
		    case 37: board.moveLeft();  break;
		    case 38: board.moveUp();    break;
		    case 39: board.moveRight(); break;
		    case 40: board.moveDown();  break;
		  }
		});
		};
		
//数据处理
		function Board(len){
			this.len = len;
			this.arr = [];
		};
//数据处理的原型
		Board.prototype = {
			canMove: function() {
			  for (var x = 0, arr = this.arr, len = arr.length; x < len; ++x) {
			    for (var y = 0; y < len; ++y) {
			      if (arr[x][y] === 0) {
			        return true;
			      }
			      var curr = arr[x][y], right = arr[x][y + 1];
			      var down = arr[x + 1] ? arr[x + 1][y] : null;
			      if (right === curr || down === curr) {
			        return true;
			      }
			    }
			  }
			  return false;
			},
			//根据len创建len*len长度的数组
			init :function(){
				for (var arr = [],len = this.len,x = 0; x < len; ++x){
					arr[x] = [];
					for (var y = 0;y < len; ++y){
						arr[x][y] = 0;
					}
				}
				this.arr = arr;
			},
//在为空的数组中随机生成一个2或者4
			generate:function(){
				var empty = [];
				for(var x = 0,arr = this.arr,len = arr.length; x < len; ++x){
					for(var y = 0;y < len; ++y){
						if(arr[x][y] === 0){
						empty.push({x:x,y:y});		//找出数组中为0的下标					
						}
					}
				}
				if(empty.length < 1){
					return false;
				}
				var pos = empty[Math.floor((Math.random() * empty.length))];
				// console.log("为空的数组:")
				// console.log(empty)
				// console.log("随机出来生成2和4的:")
				// console.log(pos)
				this.arr[pos.x][pos.y] = Math.random() < 0.5 ? 2 : 4;
				this.onGenerate({x:pos.x,y:pos.y,num:this.arr[pos.x][pos.y]});
			},
			onGenerate:function(){},
//向左移动事件
	moveLeft: function() {
      var canMove = false;
      // 从上到下，从左到右
      for (var x = 0, len = this.arr.length; x < len; ++x) {
        for (var y = 0, arr = this.arr[x]; y < len; ++y) {
          // 从 y + 1 位置开始，向右查找
          for (var next = y + 1; next < len; ++next) {
            // 如果 next 单元格是 0，找下一个不是 0 的单元格
            if (arr[next] === 0) {
              continue;
            }
            // 如果 y 数字是 0，则将 next 移动到 y 位置，然后将 y 减 1 重新查找
            if (arr[y] === 0) {
              arr[y] = arr[next];
              this.onMove({from: {x: x, y: next, num: arr[next]}, to: {x: x, y: y, num: arr[y]}});
              arr[next] = 0;
              canMove = true;
              --y;
            // 如果 y 与 next 单元格数字相等，则将 next 移动并合并给 y
            } else if (arr[y] === arr[next]) {
              arr[y] += arr[next];
              this.onMove({from: {x: x, y: next, num: arr[next]}, to: {x: x, y: y, num: arr[y]}});
              arr[next] = 0;
              canMove = true;
            }
            break;
          }
        }
      }
      this.onMoveComplete({moved: canMove});
    },
    moveRight: function() {
      var moved = false;
       for (var x = 0, len = this.arr.length; x < len; ++x) {
        for (var y = len - 1, arr = this.arr[x]; y >= 0; --y) {
          for (var prev = y - 1; prev >= 0; --prev) {
            if (arr[prev] === 0) {
              continue;
            }
            if (arr[y] === 0) {
              arr[y] = arr[prev];
              this.onMove({from: {x: x, y: prev, num: arr[prev]}, to: {x: x, y: y, num: arr[y]}});
              arr[prev] = 0;
              moved = true;
              ++y;
            } else if (arr[y] === arr[prev]) {
              arr[y] += arr[prev];
              this.onMove({from: {x: x, y: prev, num: arr[prev]}, to: {x: x, y: y, num: arr[y]}});
              arr[prev] = 0;
              moved = true;
            }
            break;
          }
        }
      }
      this.onMoveComplete({moved: moved});
    },
    moveUp: function() {
      var canMove = false;
      for (var arr = this.arr, len = arr.length, y = 0; y < len; ++y) {
        for (var x = 0; x < len; ++x) {
          for (var next = x + 1; next < len; ++next) {
            if (arr[next][y] === 0) {
              continue;
            }
            if (arr[x][y] === 0) {
              arr[x][y] = arr[next][y];
              this.onMove({from: {x: next, y: y, num: arr[next][y]}, to: {x: x, y: y, num: arr[x][y]}});
              arr[next][y] = 0;
              canMove = true;
              --x;
            } else if (arr[x][y] === arr[next][y]) {
              arr[x][y] += arr[next][y];
              this.onMove({from: {x: next, y: y, num: arr[next][y]}, to: {x: x, y: y, num: arr[x][y]}});
              arr[next][y] = 0;
              canMove = true;
            }
            break;
          }
        }
      }
      this.onMoveComplete({moved: canMove});
    },
    moveDown: function() {
      var canMove = false;
      for (var arr = this.arr, len = arr.length, y = 0; y < len; ++y) {
        for (var x = len - 1; x >= 0; --x) {
          for (var prev = x - 1; prev >= 0; --prev) {
            if (arr[prev][y] === 0) {
              continue;
            }
            if (arr[x][y] === 0) {
              arr[x][y] = arr[prev][y];
              this.onMove({from: {x: prev, y: y, num: arr[prev][y]}, to: {x: x, y: y, num: arr[x][y]}});
              arr[prev][y] = 0;
              canMove = true;
              ++x;
            } else if (arr[x][y] === arr[prev][y]) {
              arr[x][y] += arr[prev][y];
              this.onMove({from: {x: prev, y: y, num: arr[prev][y]}, to: {x: x, y: y, num: arr[x][y]}});
              arr[prev][y] = 0;
              canMove = true;
            }
            break;
          }
        }
      }
      this.onMoveComplete({moved: canMove});
    },
			onMove:function(){},
			onMoveComplete: function(){},
		};
		
//视图处理,保存传递过来的参数,设置样式
		function View(prefix,len,size,margin){
			this.prefix = prefix;		//id或者class
			this.len = len;				//单元格长度
			this.size = size;			//单元格宽高
			this.margin = margin;		//单元格间距
			this.score = $('#' + prefix + '_score');
			this.container = $('#' + prefix + '_container');
			var containerSize = len * size +margin *(len + 1);
			this.container.css({
				width:containerSize,
				height:containerSize,
			});
			this.score = $('#' + prefix + '_score');
			this.nums = {}; 			//保存所有数字单元格对象
			console.log(prefix);
			console.log(len);
			console.log(size);
			console.log(margin)
		};
//给view的原型注册方法,获取到创建出来的div设置宽高和定位
		View.prototype = {
				//计算位置
				getPos:	function(n){
					return this.margin + n * (this.size + this.margin);
				},
				init:function () {
					for (var x = 0,len = this.len; x < len; ++x){
						for (var y = 0; y < len; ++y) {
							var $cell = $('<div class="' + this.prefix + '-cell"></div>');
							$cell.css({
								width:this.size + 'px',
								height:this.size + 'px',
								top: this.getPos(x),
								left: this.getPos(y),
							}).appendTo(this.container);
						}
					}
				},
				addNum: function(x,y,num){
					var $num = $('<div class = "'+ this.prefix + '-num ' + this.prefix + '-num-' + num + '">');
					$num.text(num).css({
						top:this.getPos(x) + parseInt(this.size / 2),
						left:this.getPos(y) + parseInt(this.size / 2),						
					}).appendTo(this.container).animate({
						width:this.size + 'px',
						height:this.size + 'px',
						top:this.getPos(x),left:this.getPos(y),
						lineHeight:this.size + 'px',
					}, 300);
					this.nums[x + '-' + y] = $num;
				},
				move:function(from,to){
					var fromIndex = from.x + '-' + from.y, toIndex = to.x + '-' + to.y;
					var clean = this.nums[toIndex];
					this.nums[toIndex] = this.nums[fromIndex];
					delete this.nums[fromIndex];
					var prefix = this.prefix + '-num-';
					var pos = {
						top:this.getPos(to.x),
						left:this.getPos(to.y)
						};
						this.nums[toIndex].finish().animate(pos,200,function(){
							if(to.num > from.num){
								clean.remove();
								$(this).text(to.num).removeClass(prefix + from.num).addClass(prefix + to.num);
							}
						});
				},
				updateScore:function(score){
					this.score.text(score);
				},
		};
		window.Game2048 = Game2048;
})(window,document,jQuery);


