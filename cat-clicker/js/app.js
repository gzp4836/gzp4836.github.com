var catImg = document.getElementById('cat_img');
var catListDev = document.getElementById('catlist');
var counter = document.getElementsByClassName('counter');
var cats = [];

var model = {
	currentCat:null,
	cats:[{
			name:'cat1',
			img:'img/cat_picture1.jpeg',
			clickNum:0
		},{
			name:'cat2',
			img:'img/cat_picture2.jpeg',
			clickNum:0
		},{
			name:'cat3',
			img:'img/cat_picture3.jpeg',
			clickNum:0
		},{
			name:'cat4',
			img:'img/cat_picture4.jpeg',
			clickNum:0
		}
	]

}
var octopus = {
	init:function(){
		model.currentCat = model.cats[0];
		btnView.init();
		catImgView.init();
	},
	buttonClick:function(){
		var cat = model.currentCat;
		catImgView.render(cat);
	},
	catImgClick: function(){
		model.currentCat.clickNum++;
		catImgView.render();
	},
	getCats:function(){
		return model.cats;
	},
	setCurrentCatName:function(name){
		getCurrentCat().name = name;
	},
	getCurrentCat:function(){
		return model.currentCat;
	}
	,
	setCurrentCat:function(cat){
		model.currentCat = cat;
		catImgView.render();
	}
}
var btnView = {
	init : function(){
		this.catListEle = document.getElementById('cat-list');
		this.render();

	},
	render: function(){
		var cats = 	octopus.getCats();
		cats.forEach(function(cat·,index){

			var liEle = document.createElement('li');
			liEle.textContent = cat.name;
			liEle.addEventListener('click',(function(catCopy){
				return function(){
					octopus.setCurrentCat(catCopy);
				};
			})(cat));
			this.catListEle.appendChild(liEle);
		},this)
	}
}
var catImgView = {
	init:function(){
		this.catImgEle = document.getElementById('cat-img');
		this.catNameEle = document.getElementById('cat-name');
		this.countEle = document.getElementById('cat-count');
		this.catUpdateEle = document.getElementById('cat-update')
		this.catImgEle.addEventListener('click',function(){
			octopus.catImgClick();
		});
		this.catUpdateEle.addEventListener('click',function(){
			if(this.catNameEle.readonly == false){
				//保存操作
				this.catNameEle.readonly = true;
				octopus.setCurrentCatName(catImgView.catNameEle.value);
			}
			this.catNameEle.readonly = false;
			this.catUpdateEle.textContent = "保存";	
		})
		this.render();
	},
	render : function(){
		var currentCat = octopus.getCurrentCat();
		this.catNameEle.value = currentCat.name;
		this.catNameEle.readonly = 'true';
		this.countEle.textContent = currentCat.clickNum;
		this.catImgEle.src = currentCat.img; 
	}
}
octopus.init();