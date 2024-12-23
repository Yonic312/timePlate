
/**
Constructor
Do not call Function in Constructor.
*/
function MainView()
{
	AView.call(this);

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

	
	
	(function deepCopy(idNum){
		const copyDiv = document.getElementById('_1--line');
		
		console.log(idNum);
		
		// 노드 복사하기
		const newNode = copyDiv.cloneNode(true);
		
		copyDiv.id = 'line' + idNum;
		
		newNode.style.display = 'block';
		
		
		// aview
		const aviewElements = newNode.getElementsByClassName('AView-Style');
		
		
		
		aviewElements[0].innerText = '1'; // 예시로 텍스트 변경
		aviewElements[1].innerText = '2'; // 예시로 텍스트 변경
		aviewElements[2].innerText = '3'; // 예시로 텍스트 변경
		aviewElements[3].innerText = '4'; // 예시로 텍스트 변경
		aviewElements[4].innerText = '5'; // 예시로 텍스트 변경
		
		
		copyDiv.after(newNode);
	}(this.idNum++));
	
};































