
/**
Constructor
Do not call Function in Constructor.
*/
class MainView()
{
	super();

	this.cnt = 1;
	// 라인 추가(글 복사)
	this.idNum = 1;

}
extends AView;


function MainView*init(context, evtListener)
{
	super.init(context, evtListener);

	//TODO:edit here

};

function MainView*onInitDone()
{
	super.onInitDone();

	//TODO:edit here

};

function MainView*onActiveDone(isFirst)
{
	super.onActiveDone(isFirst);

	//TODO:edit here

};

function MainView*click_add_bntX(comp, info, e)
{

	this.addBox.$ele.css("display", "none");

};

function MainView*click_add_cancel(comp, info, e)
{

	this.addBox.$ele.css("display", "none");

};

function MainView*click_write_button(comp, info, e)
{

	this.addBox.$ele.css("display", "block");

};

function MainView*click_add_ok(comp, info, e)
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































