
/**
Constructor
Do not call Function in Constructor.
*/
function MainView()
{
	AView.call(this);

	this.cnt = 1;
	// 라인 추가(글 복사)
	this.idNum = 1;

}
afc.extendsClass(MainView, AView);


MainView.prototype.init = function(context, evtListener)
{
	AView.prototype.init.call(this, context, evtListener);

	//TODO:edit here

};

MainView.prototype.onInitDone = function()
{
	AView.prototype.onInitDone.call(this);

	//TODO:edit here

};

MainView.prototype.onActiveDone = function(isFirst)
{
	AView.prototype.onActiveDone.call(this, isFirst);

	//TODO:edit here

};

MainView.prototype.click_add_bntX = function(comp, info, e)
{

	this.addBox.$ele.css("display", "none");

};

MainView.prototype.click_add_cancel = function(comp, info, e)
{

	this.addBox.$ele.css("display", "none");

};

MainView.prototype.click_write_button = function(comp, info, e)
{

	this.addBox.$ele.css("display", "block");

};

MainView.prototype.click_add_ok = function(comp, info, e)
{
	const time = new Date();
	
	let dataList = {
		title : this.add_title.getText(),
		name : this.add_user.getText(),
		text : this.add_text.getText(),
		cnt : this.cnt,
		time : time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate() + ' ' + time.getHours() + ":" + time.getMinutes()
	};
	
	sessionStorage.setItem(`dataList${this.cnt}`,JSON.stringify(dataList));
	
	
	
	console.log(sessionStorage.getItem(`dataList${this.cnt}`));
	console.log(JSON.parse(sessionStorage.getItem(`dataList${this.cnt}`)).title);
	let dataOne = JSON.parse(sessionStorage.getItem(`dataList${this.cnt}`));
	
	// 아이템 복사
	(function deepCopy(idNum){
		const copyDiv = document.getElementById('_1--line');
		
		console.log(dataOne);
		
		// 노드 복사하기
		const newNode = copyDiv.cloneNode(true);
		
		copyDiv.id = 'line' + dataOne.cnt;
		
		
		
		newNode.style.display = 'block';
		newNode.style.textAlign = 'center';
		newNode.style.paddingTop = '19px';
		newNode.style.fontSize = '16px';
		
		
		
		// aview
		const aviewElements = newNode.getElementsByClassName('AView-Style');
		
		
		
		aviewElements[0].innerText = dataOne.cnt; 
		aviewElements[1].innerText = dataOne.title; 
		aviewElements[2].innerText = dataOne.text; 
		aviewElements[3].innerText = dataOne.name;
		aviewElements[4].innerText = dataOne.time; 
		
		
		copyDiv.after(newNode);
	}(dataOne));
	
};































