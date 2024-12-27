
/**
Constructor
Do not call Function in Constructor.
*/
function editBox()
{
	AView.call(this);

	//TODO:edit here

}
afc.extendsClass(editBox, AView);


editBox.prototype.init = function(context, evtListener)
{
	AView.prototype.init.call(this, context, evtListener);

	//TODO:edit here

};

editBox.prototype.onInitDone = function()
{
	AView.prototype.onInitDone.call(this);

	//TODO:edit here

};

editBox.prototype.onActiveDone = function(isFirst)
{
	AView.prototype.onActiveDone.call(this, isFirst);

	var data = this.getContainer().getData();
	console.log(data, ' !!!');
	this.edit_title.setText(data.title);
	this.edit_user.setText(data.user);
	this.edit_text.setText(data.text);

};

editBox.prototype.click_edit_bntX = function(comp, info, e)
{

	this.editBox.getContainer().close(1);

};

editBox.prototype.click_edit_delete = function(comp, info, e)
{
	const t = 'delete';
	this.editBox.getContainer().close(0, t);

};

editBox.prototype.click_edit_ok = function(comp, info, e)
{
	const t = 'update';
	
	let dataList = {
			title : this.edit_title.getText(),
			user : this.edit_user.getText(),
			text : this.edit_text.getText(),
			
		};
	this.editBox.getContainer().close(0,dataList);

};
