
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
	
	
	/* 복사
	(function deepCopy(idNum){
		const copyDiv = document.getElementById('_1--line');
		
		console.log(idNum);
		
		// 노드 복사하기
		const newNode = copyDiv.cloneNode(true);
		
		copyDiv.id = 'line' + idNum;
		
		newNode.style.display = 'block';
		
		
		// aview
		const aviewElements = newNode.getElementsByClassName('AView-Style');
		
		
		
		aviewElements[0].innerText = '1'; 
		aviewElements[1].innerText = '2'; 
		aviewElements[2].innerText = '3'; 
		aviewElements[3].innerText = '4';
		aviewElements[4].innerText = '5'; 
		
		
		copyDiv.after(newNode);
	}(this.idNum++));*/
	
};































