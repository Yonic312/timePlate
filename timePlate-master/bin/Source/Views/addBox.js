
/**
Constructor
Do not call Function in Constructor.
*/
function addBox()
{
	AView.call(this);

	//TODO:edit here

}
afc.extendsClass(addBox, AView);


addBox.prototype.init = function(context, evtListener)
{
	AView.prototype.init.call(this, context, evtListener);

	//TODO:edit here

};

addBox.prototype.onInitDone = function()
{
	AView.prototype.onInitDone.call(this);

	//TODO:edit here

};

addBox.prototype.onActiveDone = function(isFirst)
{
	AView.prototype.onActiveDone.call(this, isFirst);

	//TODO:edit here

};



addBox.prototype.click_add_bntX = function(comp, info, e)
{
 	
	this.Necessary_Text_Title.$ele.css("display", "none");
	this.Necessary_Text_Title.$ele.css("display", "none");
	this.Necessary_Text_User.$ele.css("display", "none");
	this.addBox.getContainer().close(1);
};

addBox.prototype.click_add_cancel = function(comp, info, e)
{
	
	this.Necessary_Text_User.$ele.css("display", "none");
	this.Necessary_Text_Title.$ele.css("display", "none");
	this.Necessary_Text_Text.$ele.css("display", "none");
	this.addBox.getContainer().close(1);
};

addBox.prototype.click_add_ok = function(comp, info, e)
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