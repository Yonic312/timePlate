
/**
Constructor
Do not call Function in Constructor.
*/
class editBox()
{
	super();

	//TODO:edit here

}
extends AView;


function editBox*init(context, evtListener)
{
	super.init(context, evtListener);

	//TODO:edit here

};

function editBox*onInitDone()
{
	super.onInitDone();

	//TODO:edit here

};

function editBox*onActiveDone(isFirst)
{
	super.onActiveDone(isFirst);

	var data = this.getContainer().getData();
	console.log(data, ' !!!');
	this.edit_title.setText(data.title);
	this.edit_user.setText(data.user);
	this.edit_text.setText(data.text);

};

function editBox*click_edit_bntX(comp, info, e)
{

	this.editBox.getContainer().close(1);

};

function editBox*click_edit_delete(comp, info, e)
{
	const t = 'delete';
	this.editBox.getContainer().close(0, t);

};

function editBox*click_edit_ok(comp, info, e)
{
	const t = 'update';
	
	let dataList = {
			title : this.edit_title.getText(),
			user : this.edit_user.getText(),
			text : this.edit_text.getText(),
			
		};
	this.editBox.getContainer().close(0,dataList);

};
