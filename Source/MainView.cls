
/**
Constructor
Do not call Function in Constructor.
*/
class MainView()
{
	super();

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

	
	
	(function deepCopy(idNum){
		const copyDiv = document.getElementById('_1--line');
		
		console.log(idNum);
		
		// 노드 복사하기
		const newNode = copyDiv.cloneNode(true);
		
		copyDiv.id = 'line' + idNum;
		
		newNode.style.display = 'block';
		
		copyDiv.after(newNode);
	}(this.idNum++));
	
};
