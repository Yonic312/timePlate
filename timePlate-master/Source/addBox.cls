
/**
Constructor
Do not call Function in Constructor.
*/
class addBox()
{
	super();

	//TODO:edit here

}
extends AView;


function addBox*init(context, evtListener)
{
	super.init(context, evtListener);

	//TODO:edit here

};

function addBox*onInitDone()
{
	super.onInitDone();

	//TODO:edit here

};

function addBox*onActiveDone(isFirst)
{
	super.onActiveDone(isFirst);

	//TODO:edit here

};



function addBox*click_add_bntX(comp, info, e)
{
 	
	this.Necessary_Text_Title.$ele.css("display", "none");
	this.Necessary_Text_Title.$ele.css("display", "none");
	this.Necessary_Text_User.$ele.css("display", "none");
	this.addBox.getContainer().close(1);
};

function addBox*click_add_cancel(comp, info, e)
{
	
	this.Necessary_Text_User.$ele.css("display", "none");
	this.Necessary_Text_Title.$ele.css("display", "none");
	this.Necessary_Text_Text.$ele.css("display", "none");
	this.addBox.getContainer().close(1);
};

function addBox*click_add_ok(comp, info, e)
{
	this.Necessary_Text_User.$ele.css("display", "none");
	this.Necessary_Text_Title.$ele.css("display", "none");
	this.Necessary_Text_Text.$ele.css("display", "none");
	
	// 작성자 이름 없다면
	if(this.add_user.getText()==='' || this.add_title.getText()==='' || this.add_text.getText()===''){
		if(this.add_user.getText()===''){
			this.add_user.setFocus();
			this.Necessary_Text_User.$ele.css("display", "block");
		}
		if(this.add_title.getText()===''){
			this.Necessary_Text_Title.$ele.css("display", "block");
		}
		if(this.add_text.getText()===''){
			this.Necessary_Text_Text.$ele.css("display", "block");
		}
	}else{
		const time = new Date();
		const nowTime = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate() + ' ' + time.getHours() + ":" + time.getMinutes();

		let dataList = {
			cnt: 1,
			title: this.add_title.getText(),
			text: this.add_text.getText(),
			name: this.add_user.getText(),
			time: nowTime
		};
		this.addBox.getContainer().close(0, dataList);
	}
};